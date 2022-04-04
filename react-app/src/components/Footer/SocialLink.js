import React from 'react';

const SocialLink = ({ network }) => {
    return (
        <a className="social-link" href={network.site} target="_blank">
            <img src={network.src} alt={network.alt} style={{ height: `${network.src === "images/google_g.png" ? "27px" : "40px"}` }} />
        </a>
    )
}

export default SocialLink;