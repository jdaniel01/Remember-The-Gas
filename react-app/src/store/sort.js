

export const sortOpen = (tasks) => {
    const open = [];
    const closed = [];

    for (let id in tasks) {
        if (tasks[id].status === "open") {
            open.push(tasks[id].id)
        }
        else {
            closed.push(tasks[id].id)
        }
    }

    return { open, closed }
}


export const sortPriority = (tasks) => {
    const p0 = [];
    const p1 = [];
    const p2 = [];
    const p3 = [];

    for (let id in tasks) {
        if (tasks[id].priority === 0) {
            p0.push(tasks[id].id)
        }
        else if (tasks[id].priority === 1) {
            p1.push(tasks[id].id)
        }
        else if (tasks[id].priority === 2) {
            p2.push(tasks[id].id)
        }
        else if (tasks[id].priority === 3) {
            p3.push(tasks[id].id)
        }
    }

    return { no: p0, low: p1, med: p2, high: p3 }
}



