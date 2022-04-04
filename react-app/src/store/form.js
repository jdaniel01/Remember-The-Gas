const SET_USERNAME = "form/SET_USERNAME";
const SET_EMAIL = "form/SET_EMAIL";
const SET_PASSWORD = 'form/SET_PASSWORD';
const SET_CONFIRM = "form/SET_CONFIRM";
const SET_LOGIN = 'form/SET_LOGIN'; //this is the usernmae/email
const SET_CRED = 'form/SET_CRED'; // thi is the password credentials
const SET_FORGOT_EMAIL = 'form/SET_FORGOT_EMAIL'; // this is the forgot email

const setUsername = (payload) => ({
    type: SET_USERNAME,
    payload: payload
});

const setEmail = (payload) => ({
    type: SET_EMAIL,
    payload: payload
});

const setPassword = (payload) => ({
    type: SET_PASSWORD,
    payload: payload
});

const setConfirm = (payload) => ({
    type: SET_CONFIRM,
    payload: payload
});

const setLogin = (payload) => ({
    type: SET_LOGIN,
    payload: payload
});

const setCred = (payload) => ({
    type: SET_CRED,
    payload: payload
});

const setForgotEmail = (payload) => ({
    type: SET_FORGOT_EMAIL,
    payload: payload
})

export const updateUsername = (username) => async (dispatch) => {
    //check if username meets criteria here or in component?
    dispatch(setUsername(username))
}

export const updateEmail = (email) => async (dispatch) => {
    //check if username meets criteria here or in component?
    dispatch(setEmail(email))
}

export const updatePassword = (password) => async (dispatch) => {
    //check if username meets criteria here or in component?
    dispatch(setPassword(password))
}

export const updateConfirm = (confirm) => async (dispatch) => {
    //check if username meets criteria here or in component?
    dispatch(setConfirm(confirm))
}

export const updateLogin = (login) => async (dispatch) => {
    //check if username meets criteria here or in component?
    dispatch(setLogin(login))
}

export const updateCred = (cred) => async (dispatch) => {
    //check if username meets criteria here or in component?
    dispatch(setCred(cred))
}

export const updateForgotEmail = (email) => async (dispatch) => {
    dispatch(setForgotEmail(email))
}

export const sendForgotEmail = (email) => async (dispatch) => {
    //need to make a call to database to ensure there is a user with email, if so send email via backend and prepare an alert to the member on the frontend.
    if (email) {
        return {message: `An email was sent to ${email}. Check your inbox for further instructions.`}
    }
}

const defaultState = { login: { usernameOrEmail: "", password: "" }, signup: { username: "", email: "", password: "", confirmPassword: "" }, forgot: "" };

export default function formReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USERNAME:
            state = { ...state, signup: { ...state.signup, username: action.payload } };
            return state;
        case SET_EMAIL:
            state = { ...state, signup: { ...state.signup, email: action.payload } };
            return state;
        case SET_PASSWORD:
            state = { ...state, signup: { ...state.signup, password: action.payload } };
            return state;
        case SET_CONFIRM:
            state = { ...state, signup: { ...state.signup, confirmPassword: action.payload } };
            return state;
        case SET_LOGIN:
            state = { ...state, login: { ...state.login, usernameOrEmail: action.payload } }
            return state;
        case SET_CRED:
            state = { ...state, login: { ...state.login, password: action.payload } }
            return state;
        case SET_FORGOT_EMAIL:
            state = { ...state, forgot: action.payload }
            return state;
        default:
            return state;
    }   
}