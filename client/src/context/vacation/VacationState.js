import React, { useReducer } from 'react';
import axios from 'axios';

import VacationContext from './vacationContext';
import vacationReducer from './vacationReducer';
import {
    GET_VACATIONS,
    ADD_VACATION,
    DELETE_VACATION,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_VACATION,
    FILTER_VACATIONS,
    CLEAR_VACATIONS,
    CLEAR_FILTER,
    VACATION_ERROR
} from '../types';

const VacationState = props => {

    const initialState = {
        vacations: null,
        current: null,
        filtered: null,
        error: null
    };

    const [state, dispatch] = useReducer(vacationReducer, initialState);

    const getVacations = async () => {
        try {
            const res = await axios.get('/api/vacation');
            dispatch({
                type: GET_VACATIONS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: VACATION_ERROR,
                payload: err.response.msg
            });
        }
    };

    const addVacation = async vacation => {
        const config = {headers: {'Content-Type': 'application/json'}};
        try {
            const res = await axios.post('/api/vacation', vacation, config);
            dispatch({
                type: ADD_VACATION,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: VACATION_ERROR,
                payload: err.response.msg
            });
        }
    };

    const deleteVacation = async id => {
        try {
            await axios.delete(`/api/vacation/${id}`);
            dispatch({
                type: DELETE_VACATION,
                payload: id
            });
        } catch (err) {
            dispatch({
                type: VACATION_ERROR,
                payload: err.response.msg
            });
        }
    };

    const updateVacation = async vacation => {
        const config = {headers: {'Content-Type': 'application/json'}};

        try {
            const res = await axios.put(
                `/api/vacation/${vacation._id}`,
                vacation,
                config
            );
            dispatch({
                type: UPDATE_VACATION,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: VACATION_ERROR,
                payload: err.response.msg
            });
        }
    };

    const clearVacations = () => {
        dispatch({ type: CLEAR_VACATIONS });
    };

    const setCurrent = vacation => {
        dispatch({ type: SET_CURRENT, payload: vacation });
    };

    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    const filterVacations = text => {
        dispatch({ type: FILTER_VACATIONS, payload: text });
    };

    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    return (
        <VacationContext.Provider
            value={{
                vacations: state.vacations,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                addVacation,
                deleteVacation,
                setCurrent,
                clearCurrent,
                updateVacation,
                filterVacations,
                clearFilter,
                getVacations,
                clearVacations
            }}
        >
            {props.children}
        </VacationContext.Provider>
    );

};

export default VacationState;