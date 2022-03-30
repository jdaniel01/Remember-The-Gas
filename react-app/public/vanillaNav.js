window.addEventListener("DOMContentLoaded", (event) => {
    const nav = document.querySelector(".navigation_bar");
    const oldPath = window.location.pathname;

    window.addEventListener("hashchange", e => {
        let currPath = window.location.pathname;
        console.log("oldPath", oldPath);
        console.log("currPath", currPath);
        if (currPath !== oldPath) {
            oldPath === currPath;
        }
        console.log("oldPath again", oldPath);
        if (oldPath === '/login' || oldPath === "/sign-up") {
            nav.setAttribute("display", "true");
            console.log(nav);
        }
        else {
            nav.setAttribute("hidden", false);
        }

    })
    

    


    

})