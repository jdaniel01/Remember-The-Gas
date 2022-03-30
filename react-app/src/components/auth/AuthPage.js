import React from 'react';
import RtgLogo from '../Navigation/Logo';
import Menu from '../Navigation/Menu';
import AuthForm from './AuthForm';
import "./AuthPage.css";

const AuthPage = () => {


    return (
        <div className="auth-container">
            <div className="left-auth-container">
                <RtgLogo />
            </div>
            <div className="right-auth-container">
                <div className="alignment">
                    <Menu />
                    <AuthForm/>
                </div>
            </div>
        </div>
    )
};

export default AuthPage;