import React from "react";
import CTA from "./CTA";
import Carousel from "./Carousel/Carousel";

const Splash = () => {

    return (
        <div className="splash-container" style={{ width: "100%" }}>
            <CTA />
            <Carousel />
        </div>
    )
}

export default Splash;