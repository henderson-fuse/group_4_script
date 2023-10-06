const addSale = document.getElementById("add-sales");
const salesTable = document.getElementById("sales-table");
const closeSales = document.getElementById("close-form2");
const salesForm = document.getElementById("sales-form");

addSale.addEventListener("click", () => {
    salesTable.classList.add("products-gone");
    salesForm.classList.add("visible-form");
})

closeSales.addEventListener("click", () => {
    salesForm.classList.remove("visible-form");
    salesTable.classList.remove("products-gone");
})