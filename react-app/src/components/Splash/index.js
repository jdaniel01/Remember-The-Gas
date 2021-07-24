import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import "./Splash.css"

const Splash = () => {

    return (
            <article className="splash-container">
                <div className="feature-carousel">
                    <div className="splash-item-container">
                        place content about convenience
                    </div>
                    <div className="splash-item-container">
                        place content about freeing up life
                    </div>
                    <div className="splash-item-container">
                        place content about social links
                    </div>
                </div>
        </article>
    )
}

export default Splash;