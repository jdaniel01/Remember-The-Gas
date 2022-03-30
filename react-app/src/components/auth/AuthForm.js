import React from 'react';
import { useLocation } from 'react-router-dom';

const AuthForm = () => {
    const location = useLocation();

    //if pathname !== '/login' then default is '/sign-up' since this only gets rendered at either fo those two pathnames.
    return location.pathname === "/login"?(
        <div className="auth-form">
            <h1>Login Form</h1>
        </div>
    ):(
        <div className="auth-form">
            <h1>Sign-up Form</h1>
        </div>
    )
}

export default AuthForm;