import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import VacationItem from './VacationItem';
import Spinner from '../layout/Spinner';
import VacationContext from '../../context/vacation/vacationContext';

const Vacations = () => {
    const vacationContext = useContext(VacationContext);
    const { vacations, filtered, getVacations, loading } = vacationContext;

    useEffect(() => {
        getVacations();
    }, []);

    if (vacations !== null && vacations.length === 0 && !loading) return <h4>Please add a vacation</h4>;

    return (
        <Fragment>
            {vacations !== null && !loading ? (
                <TransitionGroup>
                    {filtered !== null
                        ? filtered.map(vacation => (
                            <CSSTransition
                                key={vacation._id}
                                timeout={500}
                                classNames='item'
                            >
                                <VacationItem vacation={vacation} />
                            </CSSTransition>
                        ))
                        : vacations.map(vacation => (
                            <CSSTransition
                                key={vacation._id}
                                timeout={500}
                                classNames='item'
                            >
                                <VacationItem vacation={vacation} />
                            </CSSTransition>
                        ))}
                </TransitionGroup>
            ) : (
                <Spinner />
            )}
        </Fragment>
    );

};

export default Vacations;