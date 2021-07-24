// constants
const SET_USER = "session/SET_USER"
const REMOVE_USER = "session/REMOVE_USER"

// action creators
const setUser = (user) => ({
    type: SET_USER,
    payload: user
})

const removeUser = () => ({
    type: REMOVE_USER,
})

// thunks

export const authenticate = () => async (dispatch) => {
    const response = await fetch('/api/auth/', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    if (data.errors) {
        return;
    }
    dispatch(setUser(data))
}

export const login = (nameOrEmail, password) => async (dispatch) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nameOrEmail,
            password
        })
    });

    console.log("#############RESPONSE OK. SESSION LOGIN")
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    dispatch(setUser(data))
    return data //change ({} to data) why are we returning nothing?
}

export const editUserInfo = (id, username, email, photo) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, photo })
    });

    const data = await res.json();
    if (data.errors) {
        return data
    }
    dispatch(setUser(data))
    return data

}

export const deleteUser = (id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}`, {
        method: "DELETE"
    })
    if (res.status === 304) {
        await dispatch(removeUser());
        await dispatch(logout())
    }
}

export const demoLogin = () => async (dispatch) => {
    const response = await fetch('/api/auth/demo')

    if (response.ok) {
        console.log("#############RESPONSE OK. SESSION LOGIN")
        const data = await response.json();
        if (data.errors) {
            return data;
        }
        dispatch(setUser(data))
        return {} //change ({} to data) why are we returning nothing?
        // Question Answered. By changing data to an empty object, it fixed an error which said data.errors was undefined (login form)
    }
}

export const logout = () => async (dispatch) => {
    const response = await fetch("/api/auth/logout", {
        headers: {
            "Content-Type": "application/json",
        }
    });
    const data = await response.json();
    dispatch(removeUser());
};


export const signUp = (username, email, password) => async (dispatch) => {
    const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            email,
            password,
        }),
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    dispatch(setUser(data))
    return {};
}



const initialState = { user: null }

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { user: action.payload }
        case REMOVE_USER:
            return { user: null }
        default:
            return state;
    }
}
