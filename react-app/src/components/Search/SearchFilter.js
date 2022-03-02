import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeInput } from '../../store/search';

const Filter = () => {

    const inputState = useSelector(state => state.search);
    const dispatch = useDispatch();

    return (
        <div className="filter-container">
            <div className="filter-icon">▾</div>
            <div className="filter-options-container">
                <form action="/search">
                    <label htmlFor='haveInput'>Has the word(s)</label>
                    <input name="haveInput" className="have-input" value={inputState.have} onChange={(e) => dispatch(changeInput(e.target.value))}></input>
                </form>
            </div>
        </div>
    )
}

export default Filter;