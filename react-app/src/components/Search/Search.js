import React, { useState } from "react";
import Filter from "./SearchFilter";
import { changeHaveInput } from "../../store/search";
import { useSelector, useDispatch } from "react-redux";
import "./Search.css";

const Search = () => {

    const haveInput = useSelector(state => state.search.have);
    const [background, setBackground] = useState("#198FCB");
    const dispatch = useDispatch();


    return (
        <div className="search-container" style={{ backgroundColor: background, color: background === "#198FCB" ? "white" : "#515151" }}>
            <img id="search-icon" src="/images/search-icon.png" alt="Search icon. A grey vector image of a magnifying glass." />
            <input type="text" className="search-input" value={haveInput} onChange={(e) => dispatch(changeHaveInput(e.target.value))} onFocus={() => setBackground(("white"))} onBlur={() => setBackground("#198FCB")} />
            <Filter />
        </div>
    )
}

export default Search;