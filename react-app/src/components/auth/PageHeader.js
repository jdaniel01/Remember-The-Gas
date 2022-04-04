import React from "react";
import "./PageHeader.css";

const PageHeader = ({ text, subText }) => {

    return (
        <div className="header-container">
            <div className={`header ${text}-header`}>
            {text}
            </div>
            <div className="sub-header">
                {subText}
            </div>
        </div>
        
    )
}


export default PageHeader;