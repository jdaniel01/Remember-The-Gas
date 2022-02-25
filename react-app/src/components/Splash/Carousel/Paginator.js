import React from "react";
import "./Carousel.css";

const Paginator = ({ activeIdx }) => {
    return (
        <div className="paginator-container">
            <div className="paginator" idx="0" style={{ backgroundColor: (activeIdx == 0) ? "black" : "white" }}></div>
            <div className="paginator" idx="1" style={{ backgroundColor: (activeIdx == 1) ? "black" : "white" }}></div>
            <div className="paginator" idx="2" style={{ backgroundColor: (activeIdx == 2) ? "black" : "white" }}></div>
        </div>
    )
}

export default Paginator;
