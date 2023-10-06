const displayMail = document.getElementById("mail-btn");
const tiles = document.getElementById("dash");
const sendMail = document.getElementById("mail");
const closeMail = document.getElementById("close-mail");
const details = document.getElementById("sale-product")

displayMail.addEventListener("click", () => {
    tiles.classList.add("products-gone");
    sendMail.classList.add("visible-form");
    details.classList.add("products-gone")
})

closeMail.addEventListener("click", () => {
    tiles.classList.remove("products-gone");
    sendMail.classList.remove("visible-form");
    details.classList.remove("products-gone")
})