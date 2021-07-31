import { setSingleList, setAllLists, setListOrder } from "./list"

const SET_TASKS = "task/SET_TASKS"
const SET_ORDER = "task/SET_ORDER"

const setTasks = (tasks) => ({
    type: SET_TASKS,
    payload: tasks
})


const setOrder = (orders) => ({
    type: SET_ORDER,
    payload: orders
})


export const setAllTasks = (tasks) => async (dispatch) => {
    dispatch(setTasks(tasks))
}

export const setTasksOrder = (order) => async (dispatch) => {
    dispatch(setOrder(order))
}

export const getAllTasks = (id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}/tasks`)
    const data = await res.json()
    if (data.errors) {
        return data
    }
    dispatch(setTasks(data.tasks))
    dispatch(setOrder(data.tasksOrder))
    return data
}

export const changeTaskName = (id, name) => async (dispatch) => {
    const res = await fetch(`/api/tasks/${id}/name`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
    })
    const data = await res.json()
    if (data.errors) {
        return data
    }
    dispatch(setAllLists(data.lists))
    dispatch(setSingleList(data.list))
    dispatch(setTasks(data.tasks))
    dispatch(setListOrder(data.order))
    dispatch(setOrder(data.tasksOrder))
    return data
}

export const changeTaskDue = (id, date) => async (dispatch) => {
    const res = await fetch(`/api/tasks/${id}/due`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ due_date: date })
    })
    const data = await res.json()
    if (data.errors) {
        return data
    }
    dispatch(setAllLists(data.lists))
    dispatch(setSingleList(data.list))
    dispatch(setTasks(data.tasks))
    dispatch(setListOrder(data.order))
    dispatch(setOrder(data.tasksOrder))
    return data
}

export const changeTaskStart = (id, date) => async (dispatch) => {
    const res = await fetch(`/api/tasks/${id}/start`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ start_date: date })
    })
    const data = await res.json()
    if (data.errors) {
        return data
    }
    dispatch(setAllLists(data.lists))
    dispatch(setSingleList(data.list))
    dispatch(setTasks(data.tasks))
    dispatch(setListOrder(data.order))
    dispatch(setOrder(data.tasksOrder))
    return data
}


export const changeTaskStatus = (id, status) => async (dispatch) => {
    const res = await fetch(`/api/tasks/${id}/status`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
    })
    const data = await res.json()
    if (data.errors) {
        return data
    }
    dispatch(setAllLists(data.lists))
    dispatch(setSingleList(data.list))
    dispatch(setTasks(data.tasks))
    dispatch(setListOrder(data.order))
    dispatch(setOrder(data.tasksOrder))
    return data
}



export const deleteTask = (id) => async (dispatch) => {
    const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" })
    if (res.ok) {
        const data = await res.json()
        dispatch(setAllLists(data.lists))
        dispatch(setSingleList(data.list))
        dispatch(setListOrder(data.order))
        dispatch(setTasks(data.tasks))
        dispatch(setOrder(data.tasksOrder))
        return data
    }
}


const initialState = { tasks: {}, orderBy: { created: [] } }

export default function taskReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TASKS:
            return { ...state, tasks: action.payload }
        case SET_ORDER:
            return { ...state, orderBy: action.payload }
        default:
            return state;
    }
}