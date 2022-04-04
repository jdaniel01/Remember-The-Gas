const TOGGLE_BURGER_BAR = "menu/TOGGLE_BURGER_BAR";

const setBurgerBar = (boolean) => ({
    type: TOGGLE_BURGER_BAR,
    payload: boolean
});

export const toggleBurger = (bool) => async (dispatch) => {
    dispatch(setBurgerBar(bool));
};

const defaultState = {
    burger: {
        open: false
    },
    search: {
        optionsOpen: false
    },
    userSettings: {
        open: false
    }
};

export default function menuReducer(state = defaultState, action) {
    switch (action.type) {
        case TOGGLE_BURGER_BAR:
            state = { ...state, burger: { ...state.burger, open: action.payload } }
            return state;
        default:
            return state;
    }
};