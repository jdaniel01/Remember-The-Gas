import React from "react";
import CTA from "./CTA";
import Carousel from "./Carousel/Carousel";
import Footer from "../Footer";

const Splash = () => {

    return (
        <div className="splash-container" style={{ width: "100%" }}>
            <CTA />
            <Carousel />
            <Footer />
        </div>
    )
}

export default Splash;