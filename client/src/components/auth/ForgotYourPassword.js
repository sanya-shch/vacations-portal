import React, {useState, Fragment, useContext} from 'react';

import AlertContext from '../../context/alert/alertContext';
import axios from "axios/index";

const ForgotYourPassword = props => {

    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;

    const [emailS, setEmail] = useState({email:''});

    const {email} = emailS;

    const sendEmail = async email => {
        const config = {headers: {'Content-Type': 'application/json'}};
        try {
            const res = await axios.post('/api/email', email, config);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    const onSubmit = e => {
        e.preventDefault();
        if (email === '') {
            setAlert('Please fill in the email', 'danger');
        } else {
            console.log(sendEmail(emailS));
        }
    };

    const onChange = e => setEmail({[e.target.name]: e.target.value});

    return (
        <Fragment>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='email'>Email Address</label>
                    <input
                        type='email'
                        name='email'
                        value={email}
                        onChange={onChange}
                        required
                    />
                </div>
                <input
                    type='submit'
                    value='Send'
                    className='btn btn-primary btn-block'
                />
            </form>
        </Fragment>
    );

};

export default ForgotYourPassword;
