import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { login, demoLogin } from "../../store/session";
import "./user-forms.css"

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user)
  const [errors, setErrors] = useState([]);
  const [nameOrEmail, setNameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    console.log("nameOrEmail", nameOrEmail, "Password", password)
    const data = await dispatch(login(nameOrEmail, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const updateNameorEmail = (e) => {
    setNameOrEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const loginDemoUser = async (e) => {
    e.preventDefault();
    const data = await dispatch(demoLogin());
    if (data.errors) {
      setErrors(data.errors);
    }
  }

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="user-form-page-container">
      <article className="logo-article user-article">
        <NavLink to="/" className="rtg-logo">
          <img className="rtg-logo" src="/images/dftg-logo.png" alt="Remember The Gas Logo. The logo is an image of a red jerry can, or gas can, pouring out a green checkmark" />
        </NavLink>
      </article>
      <article className="form-article user-article">
        <div className="user-form-link-container">
          <NavLink to="/" className="rtg-logo">
            <img className="form-rtg_logo" src="images/dftg-logo.png" alt="Remember The Gas Logo. The logo is an image of a red jerry can, or gas can, pouring out a green checkmark" />
          </NavLink>
          <NavLink to="/sign-up" className="user-form-link form-link">
            Sign-up here!
          </NavLink>
        </div>
        <form className="user-form" onSubmit={onLogin}>
          <div className="errors-container">
            {errors && errors.map((error) => (
              <div>{error}</div>
            ))}
          </div>
          <div className="input-container user-field">
            <input className="form-input"
              name="nameOrEmail"
              type="text"
              placeholder="Username or Email"
              value={nameOrEmail}
              onChange={updateNameorEmail}
            />
          </div>
          <div className="input-container user-field">
            <input className="form-input"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
          </div>
          <button className="form-button user-form-button" type="submit">Login</button>
          <button className="demo-login-button user-form-button" onClick={loginDemoUser}>Demo Login</button>
        </form>
      </article>
    </div>
  );
};

export default LoginForm;
