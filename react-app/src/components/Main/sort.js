
export const sortOpen = (tasks) => {
    const open = [];
    const closed = [];
    if (typeof tasks === "object") {
        for (let id in tasks) {
            if (tasks[id].status === "open") {
                open.push(tasks[id])
            }
            else {
                closed.push(tasks[id])
            }
        }
    }
    else if (tasks.length) {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].status === "open") {
                open.push(tasks[i])
            }
            else {
                closed.push(tasks[i])
            }
        }
    }

    return { open, closed }
}


export const sortPriority = (tasks) => {
    const p0 = [];
    const p1 = [];
    const p2 = [];
    const p3 = [];
    if (typeof tasks === "object") {
        for (let id in tasks) {
            if (tasks[id].priority === 0) {
                p0.push(tasks[id])
            }
            else if (tasks[id].priority === 1) {
                p1.push(tasks[id])
            }
            else if (tasks[id].priority === 2) {
                p2.push(tasks[id])
            }
            else if (tasks[id].priority === 3) {
                p3.push(tasks[id])
            }
        }
    }
    else if (tasks.length) {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].priority === 0) {
                p0.push(tasks[i])
            }
            else if (tasks[i].priority === 1) {
                p1.push(tasks[i])
            }
            else if (tasks[i].priority === 2) {
                p2.push(tasks[i])
            }
            else if (tasks[i].priority === 3) {
                p3.push(tasks[i])
            }
        }
    }

    return { asc: [...p0, ...p1, ...p2, ...p3], desc: [...p0, ...p1, ...p2, ...p3].reverse(), no: p0, low: p1, med: p2, high: p3 }
}

export const sortCreated = (tasks) => {
    console.log(tasks)
    if (tasks.length <= 1) {
        return tasks
    }

    let pivot = tasks.pop();
    let left = tasks.filter(task => task.id < pivot.id)
    let right = tasks.filter(task => task.id > pivot.id)

    let leftSorted = sortCreated(left);
    let rightSorted = sortCreated(right);
    console.log(leftSorted, pivot, rightSorted)
    return leftSorted + pivot + rightSorted;

}

export const sortDue = (tasks) => {
    if (tasks.length <= 1) {
        return tasks
    }

    let pivot = tasks.pop();
    let left = tasks.filter(task => task.due_date < pivot.due_date)
    let right = tasks.filter(task => task.due_date >= pivot.due_date)

    let leftSorted = sortDue(left);
    let rightSorted = sortDue(right);

    return [...leftSorted, pivot, ...rightSorted];


}

