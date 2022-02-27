

export const sortStatus = (tasks) => {
    /// Order tasks by status (open/closed) ///
    const status = { open: [], closed: [] }
    for (let id in tasks) {
        if (tasks[id].status === "open") {
            status.open.push(tasks[id])
        }
        else {
            status.closed.push(tasks[id])
        }

    }
    return status;
}

export const sortCreated = (taskArr) => {
    /// Order tasks by creation date ///
    if (taskArr.length <= 1) {
        return taskArr;
    }
    const pivot = taskArr[0];
    let left = [];
    let right = [];

    for (let i = 1; i < taskArr.length; i++) {
        if (taskArr[i].id > pivot.id) {
            left.push(taskArr[i])
        }
        else {
            right.push(taskArr[i])
        }
    }

    let sortedLeft = sortCreated(left);
    let sortedRight = sortCreated(right);
    return [...sortedLeft, pivot, ...sortedRight];
}

export const sortPriority = (taskArr) => {
    const tasks = { "none": [], "low": [], "med": [], "high": [] };
    for (let i = 0; i < taskArr.length; i++) {
        if (taskArr[i].priority === 0) {
            tasks.none.push(taskArr[i])
        }
        else if (taskArr[i].priority === 1) {
            tasks.low.push(taskArr[i])
        }
        else if (taskArr[i].priority === 2) {
            tasks.med.push(taskArr[i])
        }
        else {
            tasks.high.push(taskArr[i])
        }
<<<<<<< HEAD
    }

    return [...sortCreated(tasks.high), ...sortCreated(tasks.med), ...sortCreated(tasks.low), ...sortCreated(tasks.none)]
}


export const sortDue = (taskArr, step = 0) => {
    const currStep = step;
    if (taskArr.length <= 1) {
        return taskArr
    }
    const pivot = taskArr[0];
    let left = [];
    let right = [];
    let none = [];

    for (let i = 1; i < taskArr.length; i++) {
        if (taskArr[i].due_date <= pivot.due_date) {
            left.push(taskArr[i])
        }
        else if (taskArr[i].due_date > pivot.due_date) {
            right.push(taskArr[i])
        }
        else {
            none.push(taskArr[i])
        }
    }

    let sortedLeft = sortDue(left, currStep + 1);
    let sortedRight = sortDue(right, currStep + 1);
    if (currStep > 0) {
        return [...sortedLeft, ...sortedRight];
    }
    else {
        return [...sortedLeft, ...sortedRight, ...none]
    }
}

export const sortStart = (taskArr) => {
    if (taskArr.length <= 1) {
        return taskArr
    }
    const pivot = taskArr[0];
    let left = [];
    let right = [];

    for (let i = 1; i < taskArr.length; i++) {
        if (taskArr[i].start_date <= pivot.start_date) {
            left.push(taskArr[i])
        }
        else {
            right.push(taskArr[i])
        }
    }

    let sortedLeft = sortStart(left);
    let sortedRight = sortStart(right);

    return [...sortedLeft, pivot, ...sortedRight];
}

export const sortName = (taskArr) => {
    if (taskArr.length <= 1) {
        return taskArr;
    }

    const pivot = taskArr[0];
    let left = [];
    let right = [];

    for (let i = 1; i < taskArr.length; i++) {
        if (taskArr[i].name <= pivot.name) {
            left.push(taskArr[i])
        }
        else {
            right.push(taskArr[i])
        }
    }

    let sortedLeft = sortName(left);
    let sortedRight = sortName(right);

    return [...sortedLeft, pivot, ...sortedRight]
}



window.addEventListener("DOMContentLoaded", event => {
    const burgerBar = document.querySelector('nav-links-container')
=======
    }

    return [...sortCreated(tasks.high), ...sortCreated(tasks.med), ...sortCreated(tasks.low), ...sortCreated(tasks.none)]
}


export const sortDue = (taskArr, step = 0) => {
    const currStep = step;
    if (taskArr.length <= 1) {
        return taskArr
    }
    const pivot = taskArr[0];
    let left = [];
    let right = [];
    let none = [];

    for (let i = 1; i < taskArr.length; i++) {
        if (taskArr[i].due_date <= pivot.due_date) {
            left.push(taskArr[i])
        }
        else if (taskArr[i].due_date > pivot.due_date) {
            right.push(taskArr[i])
        }
        else {
            none.push(taskArr[i])
        }
    }

    let sortedLeft = sortDue(left, currStep + 1);
    let sortedRight = sortDue(right, currStep + 1);
    if (currStep > 0) {
        return [...sortedLeft, ...sortedRight];
    }
    else {
        return [...sortedLeft, ...sortedRight, ...none]
    }
}

export const sortStart = (taskArr) => {
    if (taskArr.length <= 1) {
        return taskArr
    }
    const pivot = taskArr[0];
    let left = [];
    let right = [];

    for (let i = 1; i < taskArr.length; i++) {
        if (taskArr[i].start_date <= pivot.start_date) {
            left.push(taskArr[i])
        }
        else {
            right.push(taskArr[i])
        }
    }

    let sortedLeft = sortStart(left);
    let sortedRight = sortStart(right);

    return [...sortedLeft, pivot, ...sortedRight];
}

export const sortName = (taskArr) => {
    if (taskArr.length <= 1) {
        return taskArr;
    }

    const pivot = taskArr[0];
    let left = [];
    let right = [];

    for (let i = 1; i < taskArr.length; i++) {
        if (taskArr[i].name <= pivot.name) {
            left.push(taskArr[i])
        }
        else {
            right.push(taskArr[i])
        }
    }

    let sortedLeft = sortName(left);
    let sortedRight = sortName(right);

    return [...sortedLeft, pivot, ...sortedRight]
}


>>>>>>> primeSort


// window.addEventListener("DOMContentLoaded", event => {
//     const burgerBar = document.querySelector('nav-links-container')

//     burgerBar.addEventListener("click", e => {
//         e.preventDefault()
//         console.log("You clicked me")
//     })
// })