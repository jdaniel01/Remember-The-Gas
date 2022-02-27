import React from 'react';
import { NavLink } from "react-router-dom";
import SocialLink from './SocialLink';
import { socialNetworks } from './socialData';
import "./Footer.css";

const Footer = () => {

    return (
        <div className="footer">
            <div className="sitemap">
                <div className="sitemap-list">
                    <div className="list-heading">Product</div>
                    <NavLink className="list-item" to="/about">About</NavLink>
                    {/* <NavLink className="list-item">Design</NavLink>
                    <NavLink classname="list-item">Help</NavLink>
                    <NavLink className="list-item">Recent Changes</NavLink>
                    <NavLink className="list-item">Next steps...</NavLink> */}
                </div>
                <div className="sitemap-list">
                    <div className="list-heading">Connect</div>
                    <NavLink className="list-item" to="/about#developer">Developer</NavLink>
                    <a className="list-item" href="https://github.com/jdaniel01/Remember-The-Gas">Project</a>
                </div>
            </div>
            <div className="floor-container">
                <div id="copywright">©️ Remember The Gas 2022</div>
                <div className="link-container">
                    {socialNetworks.map((network, id) => <SocialLink network={network} key={id} />)}
                </div>
            </div>

        </div>
    )
}

export default Footer;