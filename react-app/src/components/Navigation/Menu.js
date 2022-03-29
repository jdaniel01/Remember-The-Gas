import React from "react";
import { NavLink } from "react-router-dom";
import "./navigation.css";


const Menu = () => {

    return (
        <div className="menu-bar">
            <NavLink to="/about" className="menu-button">About</NavLink>
            {/* <NavLink to="/help" className="menu-button">Help</NavLink> */}
            <NavLink to="/login" className="menu-button">Log in</NavLink>
            <NavLink to="/sign-up" className="menu-button-border menu-button">Sign up free</NavLink>
        </div>
    )
}


export default Menu;