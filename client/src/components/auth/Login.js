import React, { useState, useContext, useEffect } from 'react';

import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

import ForgotYourPassword from "./ForgotYourPassword";

const getCookie = name => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
};

// const delete_cookie = name => {
//     document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
// };

const Login = props => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;
    const { login, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        if (isAuthenticated) props.history.push('/');
        if (error === 'Invalid Credentials') {
            setAlert(error, 'danger');
            clearErrors();
        }
    }, [error, isAuthenticated, props.history]);

    const login_username = getCookie('login_username');
    const login_password = getCookie('login_password');

    const loginInitialState = () => {
        if (login_username && login_password) {
            return {
                name: login_username,
                password: login_password
            }
        } else return {
            name: '',
            password: ''
        }
    };

    const [userLogin, setLogin] = useState(loginInitialState());
    const [isClick, setClick] = useState(false);

    const { name, password } = userLogin;
    const onChange = e => setLogin({ ...userLogin, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        if (name === '' || password === '') {
            setAlert('Please fill in all fields', 'danger');
        } else {
            login({
                name,
                password
            });
        }
    };

    const onChangeRB = () => {
        if (name === '' || password === '') {
            setAlert('Please fill in all fields', 'danger');
        } else if (name !== '' && password !== '') {
            const expire = new Date();
            expire.setHours(expire.getHours()+1);
            document.cookie=`login_username=${name}; expires=${expire}`;
            document.cookie=`login_password=${password}; expires=${expire}`;
        }
    };

    return (
        <div className='form-container'>
            {
                isClick
                    ? <ForgotYourPassword/>
                    : <form onSubmit={onSubmit}>
                        <div className='form-group'>
                            <label htmlFor='name'>Username</label>
                            <input
                                type='text'
                                name='name'
                                value={name}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password'>Password</label>
                            <input
                                type='password'
                                name='password'
                                value={password}
                                onChange={onChange}
                                required
                            />
                        </div>

                        <h4 onClick={onChangeRB} style={{textDecoration:'none'}}>Remember Me</h4>

                        <input
                            type='submit'
                            value='Login'
                            className='btn btn-primary btn-block'
                        />
                    </form>
            }
            <span style={{ float: 'right' }} >
                <p onClick={() => setClick(!isClick)}>
                    { isClick ? 'return to login' : 'forgot your password?'}
                </p>
            </span>
        </div>
    );

};

export default Login;
