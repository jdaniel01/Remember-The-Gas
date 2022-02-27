import React from 'react';

const SocialLink = ({ network }) => {
    return (
        <button className="social-link">
            <img src={network.src} alt={network.alt} style={{ height: `${network.src === "images/google_g.png" ? "27px" : "40px"}` }} />
        </button>
    )
}

export default SocialLink;