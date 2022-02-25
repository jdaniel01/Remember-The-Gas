import React from "react";
import "./Carousel.css";

const Paginator = ({ activeIdx }) => {
    return (
        <div className="paginator-container">
            <button className="paginator" idx="0" style={{ backgroundColor: (activeIdx == 0) ? "white" : "#0054A4", border: (activeIdx == 0) ? "white" : "#0054A4" }}></button>
            <button className="paginator" idx="1" style={{ backgroundColor: (activeIdx == 1) ? "white" : "#0054A4" }}></button>
            <button className="paginator" idx="2" style={{ backgroundColor: (activeIdx == 2) ? "white" : "#0054A4" }}></button>
        </div>
    )
}

export default Paginator;
