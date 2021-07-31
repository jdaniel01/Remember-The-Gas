

export const sortCompleted = (tasks) => {
    const listArray = [];
    for (let id in tasks) {
        listArray.push(tasks[id])
    }

    return listArray;
}