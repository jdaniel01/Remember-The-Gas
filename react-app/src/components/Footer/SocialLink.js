import React from 'react';
import { socialNetworks } from './socialData';

const SocialLink = ({ network }) => {
    return (
        <a className="social-link" href={network.site} target="_blank">
            <img src={network.src} alt={network.alt} style={{ height: `${network.src === "images/google_g.png" ? "27px" : "40px"}` }} />
        </a>
    )
}

const SocialLinks = () => {

    return (
        <div className="link-container">
            {socialNetworks && socialNetworks.map((network, id) => <SocialLink network={network} key={id} />)}
        </div>
    )
}

export default SocialLinks