import React, { useState } from "react";
import Filter from "./SearchFilter";
import { changeInput } from "../../store/search";
import { useSelector, useDispatch } from "react-redux";
import "./Search.css";

const Search = () => {

    const searchInput = useSelector(state => state.search);
    const [background, setBackground] = useState("#198FCB");
    const dispatch = useDispatch();


    return (
        <div className="search-container" style={{ backgroundColor: background, color: background === "#198FCB" ? "white" : "#515151" }}>
            <img id="search-icon" src="/images/search-icon.png" alt="Search icon. A grey vector image of a magnifying glass." />
            <input type="text" className="search-input" value={searchInput.have} onChange={(e) => dispatch(changeInput(e.target.value))} onFocus={() => setBackground(("white"))} onBlur={() => setBackground("#198FCB")} />
            <Filter />
        </div>
    )
}

export default Search;