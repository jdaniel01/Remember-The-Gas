import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { login } from "../../store/session";
import "./user-forms.css"

const LoginForm = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user)
  const [errors, setErrors] = useState([]);
  const [nameOrEmail, setNameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(nameOrEmail, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  useEffect(() => {
    const errs = [];
    if (!nameOrEmail) {
      errs.push("Please enter your username or email address.")
    }
    if (!password) {
      errs.push("Please enter your password.")
    }
    setErrors(errs)
  }, [nameOrEmail, password])

  const updateNameorEmail = (e) => {
    setNameOrEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };


  if (user) {
    return <Redirect to={`/users/${user.id}/tasks`} />;
  }

  return (
    <div className="user-form-page-container">
      <article className="logo-article user-article">
        <NavLink to="/" className="rtg-logo">
          {/* <img className="rtg-logo" src="/images/dftg-logo.png" alt="Remember The Gas Logo. The logo is an image of a red jerry can, or gas can, pouring out a green checkmark" /> */}
          <span className="rtg-form-logo" role="img" aria-label="Remember the gas logo">⛽</span>
        </NavLink>
      </article>
      <article className="form-article user-article">
        <div className="user-form-link-container">
          <NavLink to="/" className="rtg-logo">
            {/* <img className="form-rtg_logo" src="images/dftg-logo.png" alt="Remember The Gas Logo. The logo is an image of a red jerry can, or gas can, pouring out a green checkmark" /> */}
            <span role="img" className="rtg-form-logo" aria-label="Remember the gas logo">⛽</span>
          </NavLink>
          <NavLink to="/sign-up" className="user-form-link form-link">
            Sign-up here!
          </NavLink>
        </div>
        <form className="user-form" onSubmit={onLogin}>
          <div className="errors-container">
            {errors && errors.map((error) => (
              <div key={error}>{error}</div>
            ))}
          </div>
          <div className="input-container user-field">
            <input className="form-input"
              name="nameOrEmail"
              type="text"
              placeholder="Username or Email"
              value={nameOrEmail}
              onChange={updateNameorEmail}
              // required
            />
          </div>
          <div className="input-container user-field">
            <input className="form-input"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
              // required
            />
          </div>
          <button className="form-button user-form-button" type="submit">Login</button>
          
        </form>
      </article>
    </div>
  );
};

export default LoginForm;
