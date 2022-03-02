const SET_HAVE_INPUT = "search/SET_HAVE_INPUT";
const SET_NOT_HAVE_INPUT = "search/SET_NOT_HAVE_INPUT";

const setHaveInput = (haveInput) => ({
    type: SET_HAVE_INPUT,
    payload: haveInput
});

const setNotHaveInput = (notHaveInput) => ({
    type: SET_NOT_HAVE_INPUT,
    payload: notHaveInput
})

export const changeInput = (have, notHave) => async (dispatch) => {
    dispatch(setHaveInput(have));
    dispatch(setNotHaveInput(notHave));
}

const initialState = { have: "", notHave: "" }

export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case SET_HAVE_INPUT:
            state = { ...state, have: action.payload };
            return state;
        case SET_NOT_HAVE_INPUT:
            state = { ...state, notHave: action.payload };
            return state;
        default:
            return state;
    }
}