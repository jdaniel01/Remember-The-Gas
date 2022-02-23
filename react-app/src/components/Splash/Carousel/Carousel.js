import React from "react";
import { carouselData } from "./data";

const Carousel = () => {
    const [slide, setSlide] = useState(0);

    return (
        <div className="carousel-container">
            {carouselData.map((slide, idx) => {

            })}
        </div>
    )
}

export default Carousel;