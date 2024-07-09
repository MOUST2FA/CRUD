var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescInput = document.getElementById("productDesc");
var searchProductInput = document.getElementById("searchProduct");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var alertName = document.getElementById("alertName");
var alertPrice = document.getElementById("alertPrice");
var alertCategory = document.getElementById("alertCategory");
var alertDesc = document.getElementById("alertDesc");

var indexUpdate = 0

var arrayProduct = [];
if (localStorage.getItem("products") != null) {
    arrayProduct = JSON.parse(localStorage.getItem("products"))
    displayProduct()
}

function getProduct() {
    if (validationName() == true && validationPrice() == true && validationCategory() == true && validationDesc() == true) {

        var product = {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            Description: productDescInput.value,
        }

        arrayProduct.push(product)
        localStorage.setItem("products", JSON.stringify(arrayProduct))
        displayProduct()
        clear()
        clearValidation()
    }
};

function displayProduct() {
    var carton = ""
    for (var i = 0; i < arrayProduct.length; i++) {
        carton += `
        <tr>
        <td>${i}</td>
        <td>${arrayProduct[i].name}</td>
        <td>${arrayProduct[i].price}</td>
        <td>${arrayProduct[i].category}</td>
        <td>${arrayProduct[i].Description}</td>
        <td>
            <button class="btn btn-warning btn-sm" onclick="setProduct(${i})">Update</button>
            <button class="btn btn-danger btn-sm" onclick="deleteProduct(${i})">Delete</button>
        </td>
        </tr>
        `
        document.getElementById("tableProduct").innerHTML = carton
    }
}

function deleteProduct(index) {
    arrayProduct.splice(index, 1)
    localStorage.setItem("products", JSON.stringify(arrayProduct))
    displayProduct()
}

function searchProduct() {
    var term = searchProductInput.value
    var carton = ""
    for (var i = 0; i < arrayProduct.length; i++) {

        if (arrayProduct[i].name.toLowerCase().includes(term.toLowerCase())) {
            carton += `
            <tr>
            <td>${arrayProduct[i].name.replace(term , `<span>${term}</span>`)}</td>
            <td>${arrayProduct[i].price}</td>
            <td>${arrayProduct[i].category}</td>
            <td>${arrayProduct[i].Description}</td>
            <td>
                <button class="btn btn-warning btn-sm">Update</button>
                <button class="btn btn-danger btn-sm" onclick="deleteProduct(${i})">Delete</button>
            </td>
            </tr>
            `
            document.getElementById("tableProduct").innerHTML = carton
        }
    }

}

function setProduct(index) {

    indexUpdate = index

    var cuntProduct = arrayProduct[index]

    productNameInput.value = cuntProduct.name
    productPriceInput.value = cuntProduct.price
    productCategoryInput.value = cuntProduct.category
    productDescInput.value = cuntProduct.Description

    updateBtn.classList.remove("d-none")
    addBtn.classList.add("d-none")

}

function updateProduct() {
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        Description: productDescInput.value,
    }

    arrayProduct.splice(indexUpdate, 1, product)
    localStorage.setItem("products", JSON.stringify(arrayProduct))
    displayProduct()
    clear()
    clearValidation()
    updateBtn.classList.add("d-none")
    addBtn.classList.remove("d-none")
}

function clear() {
    productNameInput.value = ""
    productPriceInput.value = ""
    productCategoryInput.value = ""
    productDescInput.value = ""
}

function validationName() {
    var textName = productNameInput.value
    var regexName = /^[A-Z][a-z]{2,8}$/
    if (regexName.test(textName) == true) {
        productNameInput.classList.add("is-valid")
        productNameInput.classList.remove("is-invalid")
        return true
    } else {
        productNameInput.classList.remove("is-valid")
        productNameInput.classList.add("is-invalid")
        return false
    }
}

function validationName() {
    var textName = productNameInput.value
    var regexName = /^[A-Z][a-z\s]{2,8}$/
    if (regexName.test(textName) == true) {
        productNameInput.classList.add("is-valid")
        productNameInput.classList.remove("is-invalid")
        alertName.classList.add("d-none")
        return true
    } else {
        productNameInput.classList.remove("is-valid")
        productNameInput.classList.add("is-invalid")
        alertName.classList.remove("d-none")

        return false
    }
}

function validationPrice() {
    var textPrice = productPriceInput.value
    var regexPrice = /^[1-9][0-9]{1,4}$/
    if (regexPrice.test(textPrice) == true) {
        productPriceInput.classList.add("is-valid")
        productPriceInput.classList.remove("is-invalid")
        alertPrice.classList.add("d-none")
        return true
    } else {
        productPriceInput.classList.remove("is-valid")
        productPriceInput.classList.add("is-invalid")
        alertPrice.classList.remove("d-none")

        return false
    }

}

function validationCategory() {
    var textCategory = productCategoryInput.value
    var regexCategory = /^[a-zA-Z \s]{1,10}$/
    if (regexCategory.test(textCategory) == true) {
        productCategoryInput.classList.add("is-valid")
        productCategoryInput.classList.remove("is-invalid")
        alertCategory.classList.add("d-none")
        return true
    } else {
        productCategoryInput.classList.remove("is-valid")
        productCategoryInput.classList.add("is-invalid")
        alertCategory.classList.remove("d-none")

        return false
    }

}

function validationDesc() {
    var textDesc = productDescInput.value
    var regexDesc = /^[a-zA-Z \s]{1,}$/
    if (regexDesc.test(textDesc) == true) {
        productDescInput.classList.add("is-valid")
        productDescInput.classList.remove("is-invalid")
        alertDesc.classList.add("d-none")
        return true
    } else {
        productDescInput.classList.remove("is-valid")
        productDescInput.classList.add("is-invalid")
        alertDesc.classList.remove("d-none")

        return false
    }

}

function clearValidation() {
    productNameInput.classList.remove("is-valid")
    productNameInput.classList.remove("is-invalid")
    productPriceInput.classList.remove("is-valid")
    productPriceInput.classList.remove("is-invalid")
    productCategoryInput.classList.remove("is-valid")
    productCategoryInput.classList.remove("is-invalid")
    productDescInput.classList.remove("is-valid")
    productDescInput.classList.remove("is-invalid")
}