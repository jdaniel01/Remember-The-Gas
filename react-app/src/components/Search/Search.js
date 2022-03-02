import React, { useState } from "react";
import "./Search.css";

const Search = () => {

    const [input, setInput] = useState('');
    const [background, setBackground] = useState("#198FCB")

    return (
        <div className="search-container" style={{ backgroundColor: background }}>
            <img id="search-icon" src="/images/search-icon.png" alt="Search icon. A grey vector image of a magnifying glass." />
            <input type="text" className="search-input" value={input} onChange={(e) => setInput(e.target.value)} onFocus={() => setBackground(("white"))} onBlur={() => setBackground("#198FCB")} />

        </div>
    )
}

export default Search;