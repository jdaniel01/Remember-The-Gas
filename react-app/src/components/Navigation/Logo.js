import React from "react";
import { NavLink } from "react-router-dom";
import "./navigation.css";

const RtgLogo = () => {

    return (
        <div className="logo-wrapper">
            <NavLink to="/">
                <img className="logo-med" src="images/rtg_logo_med.png" alt="Remember the Gas Logo" />
            </NavLink>
        </div>
    )
}


export default RtgLogo;