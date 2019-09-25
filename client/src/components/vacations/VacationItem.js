import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import VacationContext from '../../context/vacation/vacationContext';
import AuthContext from "../../context/auth/authContext";

const VacationItem = ({ vacation }) => {
    const vacationContext = useContext(VacationContext);
    const { deleteVacation, setCurrent, clearCurrent } = vacationContext;
    const { _id, dateStart, dateEnd, days, description } = vacation;

    const authContext = useContext(AuthContext);
    const { user, updateUser } = authContext;

    const [type, setType] = useState('in the plans');
    useEffect(() => {
        if(new Date(dateEnd) <= new Date()){
            setType('complete');
        }
    });

    const onDelete = () => {
        const delConfirm = window.confirm("Are you sure to delete this item?");
        if(delConfirm){
            const rDays = user.restDays - days;
            const r = updateUser({_id:user._id, restDays:rDays});

            deleteVacation(_id);
            clearCurrent();
        }
    };

    const onEdit = () => {
         setCurrent(vacation);
    };

    const show = (date) => {
        const d = new Date(date);
        return `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`
    };

    return (
        <div className='card bg-light'>
            <h3 className='text-primary text-left'>
                {days}{' days '}
                <span
                    style={{ float: 'right' }}
                    className={
                        'badge ' +
                        (type === 'complete' ? 'badge-success' : 'badge-primary')
                    }
                >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h3>
            <ul className='list'>
                {dateStart && (
                    <li>
                        <i className="fas fa-plane-departure"/> {show(dateStart)}
                    </li>
                )}
                {dateEnd && (
                    <li>
                        <i className="fas fa-plane-arrival"/> {show(dateEnd)}
                    </li>
                )}
            </ul>

            {description && <div><h4> {description} </h4><br/></div>}

            {
                type !== 'complete'
                &&
                <p>
                    <button
                        className='btn btn-dark btn-sm'
                        onClick={onEdit}
                    >
                        Edit
                    </button>
                    <button className='btn btn-danger btn-sm' onClick={onDelete}>
                        Delete
                    </button>
                </p>
            }
        </div>
    );
};

VacationItem.propTypes = {
    vacation: PropTypes.object.isRequired
};

export default VacationItem;