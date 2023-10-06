const showNav = document.getElementById("nav-display");
const nav = document.getElementById("js-nav");
const trigger = document.getElementById("js-search-text");
const formVisible = document.getElementById("the-form");
const searchBtn = document.getElementById("search-btn");

showNav.addEventListener("click", function () {
    if (nav.classList.contains("nav-visible")) {
        nav.classList.remove("nav-visible");
        if (showNav.classList.contains("fa-x")) {
            showNav.classList.replace("fa-x", "fa-bars")
        }
    }
    else {
        nav.classList.add("nav-visible")
        showNav.classList.replace("fa-bars", "fa-x")
    }
})

trigger.addEventListener("click", function () {
    if (trigger.classList.contains("search-text-hide")) {
        trigger.classList.remove("search-text-hide")
    }
    else {
        trigger.classList.add("search-text-hide")
        formVisible.classList.add("form-display")
    }
})

searchBtn.addEventListener("click", function () {
    formVisible.classList.remove("form-display")
    trigger.classList.remove("search-text-hide")
})