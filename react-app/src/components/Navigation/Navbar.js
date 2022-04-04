import React from "react";
import { useLocation } from "react-router-dom";
import RtgLogo from "./Logo";
import Menu from "./Menu";
import "./navigation.css";

const Navbar = () => {

    const location = useLocation();

    return location.pathname !== "/login" && location.pathname !== "/sign-up" ? (
        <div className="navigation_bar">
            <div className="spacer">
                <RtgLogo />
                <Menu />
            </div>
        </div>
    ) : null;
}

export default Navbar;