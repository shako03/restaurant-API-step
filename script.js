import {footer} from './data.js'

let cont = document.querySelector('.cont');
let sel = document.querySelector('.sel');
let sel2 = document.querySelector('.sel2');
let sel3 = document.querySelector('.sel3');
let sel4 = document.querySelector('.sel4');
let sel5 = document.querySelector('.sel5');
let foot = document.querySelector('.footer');


fetch('https://restaurant.stepprojects.ge/api/Categories/GetAll')
    .then(resp => resp.json())
    .then(categories => fillOptions(categories))




function fillOptions(categories) {
    sel.innerHTML = '<option value="All">All</option>';
    for (let category of categories) {
        sel.innerHTML += `
            <option value="${category.id}">${category.name.toUpperCase()}</option>
        `;
    }
}


console.log(footer)

sel.addEventListener("change", function () {
    if (sel.value === "All") {
        fetch('https://restaurant.stepprojects.ge/api/Products/GetAll')
            .then(res => res.json())
            .then(json => renderProducts(json))

    } else {
        fetch(`https://restaurant.stepprojects.ge/api/Categories/GetCategory/${sel.value}`)
            .then(resp => resp.json())
            .then(category => renderProducts(category.products))

    }
});






fetch( 'https://restaurant.stepprojects.ge/api/Products/GetFiltered?vegeterian=true')
    .then(resp => resp.json())
    .then(getFiltered => fillOptionTwo(getFiltered))

 
    


foot.innerHTML += footer







function renderProducts(products) {
    cont.innerHTML = '';
    for (let product of products) {
        cont.innerHTML += `
            <div class="box">
                <div class="img-cont" style="background-image: url(${product.image});"></div>
                <h2>${product.name}</h2>
                <h3>Price : ${product.price} ₾</h3>
                <a href="details.html?id=${product.id}">See more</a>
            </div>
        `;
    }
}




fetch('https://restaurant.stepprojects.ge/api/Products/GetAll')
    .then(res => res.json())
    .then(json => renderProducts(json))




















