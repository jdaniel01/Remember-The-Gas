import React from "react";
import "./Carousel.css";

const Paginator = ({ activeIdx, paginate }) => {
    return (
        <div className="paginator-container">
            <button className="paginator" idx="0" style={{ backgroundColor: (activeIdx == 0) ? "white" : "#0054A4", border: (activeIdx == 0) ? "2px solid white" : "2px solid rgba(255,255,255,.5)" }} onClick={() => paginate(0)}></button>
            <button className="paginator" idx="1" style={{ backgroundColor: (activeIdx == 1) ? "white" : "#0054A4", border: (activeIdx == 1) ? "2px solid white" : "2px solid rgba(255,255,255,.5)" }} onClick={() => paginate(1)}></button>
            <button className="paginator" idx="2" style={{ backgroundColor: (activeIdx == 2) ? "white" : "#0054A4", border: (activeIdx == 2) ? "2px solid white" : "2px solid rgba(255,255,255,.5)" }} onClick={() => paginate(2)}></button>
        </div>
    )
}

export default Paginator;
