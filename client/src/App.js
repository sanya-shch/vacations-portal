import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';
import PrivateRoute from './components/routing/PrivateRoute';

import VacationState from './context/vacation/VacationState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) setAuthToken(localStorage.token);

const App = () => {
    return (
        <AuthState>
            <VacationState>
                <AlertState>
                    <BrowserRouter>
                        <Fragment>
                            <Navbar />
                            <div className='container'>
                                <Alerts />
                                <Switch>
                                    <PrivateRoute exact path='/' component={Home} />
                                    <Route exact path='/register' component={Register} />
                                    <Route exact path='/login' component={Login} />
                                </Switch>
                            </div>
                        </Fragment>
                    </BrowserRouter>
                </AlertState>
            </VacationState>
        </AuthState>
    );
};

export default App;
