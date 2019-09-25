import React, { useContext, useRef, useEffect } from 'react';

import VacationContext from '../../context/vacation/vacationContext';

const VacationFilter = () => {
    const vacationContext = useContext(VacationContext);
    const text = useRef('');
    const { filterVacations, clearFilter, filtered } = vacationContext;

    useEffect(() => {
        if (filtered === null) {
            text.current.value = '';
        }
    });

    const onChange = e => {
        if (text.current.value !== '') {
            filterVacations(e.target.value);
        } else {
            clearFilter();
        }
    };

    return (
        <form>
            <input
                ref={text}
                type='text'
                placeholder='Filter Vacations...'
                onChange={onChange}
            />
        </form>
    );

};

export default VacationFilter;