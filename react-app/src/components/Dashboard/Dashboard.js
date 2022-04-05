import React from "react";
import { useLocation } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {

    const location = useLocation();

    return (
        <div className="dashboard-container">
            This is the dashboard.
        </div>
    )
};

export default Dashboard;