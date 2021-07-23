import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import NavBar from '../NavBar';


const Main = () => {
    const [showSettings, setShowSettings] = useState(false)

    return (
        <>
            <NavBar showSettings={showSettings} setShowSettings={setShowSettings} />
        <div className="main-container">
            <div className="title-container">

            </div>
            <div options>

            </div>
            </div>
        </>
    )
}

export default Main;