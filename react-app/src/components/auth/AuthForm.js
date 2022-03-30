import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// import { Text, Email, Password } from "./FormInput className="auth-input"s";
// import Text from './FormInput className="auth-input"s';
import { updateUsername, updateEmail, updatePassword, updateConfirm, updateLogin, updateCred } from '../../store/form';
import { useDispatch, useSelector } from 'react-redux';

const AuthForm = () => {
    const location = useLocation();
    const dispatch = useDispatch();  //I tried importing in FormInput className="auth-input"s.js first and keep the 'update...' functions in this file to allow input className="auth-input"s to remain arbitrary.

    const usrnm = useSelector(state => state.form.signup.username);
    const emal = useSelector(state => state.form.signup.email);
    const pass = useSelector(state => state.form.signup.password);
    const confirm = useSelector(state => state.form.signup.confirmPassword);
    const uOrE = useSelector(state => state.form.login.usernameOrEmail);
    const cred = useSelector(state => state.form.login.password);

    const [username, setUsername] = useState(usrnm);
    const [email, setEmail] = useState(emal);
    const [password, setPassword] = useState(pass);
    const [confirmPassword, setConfirm] = useState(confirm);
    const [login, setLogin] = useState(uOrE);
    const [credential, setCredential] = useState(cred);



    //if pathname !== '/login' then default is '/sign-up' since this only gets rendered at either fo those two pathnames.
    return location.pathname === "/login"?(
        <div className="auth-form">
            <div className="auth-text-container">
                <div className="med">You came back?!</div>
                <div className="small"> What am I saying!</div>
                <div className="large">Welcome back!</div>
            </div>
            <input className="auth-input" type="text" value={login} onChange={(e) => setLogin(e.target.value)}/>
            <input className="auth-input" type="password" value={credential}  onChange={(e) => setCredential(e.target.value)}/>
        
        </div>
    ):(
        <div className="auth-form">
            <div className="auth-text-container">
                <div className="large">Sign-up at your own risk!</div>
                <div className="medium">(We're kidding, it's completely safe)</div>
                <div className="small">(mostly)</div>
            </div>
                
            <input className="auth-input" type="text" value={username}  onChange={(e) => setUsername(e.target.value)}/>
            <input className="auth-input" type="email" value={email}  onChange={(e) => setEmail(e.target.value)}/>
            <input className="auth-input" type="password" value={password}  onChange={(e) => setPassword(e.target.value)}/>
            <input className="auth-input" type="password" value={confirmPassword} onChange={(e) => setConfirm(e.target.value)}/>
        </div>
    )
}

export default AuthForm;