const SET_TASKS = "task/SET_TASKS"
// const SET_TASK = "task/SET_TASK"
const SET_ORDER = "task/SET_ORDER"

const setTasks = (tasks) => ({
    type: SET_TASKS,
    payload: tasks
})

// const setTask = (task) => ({
//     type: SET_TASK,
//     payload: task
// })

const setOrder = (orders) => ({
    type: SET_ORDER,
    payload: orders
})


export const setAllTasks = (tasks, taskOrders) => async (dispatch) => {
    dispatch(setTasks(tasks))
    dispatch(setOrder(taskOrders))
}

export const getAllTasks = (id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}/tasks`)
    const data = await res.json()
    if (data.errors) {
        return data
    }
    dispatch(setTasks(data.tasks))
    dispatch(setOrder(data.taskOrders))
    return data
}

// export const addTask = (listId, taskName, ownerId) => async (dispatch) => {
//     const res = await fetch(`/api/lists/${listId}/tasks`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             owner_id: id,
//             name: listName,
//             notes: notes || null,
//             due_date: dueDate.split("T").join(" ") + ":00" || null
//         })
//     });
//     console.log("############RESPONSE OK. Data Returned #######")
//     const data = await res.json()
//     if (data.errors) {
//         return data
//     }
//     // let newList = Object.values(data.lists)[0]
//     dispatch(setLists(data.lists))
//     dispatch(setList(data.list))
//     dispatch(setOrder(data.order))
//     // dispatch(setList(newList))
//     return data
// }

const initialState = { tasks: {}, orderBy: {} }

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