import React, {useState, useContext, useEffect, Fragment} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import VacationContext from '../../context/vacation/vacationContext';
import AuthContext from "../../context/auth/authContext";
import Spinner from '../layout/Spinner'
import AlertContext from "../../context/alert/alertContext";

function getWeekDays(first, last) {
    if (first > last) return -1;
    let start = new Date(first.getTime());
    let end = new Date(last.getTime());
    let count = 0;
    while (start <= end) {
        if (start.getDay() !== 0 && start.getDay() !== 6)
            count++;
        start.setDate(start.getDate() + 1);
    }
    return count;
}

function getFullMonths(a, b) {
    let months = (b.getFullYear() - a.getFullYear()) * 12;
    months += b.getMonth() - a.getMonth();
    if (b.getDate() < a.getDate()){
        months--;
    }
    return months;
}

const VacationForm = () => {
    const vacationContext = useContext(VacationContext);
    const { addVacation, updateVacation, clearCurrent, current } = vacationContext;

    const authContext = useContext(AuthContext);
    const { user, updateUser, loading } = authContext;

    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;

    useEffect(() => {
        if (current !== null) {
            setVacation({...current, dateStart: new Date(current.dateStart), dateEnd: new Date(current.dateEnd)});
            setTempDays(current.days)
        } else {
            setVacation({
                dateStart: '',
                dateEnd: '',
                days: '',
                description: ''
            });
        }
    }, [vacationContext, current]);

    const [vacation, setVacation] = useState({
        dateStart: '',
        dateEnd: '',
        days: '',
        description: ''
    });

    useEffect(() => {
        if(user !== null && !loading){
            const fullDays = Math.floor(getFullMonths(new Date(user.date), new Date()) * 1.75);
            const balance = fullDays - user.restDays;
            setBalanceDays(balance);
        }
    });

    const [isClick, setClick] = useState(false);
    const onClick = () => {setClick(!isClick)};

    const { dateStart, dateEnd, days, description } = vacation;

    const [tempDays, setTempDays] = useState(days);
    const [balanceDays, setBalanceDays] = useState();

    const onChange = e => setVacation({ ...vacation, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        if (current === null) {
            if(dateStart !== '' && dateEnd !== '' && days !== ''){
                if (balanceDays + tempDays - days < 0){
                    setAlert('limit is exceeded', 'danger');
                } else {
                    addVacation(vacation);

                    const rDays = user.restDays + days;
                    updateUser({_id:user._id,restDays:rDays});
                }

            }
        } else {
            if (balanceDays + tempDays - days < 0){
                setAlert('limit is exceeded', 'danger');
            } else {
                updateVacation(vacation);

                const rDays = user.restDays + days - tempDays;
                updateUser({_id:user._id,restDays:rDays});
            }

        }
        clearAll();
    };

    const clearAll = () => {
        clearCurrent();
    };

    const onChangeDP = date => {
        setVacation({ ...vacation, dateEnd: date, days: getWeekDays(dateStart, date) })
    };

    return (
        <form onSubmit={onSubmit}>
            {
                user !== null && !loading
                    ?
                    <h2>Available balance is <span className='text-primary'>{balanceDays}</span> days</h2>
                    :
                    <Spinner />
            }

            <br/>
            {
                isClick || current
                    ?
                    <Fragment>
                        <h2 className='text-primary'>{current ? 'Edit Vacation' : 'Add Vacation'}</h2>

                        <DatePicker
                            readOnly={new Date(dateStart) < new Date()}
                            placeholderText={new Date(dateStart) <= new Date() ? dateStart : "Click to select a start date"}
                            selected={dateStart}
                            onChange={date => setVacation({ ...vacation, dateStart: date })}
                            selectsStart
                            startDate={dateStart}
                            endDate={dateEnd}
                            minDate={new Date()}
                            todayButton="Today"
                        />
                        {' '}
                        <DatePicker
                            placeholderText="Click to select a end date"
                            selected={dateEnd}
                            onChange={date => onChangeDP(date)}
                            selectsEnd
                            endDate={dateEnd}
                            minDate={dateStart}
                            readOnly={dateStart===''}
                        />

                        {
                            days &&
                            <h4 style={{marginBottom: "10px"}}>
                                You have chosen {days > 1 ? `${days}   days` : 'a day'}
                            </h4>
                        }

                        <textarea
                            placeholder='Text description'
                            name='description'
                            value={description}
                            onChange={onChange}
                        />

                        <div>
                            <input
                                type='submit'
                                value={current ? 'Update Vacation' : 'Add Vacation'}
                                className='btn btn-primary btn-block'
                            />
                        </div>
                        {current && (
                            <div>
                                <button className='btn btn-light btn-block' onClick={clearAll}>
                                    Cancel
                                </button>
                            </div>
                        )}
                    </Fragment>
                    :
                    <button className='btn btn-primary btn-block' onClick={onClick}>Add Vacation</button>
            }
        </form>

    );

};

export default VacationForm;