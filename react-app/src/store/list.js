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
    dispatch(setLists(data.lists))
    dispatch(setList(data.list))
    return data
}


const initialState = { list: null, lists: null }

export default function listReducer(state = initialState, action) {
    switch (action.type) {
        case SET_LISTS:
            const newLists = [];
            for (let i = 0; i < action.payload.length; i++) {
                newLists.push(action.payload[i])
            }
            return { ...state, lists: newLists }
        case SET_LIST:
            return { ...state, list: action.payload }
        default:
            return state;
    }
}