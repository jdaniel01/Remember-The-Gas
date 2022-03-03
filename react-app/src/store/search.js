const SET_HAVE_INPUT = "search/SET_HAVE_INPUT";
const SET_NOT_HAVE_INPUT = "search/SET_NOT_HAVE_INPUT";
const SET_OPTIONS = "search/SET_OPTIONS";
const SET_CHECKED = "search/SET_CHECKED";

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


const initialState = { have: "", notHave: "", showOptions: false, checked: false }

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
        default:
            return state;
    }
}