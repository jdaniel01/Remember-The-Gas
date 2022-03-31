import React, { useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUp, login } from '../../store/session';
// import { Text, Email, Password } from "./FormInput className="auth-input"s";
// import Text from './FormInput className="auth-input"s';
import { updateUsername, updateEmail, updatePassword, updateConfirm, updateLogin, updateCred } from '../../store/form';

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
    const [usernameOrEmail, setLogin] = useState(uOrE);
    const [credential, setCredential] = useState(cred);

    const [errors, setErrors] = useState([]);

    const onSignup = async (e) => {
        e.preventDefault()
        if (!errors.length) {
            const data = await dispatch(signUp(username, email, password));
            if (data.errors) {
                setErrors(data.errors);
            }
        }
        else {
            setErrors("There Was an issue with your request. Please refresh and try again.")
        }
    }

    const onLogin = async (e) => {
        e.preventDefault()
        const data = await dispatch(login(usernameOrEmail, credential));
        if (data.errors) {
            setErrors(data.errors);
        }
    }

    function loadErrors () {
        let newErrors = [];
        const symbolRegex = new RegExp(/[!,?,*,&, @, %, ^]+/g)
        const lowercaseRegex = new RegExp(/[a-z]+/g)
        const uppercaseRegex = new RegExp(/[A-Z]/g)

        if (password.length < 8) {
            newErrors.push("Password needs 8 or more characters.")
        }
        if (!symbolRegex.test(password)) {
            newErrors.push("Password needs one or more: !, ?, *, $, &, -, _")
        }
        if (!uppercaseRegex.test(password)) {
            newErrors.push("Password needs one or more uppercase (A-Z).")
        }
        if (!lowercaseRegex.test(password)) {
            newErrors.push("Password needs one or more lowercase (a-z).")
        }
        if (password !== confirmPassword) {
            newErrors.push("Password and confirmed password should match.")
        }
        if (username.length < 8) {
            newErrors.push("Username is at least 8 characters")
        }
        if (symbolRegex.test(username)) {
            newErrors.push("Username can't contain: !, ?, *, &, @, %, ^.")
        }
        if (!email.includes("@") || !email.includes(".") || email.split('.')[1].length < 2) {
            newErrors.push("Enter an email address.")
        }
        if (errors.length !== newErrors.length) {
            setErrors(newErrors);
        }
    }

    loadErrors();

    const changeUsername = (e) => {
        dispatch(updateUsername(e.target.value))
        setUsername(e.target.value)
    }
    const changeEmail = (e) => {
        dispatch(updateEmail(e.target.value))
        setEmail(e.target.value)
    }
    const changePassword = (e) => {
        dispatch(updatePassword(e.target.value))
        setPassword(e.target.value)
        
    }
    const changeConfirm = (e) => {
        dispatch(updateConfirm(e.target.value))
        setConfirm(e.target.value)
    }
    const changeLogin = (e) => {
        dispatch(updateLogin(e.target.value))
        setLogin(e.target.value)
    }
    const changeCred = (e) => {
        dispatch(updateCred(e.target.value))
        setCredential(e.target.value);
    }

    const isDisabled = () => {
        return errors.length ? true : false;
    }

    //if pathname !== '/login' then default is '/sign-up' since this only gets rendered at either fo those two pathnames.
    return location.pathname === "/login"?(
        <form className="auth-form" onSubmit={onLogin}>
            <div className="auth-text-container">
                <div className="med">You came back?!</div>
                <div className="small"> What am I saying!</div>
                <div className="large">Welcome back!</div>
            </div>
            <input className="auth-input" name="nameOrEmail" type="text" placeholder="Username or Email" value={usernameOrEmail} onChange={changeLogin}/>
            <input className="auth-input" name="password" type="password" placeholder="Password" value={credential}  onChange={changeCred}/>
            <NavLink className="forgot-password" to='/forgot-password'>Forgot Password?</NavLink>
            <button type="submit" disabled={!usernameOrEmail || !credential}className="auth-button" onClick={onLogin}>Login</button>
        </form>
    ):(
        <form className="auth-form" onSubmit={onSignup}>
            <div className="auth-text-container">
                <div className="large">Sign-up at your own risk!</div>
                <div className="medium">(We're kidding, it's completely safe)</div>
                <div className="small">(mostly)</div>
                <div className="error-container">      
                        {errors.map((error, idx) => <div>{idx + 1}) {error}</div>)}
                </div>
            </div>
        
            <input className="auth-input" name="username" type="text" placeholder="Username" value={username}  onChange={changeUsername}/>
            <input className="auth-input" name="email" type="email" placeholder="Email" value={email}  onChange={changeEmail}/>
            <input className="auth-input" name="password" type="password" placeholder="Password" value={password}  onChange={changePassword}/>
            <input className="auth-input" name="repeat_password" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={changeConfirm}/>
        
            <button type="submit" disabled={isDisabled()} className="auth-button" onClick={onSignup}>Sign up!</button>
        </form>
    )
}

export default AuthForm;