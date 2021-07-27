import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';

const Main = () => {
    const [showSettings, setShowSettings] = useState(false)

    return (
        <>
        <div className="main-container">
            <div className="title-container">

            </div>
                <div className="options-container">

            </div>
            </div>
        </>
    )
}

export default Main;