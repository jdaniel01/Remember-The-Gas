
// shownType === "open", "closed"
//filter === "created", "due_date", "list_id", "owner_id", "priority", "name"
export const sortTasks = (tasks, shownType, filter) => {
    const sortedTasks = [];
    if (typeof tasks === "object") {
        for (let key in tasks) {
            if (tasks[key].status === shownType) {
                sortedTasks.push(tasks[key])
            }
        }
    }
    else if (typeof tasks === 'array') {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].status === shownType) {
                sortedTasks.push(tasks[i])
            }
        }
    }


    return sortedTasks;
}


// window.addEventListener("DOMContentLoaded", event => {
//     const burgerBar = document.querySelector('nav-links-container')

//     burgerBar.addEventListener("click", e => {
//         e.preventDefault()
//         console.log("You clicked me")
//     })
// })