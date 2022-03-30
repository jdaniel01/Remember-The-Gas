import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import RtgLogo from '../Navigation/Logo';
import Menu from '../Navigation/Menu';
import AuthForm from './AuthForm';
import "./AuthPage.css";

const AuthPage = () => {

    const user = useSelector(state => state.session.user);

    if (user) {
        return <Redirect to={`/users/${user.id}/tasks`} />;
    }

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