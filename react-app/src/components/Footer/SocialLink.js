import React from 'react';

const SocialLink = ({ network }) => {
    return (
        <div className="social-link">
            <img src={network.site} alt={network.alt} />
        </div>
    )
}

export default SocialLink;