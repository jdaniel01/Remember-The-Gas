import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNavStatus } from "../../store/nav";
import RtgLogo from "./Logo";
import Menu from "./Menu";
import "./navigation.css";

const Navbar = () => {


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