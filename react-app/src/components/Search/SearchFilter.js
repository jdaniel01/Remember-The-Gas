import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeHaveInput, changeNotHaveInput, changeChecked, setShowOption, searchLists } from '../../store/search';

const Filter = () => {

    const have = useSelector(state => state.search.have);
    const notHave = useSelector(state => state.search.notHave);
    const showOptions = useSelector(state => state.search.showOptions);
    const checked = useSelector(state => state.search.checked);
    const searchResults = useSelector(state => state.search.results);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("These are the SearchResults in React: ", searchResults);
    }, [dispatch, searchResults]);

    return (
        <div className="filter-container">
            <div className="filter-icon" onClick={() => dispatch(setShowOption(!showOptions))}>▾</div>
            <div className="filter-options-container" hidden={!showOptions} style={{ display: (showOptions) ? "flex" : "none" }}>
                <label htmlFor='haveInput'>Includes</label>
                <input name="haveInput" className="have-input input" type="text" value={have} onChange={(e) => dispatch(changeHaveInput(e.target.value))} />
                <label htmlFor='haveInput'>Does not include</label>
                <input name="notHaveInput" className="not-have-input input" type="text" value={notHave} onChange={(e) => dispatch(changeNotHaveInput(e.target.value))} />
                <div className="radio-option radio">
                    <input name="checkNotes" className="check-notes-input radio" type="checkbox" checked={checked} onChange={(e) => dispatch(changeChecked(!checked))} />
                    <label htmlFor='checkNotes'>Search notes</label>
                </div>
                <div className="line-break"></div>
                <button className="search-button button" onClick={() => dispatch(searchLists(have, notHave, checked))}><img id="search-icon" src="/images/search-icon.png" alt="Search icon. A grey vector image of a magnifying glass." /></button>
            </div>
        </div>
    )
}

export default Filter;