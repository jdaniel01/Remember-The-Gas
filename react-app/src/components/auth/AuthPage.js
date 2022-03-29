import React, { useState } from 'react';
import RtgLogo from '../Navigation/Logo';
import "./AuthPage.css";

const AuthPage = () => {


    return (
        <div className="auth-container">
            <div className="left-auth-container">
                <RtgLogo />
            </div>
            <div className="right-auth-container">
                Right
            </div>
        </div>
    )
};

export default AuthPage;