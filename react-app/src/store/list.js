const SET_LISTS = "list/SET_LISTS"
const SET_LIST = "list/SET_LIST"


const setLists = (lists) => ({
    type: SET_LISTS,
    payload: lists
})

const setList = (list) => ({
    type: SET_LIST,
    payload: list
})

export const addList = (id, listName, notes, dueDate) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}/lists`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            owner_id: id,
            name: listName,
            notes: notes || null,
            due_date: dueDate.split("T").join(" ") + ":00" || null
        })
    });
    console.log("############RESPONSE OK. Data Returned #######")
    const data = await res.json()
    if (data.errors) {
        return data
    }
    let newList = Object.values(data.lists)[0]
    dispatch(setLists(data.lists))
    dispatch(setList(newList))
    return data
}

export const getLists = (id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}/lists`)
    console.log("##########RESPONSE OK. Data Recieved######")
    const data = await res.json()
    let newList = Object.values(data.lists)[0]
    dispatch(setLists(data.lists))
    dispatch(setList(newList))
    return data
}

export const getList = (id) => async (dispatch) => {
    const res = await fetch(`/api/lists/${id}`)
    console.log("##########RESPONSE OK. Data Recieved######")
    const list = await res.json()
    if (list.errors) {
        return list
    }
    dispatch(setList(list))
    return list
}

export const setSingleList = (list) => async (dispatch) => {
    dispatch(setList(list))
}


const initialState = { list: null, lists: null }

export default function listReducer(state = initialState, action) {
    switch (action.type) {
        case SET_LISTS:
            return { ...state, lists: action.payload }
        case SET_LIST:
            return { ...state, list: action.payload }
        default:
            return state;
    }
}