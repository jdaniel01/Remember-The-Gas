import React from "react";
import RtgLogo from "./Logo";
import Menu from "./Menu";
import "./navigation.css";

const Navbar = ({ user }) => {


    return (
        <div className="navigation_bar">
            <div className="spacer">
                <RtgLogo />
                <Menu />
            </div>
        </div>
    )
}

export default Navbar;