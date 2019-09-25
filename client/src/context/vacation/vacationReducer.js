import {
    GET_VACATIONS,
    ADD_VACATION,
    DELETE_VACATION,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_VACATION,
    FILTER_VACATIONS,
    CLEAR_FILTER,
    VACATION_ERROR,
    CLEAR_VACATIONS
} from '../types';

export default (state, action) => {

    switch (action.type) {
        case GET_VACATIONS:
            return {
                ...state,
                vacations: action.payload,
                loading: false
            };
        case ADD_VACATION:
            return {
                ...state,
                vacations: [action.payload, ...state.vacations],
                loading: false
            };
        case UPDATE_VACATION:
            return {
                ...state,
                vacations: state.vacations.map(vacation => vacation._id === action.payload._id ? action.payload : vacation),
                loading: false
            };
        case DELETE_VACATION:
            return {
                ...state,
                vacations: state.vacations.filter(vacation => vacation._id !== action.payload),
                loading: false
            };
        case CLEAR_VACATIONS:
            return {
                ...state,
                vacations: null,
                filtered: null,
                error: null,
                current: null
            };
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            };
        case FILTER_VACATIONS:
            return {
                ...state,
                filtered: state.vacations.filter(vacation => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return vacation.dateStart.match(regex) || vacation.dateEnd.match(regex);
                })
            };
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            };
        case VACATION_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }

};