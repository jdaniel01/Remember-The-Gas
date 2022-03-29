import React from "react";
import { NavLink } from "react-router-dom";
import "./navigation.css";

const RtgLogo = () => {

    return (
        <div className="logo-wrapper">
            <NavLink to="/" className="logo">
                <img className="logo-med" src="images/rtg_logo_med.png" alt="Remember the Gas Logo" />
                <span className="logo-text">remember the gas</span>
            </NavLink>
        </div>
    )
}


export default RtgLogo;