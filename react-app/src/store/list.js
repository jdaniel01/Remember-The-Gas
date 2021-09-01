import { setAllTasks, setTasksOrder } from "./task"
import { sortOpen, sortPriority } from "../components/Main/sort"

const SET_LISTS = "list/SET_LISTS"
const SET_LIST = "list/SET_LIST"
const SET_ORDER = 'list/SET_ORDER'

const setLists = (lists) => ({
    type: SET_LISTS,
    payload: lists
})

const setList = (list) => ({
    type: SET_LIST,
    payload: list
})

const setOrder = (order) => ({
    type: SET_ORDER,
    payload: order
})

export const addList = (id, listName, notes) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}/lists`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            owner_id: id,
            name: listName,
            notes: notes || null,
        })
    });
    const data = await res.json()
    if (data.errors) {
        return data
    }
    dispatch(setLists(data.lists))
    dispatch(setList(data.list))
    dispatch(setOrder(data.order))
    dispatch(setAllTasks(data.tasks))
    const status = sortOpen(data.tasks)
    const priority = sortPriority(data.tasks)
    dispatch(setTasksOrder({ status, priority }))
    return data
}

export const getLists = (id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}/lists`)
    const data = await res.json()
    dispatch(setLists(data.lists))
    dispatch(setOrder(data.order))
    return data
}

export const getList = (id) => async (dispatch) => {
    const res = await fetch(`/api/lists/${id}`)
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

export const setAllLists = (lists) => async (dispatch) => {
    dispatch(setLists(lists))
}

export const setListOrder = (order) => async (dispatch) => {
    dispatch(setOrder(order))
}

export const dropList = (id) => async (dispatch) => {
    const res = await fetch(`/api/lists/${id}`, {
        method: "DELETE"
    })
    const data = await res.json();
    dispatch(setLists(data.lists))
    // dispatch(setList(data.list))
    const listStatus = sortOpen(data.list.tasks)
    const listPriority = sortPriority(data.list.tasks)
    dispatch(setList({ ...data.list, orderBy: { status: listStatus, priority: listPriority } }))
    dispatch(setOrder(data.order))
    dispatch(setAllTasks(data.tasks))
    // dispatch(setTasksOrder(data.tasksOrder))
    const status = sortOpen(data.tasks)
    const priority = sortPriority(data.tasks)
    dispatch(setTasksOrder({ status, priority }))
    return data
}

export const editName = (id, name) => async (dispatch) => {
    const res = await fetch(`/api/lists/${id}/name`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
    })
    const data = await res.json()
    dispatch(setLists(data.lists))
    // dispatch(setList(data.list))
    const listStatus = sortOpen(data.list.tasks)
    const listPriority = sortPriority(data.list.tasks)
    dispatch(setList({ ...data.list, status: listStatus, priority: listPriority }))
    dispatch(setOrder(data.order))
    return data
}

export const addTask = (id, name) => async (dispatch) => {
    const res = await fetch(`/api/lists/${id}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
    })
    const data = await res.json()
    if (data.errors) {
        return data
    }
    dispatch(setLists(data.lists))
    // dispatch(setList(data.list))
    const listStatus = sortOpen(data.list.tasks)
    const listPriority = sortPriority(data.list.tasks)
    dispatch(setList({ ...data.list, status: listStatus, priority: listPriority }))
    dispatch(setAllTasks(data.tasks))
    dispatch(setOrder(data.order))
    // dispatch(setTasksOrder(data.tasksOrder))
    const status = sortOpen(data.tasks)
    const priority = sortPriority(data.tasks)
    dispatch(setTasksOrder({ status, priority }))
    return data
}

export const changeListStart = (id, date) => async (dispatch) => {
    const res = await fetch(`/api/lists/${id}/start`, {
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
    dispatch(setLists(data.lists))
    const listStatus = sortOpen(data.list.tasks)
    const listPriority = sortPriority(data.list.tasks)
    dispatch(setList({ ...data.list, status: listStatus, priority: listPriority }))
    dispatch(setAllTasks(data.tasks))
    dispatch(setOrder(data.order))
    // dispatch(setTasksOrder(data.tasksOrder))
    const status = sortOpen(data.tasks)
    const priority = sortPriority(data.tasks)
    dispatch(setTasksOrder({ status, priority }))
    return data
}

const initialState = { list: {}, lists: {}, order: [] }

export default function listReducer(state = initialState, action) {
    switch (action.type) {
        case SET_LISTS:
            return { ...state, lists: action.payload }
        case SET_LIST:
            return { ...state, list: action.payload }
        case SET_ORDER:
            return { ...state, order: action.payload }
        default:
            return state;
    }
}