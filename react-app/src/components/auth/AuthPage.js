import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import RtgLogo from '../Navigation/Logo';
import Menu from '../Navigation/Menu';
import AuthForm from './AuthForm';
import "./AuthPage.css";

const LeftText = () => {
    const location = useLocation();

    return location.pathname === "/sign-up" ? (<div>Join the handful of people who joined Remember The Gas and save zilch and anything anywhere!</div>) : (<div>“Always carry a pocket knife
cause you never know when
you’ll have to slash some tires.”
#roadrageatitsfinest</div>)
}

const AuthPage = () => {

    const user = useSelector(state => state.session.user);

    if (user) {
        return <Redirect to={`/users/${user.id}/tasks`} />;
    }

    return (
        <div className="auth-container">
            <div className="left-auth-container">
                <div className="left-logo-container">
                    <RtgLogo />
                </div>
                <div className="left-text-container">
                    <LeftText />
                </div>
            </div>
            <div className="right-auth-container">
                <div className="alignment">
                    <div className="surprise-logo">
                        <RtgLogo/>
                    </div>
                    <Menu />
                    <AuthForm/>
                </div>
            </div>
        </div>
    )
};

export default AuthPage;