<<<<<<< HEAD
import { setSingleList, setAllLists, setListOrder } from "./list"
import { sortOpen, sortPriority } from "./sort"

=======
import { setSingleList, setAllLists } from "./list" //removed , setListOrder
>>>>>>> primeSort

const SET_TASKS = "task/SET_TASKS"
// const SET_ORDER = "task/SET_ORDER"

const setTasks = (tasks) => ({
    type: SET_TASKS,
    payload: tasks
})


// const setOrder = (orders) => ({
//     type: SET_ORDER,
//     payload: orders
// })


export const setAllTasks = (tasks) => async (dispatch) => {
    dispatch(setTasks(tasks))
}

// export const setTasksOrder = (order) => async (dispatch) => {
//     dispatch(setOrder(order))
// }

export const getAllTasks = (id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}/tasks`)
    const data = await res.json()
    if (data.errors) {
        return data
    }
<<<<<<< HEAD
    dispatch(setTasks(data.tasks))
    const status = sortOpen(data.tasks)
    const priority = sortPriority(data.tasks)
    dispatch(setOrder({ created: data.tasksOrder.created, status: { open: status.open, closed: status.closed }, priority: { none: priority.no, low: priority.low, med: priority.med, high: priority.high } }))

=======
    dispatch(setTasks(data))
    // dispatch(setOrder(data.tasksOrder))
>>>>>>> primeSort
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
<<<<<<< HEAD
    dispatch(setListOrder(data.order))
    // dispatch(setOrder(data.tasksOrder))
    const status = sortOpen(data.tasks)
    const priority = sortPriority(data.tasks)
    dispatch(setOrder({ created: data.tasksOrder.created, status: { open: status.open, closed: status.closed }, priority: { none: priority.no, low: priority.low, med: priority.med, high: priority.high } }))
=======
    // dispatch(setListOrder(data.order))
    // dispatch(setOrder(data.tasksOrder))
>>>>>>> primeSort
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
<<<<<<< HEAD
    dispatch(setListOrder(data.order))
    // dispatch(setOrder(data.tasksOrder))
    const status = sortOpen(data.tasks)
    const priority = sortPriority(data.tasks)
    dispatch(setOrder({ created: data.tasksOrder.created, status: { open: status.open, closed: status.closed }, priority: { none: priority.no, low: priority.low, med: priority.med, high: priority.high } }))
=======
    // dispatch(setListOrder(data.order))
    // dispatch(setOrder(data.tasksOrder))
>>>>>>> primeSort
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
<<<<<<< HEAD
    dispatch(setListOrder(data.order))
    // dispatch(setOrder(data.tasksOrder))
    const status = sortOpen(data.tasks)
    const priority = sortPriority(data.tasks)
    dispatch(setOrder({ created: data.tasksOrder.created, status: { open: status.open, closed: status.closed }, priority: { none: priority.no, low: priority.low, med: priority.med, high: priority.high } }))
=======
    // dispatch(setListOrder(data.order))
    // dispatch(setOrder(data.tasksOrder))
>>>>>>> primeSort
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
<<<<<<< HEAD
    dispatch(setListOrder(data.order))
    // dispatch(setOrder(data.tasksOrder))
    const status = sortOpen(data.tasks)
    const priority = sortPriority(data.tasks)
    dispatch(setOrder({ created: data.tasksOrder.created, status: { open: status.open, closed: status.closed }, priority: { none: priority.no, low: priority.low, med: priority.med, high: priority.high } }))
=======
    // dispatch(setListOrder(data.order))
    // dispatch(setOrder(data.tasksOrder))
>>>>>>> primeSort
    return data
}


export const changeTaskPriority = (id, priority) => async (dispatch) => {
    const res = await fetch(`/api/tasks/${id}/priority`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ priority })
    })
    const data = await res.json()
    if (data.errors) {
        return data
    }
    dispatch(setAllLists(data.lists))
    dispatch(setSingleList(data.list))
    dispatch(setTasks(data.tasks))
<<<<<<< HEAD
    dispatch(setListOrder(data.order))
    // dispatch(setOrder(data.tasksOrder))
    const status = sortOpen(data.tasks)
    const priority = sortPriority(data.tasks)
    dispatch(setOrder({ created: data.tasksOrder.created, status: { open: status.open, closed: status.closed }, priority: { none: priority.no, low: priority.low, med: priority.med, high: priority.high } }))
=======
    // dispatch(setListOrder(data.order))
    // dispatch(setOrder(data.tasksOrder))
>>>>>>> primeSort
    return data
}


export const deleteTask = (id) => async (dispatch) => {
    const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" })
    if (res.ok) {
        const data = await res.json()
        dispatch(setAllLists(data.lists))
        dispatch(setSingleList(data.list))
        // dispatch(setListOrder(data.order))
        dispatch(setTasks(data.tasks))
        // dispatch(setOrder(data.tasksOrder))
<<<<<<< HEAD
        const status = sortOpen(data.tasks)
        const priority = sortPriority(data.tasks)
        dispatch(setOrder({ created: data.tasksOrder.created, status: { open: status.open, closed: status.closed }, priority: { none: priority.no, low: priority.low, med: priority.med, high: priority.high } }))
=======
>>>>>>> primeSort
        return data
    }
}


const initialState = {} // changed from   {tasks: {}, orderBy: { created: [] }} 

export default function taskReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TASKS:
            return action.payload;
        default:
            return state;
    }
}