import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink, useHistory } from 'react-router-dom';
import { signUp, demoLogin } from '../../store/session';
import "./user-forms.css"

const SignUpForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(state => state.session.user)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      //TODO: check for errors
    }
  };

  const loginDemoUser = (e) => {
    e.preventDefault()
    dispatch(demoLogin())
    //TODO: DemoUser Login route and store
  }

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="user-form-page-container">
      <article className="logo-article user-article">
        <NavLink to="/" className="rtg-logo" >
          <img className="rtg-logo" src="/images/dftg-logo.png" alt="Remember The Gas Logo. The logo is an image of a red jerry can, or gas can, pouring out a green checkmark" />
        </NavLink>
      </article>
      <article className="form-article user-article">
        <div className="user-form-link-container">
          <NavLink to="/" className="rtg-logo" >
          <img className="form-rtg_logo" src="images/dftg-logo.png" alt="Remember The Gas Logo. The logo is an image of a red jerry can, or gas can, pouring out a green checkmark" />
          </NavLink>
          <NavLink to="/login" className="user-form-link form-link">
            Login
          </NavLink>
        </div>
        <form className="user-form" onSubmit={onSignUp}>
          <div className="errors-container">
            {errors && errors.map((error) => (
              <div>{error}</div>
            ))}
          </div>
          <div className="input-container user-field">
            <input className="form-input"
          type="text"
              name="username"
              placeholder="Username"
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
          <div className="input-container user-field">
            <input className="form-input"
          type="text"
              name="email"
              placeholder="Email"
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
          <div className="input-container user-field">
            <input className="form-input"
          type="password"
              name="password"
              placeholder="Password"
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
          <div className="input-container user-field">
            <input className="form-input"
          type="password"
              name="repeat_password"
              placeholder="Confirm Password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
          <button className="form-button user-form-button" type="submit">Sign Up</button>
          <button className="demo-login-button user-form-button" onClick={loginDemoUser}>Demo Login</button>
        </form>
      </article>
    </div>
  );
};

export default SignUpForm;
