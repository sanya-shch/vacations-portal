import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';
import VacationContext from '../../context/vacation/vacationContext';

const Navbar = ({ title, icon }) => {
    const authContext = useContext(AuthContext);
    const vacationContext = useContext(VacationContext);
    const { isAuthenticated, logout, user } = authContext;
    const { clearVacations } = vacationContext;

    const onLogout = () => {
        logout();
        clearVacations();
    };

    const authLinks = (
        <Fragment>
            <li>Hello <b>{user && user.name}</b></li>
            <li>
                <a onClick={onLogout} href='#!'>
                    <i className='fas fa-sign-out-alt' />{' '}
                    <span className='hide-sm'>Logout</span>
                </a>
            </li>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </Fragment>
    );

    return (
        <div className='navbar bg-primary'>
            <h1><i className={icon}/>  {title}</h1>
            <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
        </div>
    );
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
};

Navbar.defaultProps = {
    title: 'Vacations',
    icon: 'fas fa-plane'
};

export default Navbar;
