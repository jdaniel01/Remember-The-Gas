import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import LeftMain from "./LeftMain";
import RightMain from "./RightMain";
import BurgerMenu from "./BurgerMenu";
import "./Dashboard.css";

const Dashboard = () => {

    const location = useLocation();

    const burgerOpen = useSelector(state => state.menu.burger.open);
    
    
    return (
        <div className="dashboard-container">
            {burgerOpen && 
                <BurgerMenu/>
            }
            <div className="main-display">
                <LeftMain />
                <RightMain/>
            </div>
        </div>
    )
};

export default Dashboard;