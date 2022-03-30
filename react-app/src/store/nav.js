const SET_NAV_STATUS = "nav/SET_NAV_STATUS";

const setNav = (payload) => ({
    type: SET_NAV_STATUS,
    payload: payload
});

export const setNavStatus = (location) => async (dispatch) => {

    if (location.endsWith('sign-up') || location.endsWith('login')) {
        dispatch(setNav("none"));
    }
    else {
        dispatch(setNav("flex"));
    }
    // dispatch(setNav(status));
};

const defaultState = { display: "flex" };

export default function navReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_NAV_STATUS:
            state = {display: action.payload };
            return state;
        default:
            return state;
    }
};