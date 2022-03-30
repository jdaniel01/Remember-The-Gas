import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { demoLogin } from "../../store/session"
import "./navigation.css";


const Menu = () => {

    const location = useLocation();
    const dispatch = useDispatch();

    
    const loginDemoUser = (e) => {
        dispatch(demoLogin());
    }

    return location.pathname !== "/login" && location.pathname !== "/sign-up"?(
        <div className="menu-bar">
            <NavLink to="/about" className="menu-button">About</NavLink>
            {/* <NavLink to="/help" className="menu-button">Help</NavLink> */}
            <NavLink to="/login" className="menu-button">Log in</NavLink>
            <NavLink to="/sign-up" className="menu-button-border menu-button">Sign up free</NavLink>
        </div>
    ) : (
            <div className="auth-menu-bar">
                <button className="demo-login-button sub-menu-button" onClick={loginDemoUser}>Demo</button>
                {location.pathname === "/sign-up" && <NavLink to="/login" className="sub-menu-button">Log in</NavLink>}
                {location.pathname === "/login" && <NavLink to="/sign-up" className="sub-menu-button">Sign up</NavLink>}
            </div>
    )
}


export default Menu;