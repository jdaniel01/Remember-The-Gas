import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const onLogout = (e) => {
    dispatch(logout()); //removed async/await keywords.
  };

  return <button className="user-form-button logout" onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
