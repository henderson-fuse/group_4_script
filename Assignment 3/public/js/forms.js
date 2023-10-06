const triggerBtn = document.getElementById("new-product");
const productForm = document.getElementById("product-form");
const products = document.getElementById("products");
const title = document.getElementById("main-title");
const closeForm = document.getElementById("close-form");



triggerBtn.addEventListener("click", () => {
    if (productForm.classList.contains("visible-form")) {
        productForm.classList.remove("visible-form");
        products.classList.remove("products-gone")
    } else {
        productForm.classList.add("visible-form");
        products.classList.add("products-gone");
        title.classList.add("products-gone");
    }
})

closeForm.addEventListener("click", () => {
    productForm.classList.remove("visible-form");
    products.classList.remove("products-gone");
    title.classList.remove("products-gone");
})

