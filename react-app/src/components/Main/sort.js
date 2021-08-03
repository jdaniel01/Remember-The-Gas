

export const sortCompleted = (tasks) => {
    const listArray = [];
    for (let id in tasks) {
        listArray.push(tasks[id])
    }

    return listArray;
}


window.addEventListener("DOMContentLoaded", event => {
    const burgerBar = document.querySelector('nav-links-container')

    burgerBar.addEventListener("click", e => {
        e.preventDefault()
        console.log("You clicked me")
    })
})