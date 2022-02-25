import React from "react";


const Slide = ({ curr, idx, slide }) => {

    return (
        <div className="slide-container" id={idx} hidden={curr == idx ? false : true}>
            <img className="slide-image" src={slide.src} alt={slide.alt} />
            <div className="slide-heading">{slide.heading}</div>
            <div className="slide-text">{slide.text}</div>
        </div>
    )
}


export default Slide;