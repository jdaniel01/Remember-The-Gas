const SET_HAVE_INPUT = "search/SET_HAVE_INPUT";
const SET_NOT_HAVE_INPUT = "search/SET_NOT_HAVE_INPUT";
const SET_OPTIONS = "search/SET_OPTIONS";
const SET_CHECKED = "search/SET_CHECKED";
const SET_SEARCH_RESULTS = "search/SET_SEARCH_RESULTS";

const setHaveInput = (haveInput) => ({
    type: SET_HAVE_INPUT,
    payload: haveInput
});

const setNotHaveInput = (notHaveInput) => ({
    type: SET_NOT_HAVE_INPUT,
    payload: notHaveInput
});

const setOptions = (option) => ({
    type: SET_OPTIONS,
    payload: option
});

const setChecked = (bool) => ({
    type: SET_CHECKED,
    payload: bool
});

const setResults = (results) => ({
    type: SET_SEARCH_RESULTS,
    payload: results
});


export const changeHaveInput = (have) => async (dispatch) => {
    dispatch(setHaveInput(have));
};

export const changeNotHaveInput = (notHave) => async (dispatch) => {
    dispatch(setNotHaveInput(notHave));
};

export const setShowOption = (option) => async (dispatch) => {
    dispatch(setOptions(option));
};

export const changeChecked = (bool) => async (dispatch) => {
    dispatch(setChecked(bool));
};

export const searchLists = (have, notHave, searchNotes) => async (dispatch) => {
    const response = await fetch("/api/search", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        body: {
            have,
            notHave,
            searchNotes
        }
    });
    if (response.ok) {
        const results = await response.json();
        dispatch(setResults(results));
    }
}


const initialState = { have: "", notHave: "", showOptions: false, checked: false, results: [] }

export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case SET_HAVE_INPUT:
            state = { ...state, have: action.payload };
            return state;
        case SET_NOT_HAVE_INPUT:
            state = { ...state, notHave: action.payload };
            return state;
        case SET_OPTIONS:
            state = { ...state, showOptions: action.payload };
            return state;
        case SET_CHECKED:
            state = { ...state, checked: action.payload };
            return state;
        case SET_SEARCH_RESULTS:
            state = { ...state, results: action.payload };
            return state;
        default:
            return state;
    }
}