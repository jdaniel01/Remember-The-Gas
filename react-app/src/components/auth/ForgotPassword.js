import React, {useState} from 'react';
import PageHeader from './PageHeader';
import "./ForgotPassword.css";
import { useDispatch, useSelector } from 'react-redux';
import { updateForgotEmail, sendForgotEmail } from '../../store/form';
import { Error } from './FormInputs';

const ForgotPassword = () => {

    const email = useSelector(state => state.form.forgot);

    const [forgotEmail, setForgotEmail] = useState(email);

    const dispatch = useDispatch();

    const changeForgotEmail = (e) => {
        if (email !== e.target.value) {
            dispatch(updateForgotEmail(e.target.value))
        }
    }

    const verifyForgotEmail = async (e) => {
        if (email) {
            let results = await dispatch(sendForgotEmail(email))
            if (results) {
                window.alert(results.message);
            }
        }
    }

    return (
        <div className='forgot-password-container'>
            <PageHeader text={"Account"} subText={"Your Remember the Gas account."}/>
            <div className="forgot-form">
                <h3>Forgot Password</h3>
                <Error text="Enter your email. We'll send further instructions."/>
                <input className="auth-input" type="email" value={email} onChange={changeForgotEmail} placeholder="Email"/>
                <button className="auth-button" onClick={verifyForgotEmail}>Reset Password</button>
            </div>
        </div>
    )
}


export default ForgotPassword;