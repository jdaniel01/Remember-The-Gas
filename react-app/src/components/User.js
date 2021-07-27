import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { PasswordForm, AccountForm, DeleteForm } from "./auth/UserEdits";
import "./User.css";

function User() {

  const [user, setUser] = useState({});

  const [showAccount, setShowAccount] = useState(true);
  const [showEmailPreferences, setShowEmailPreferences] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [header, setHeader] = useState("User Details");
  const [showSettings, setShowSettings] = useState(false)

  const { userId } = useParams();
  // Notice we use useParams here instead of getting the params
  // From props.


  useEffect(() => {
    if (!userId) {
      return
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  const feature = () => {
    if (header === "User Details") {
      return <AccountForm user={user} setShowSettings={setShowSettings} />
    }
    else if (header === "Password") {
      return <PasswordForm setShowSettings={setShowSettings} />
    }
    // else if (header === "Email Preferences") {
    //   return <EmailForm />
    // }
    // else if (header === "Notifications") {
    //   return <NotificationForm />
    // }
    else if (header === "Delete Account") {
      return <DeleteForm />
    }
  }

  return (
    <div className="page-container">
      <div className="account-info-container">
        <ul className="sections-list">
          <li onClick={() => setHeader("User Details")}>User Details</li>
          <li onClick={() => setHeader("Password")}>Password</li>
          {/* <li onClick={() => setHeader("Notifications")}>Notifications</li>
          <li onClick={() => setHeader("Email Preferences")}>Email Preferences</li> */}
          <li onClick={() => setHeader("Delete Account")}>Delete Account</li>
        </ul>
        < div className="account-body-container">
          <div className="account-header-container">
            <h3 className="account-header">{header}</h3>
            <NavLink to="/" className="exit">×</NavLink>
          </div>
          {feature()}
        </div>
      </div>
    </div>
  );
}
export default User;
