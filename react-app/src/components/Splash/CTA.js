import React from "react";
import { NavLink } from "react-router-dom";
import "./CTA.css";


const CTA = () => {

    return (
        <div className="splash-cta">
            <div>Using this app is smarter than holding your breath under water.</div>
            <NavLink to="/sign-up" className="cta-button">Sign up free!</NavLink>
        </div>
    )
}


export default CTA;