import React, { useState } from "react";
import { carouselData } from "./data";
import Paginator from "./Paginator";
import Slide from "./Slide";
import "./Carousel.css";

const Carousel = () => {
    const [currSlide, setCurrSlide] = useState(0);

    return (
        <div className="carousel-container">
            <div className="slides-container">
                {carouselData.map((slide, idx) =>
                    <Slide slide={slide} idx={idx} curr={currSlide} />
                )}
            </div>
            <Paginator activeIdx={currSlide} />
        </div>
    )
}

export default Carousel;