import { footer } from './data.js'

let filtersArray = {};

let cont = document.querySelector('.cont');
let sel = document.querySelector('.sel');
let sel2 = document.querySelector('.sel2')
let sel3 = document.querySelector('.sel3')
let sel4 = document.querySelector('.sel4')

document.querySelector('.footer').innerHTML += footer





function fetchCategories() {
    fetch('https://restaurant.stepprojects.ge/api/Categories/GetAll')
        .then(res => res.json())
        .then(json => fillOptions(json))

}





function filterArray(addFilter) {
    if (addFilter.value == "All") {
        delete filtersArray[addFilter.key] 
    } else {
        
        filtersArray[addFilter.key] = addFilter.value  
    }

    let url = `https://restaurant.stepprojects.ge/api/Products/GetFiltered`; 

    url += '?' + Object.entries(filtersArray).map(([key, value]) => `${key}=${value}`).join('&');

    fetch(url).then(resp => resp.json())
        .then(resp => renderProducts(resp))
}







function getAll() {
    fetch('https://restaurant.stepprojects.ge/api/Products/GetAll')
        .then(res => res.json())
        .then(json => renderProducts(json))
}






function fillOptions(categories) {
    sel.innerHTML = '<option value="All">All</option>';
    for (let category of categories) {
        sel.innerHTML += `
            <option value="${category.id}">${category.name.toUpperCase()}</option>
        `;
    }
}






function renderProducts(products) {
    cont.innerHTML = '';
    for (let product of products) {
        cont.innerHTML += `
            <div class="box">
                <div class="img-cont" style="background-image: url(${product.image});"></div>
                <h2>${product.name}</h2>
                <h3>Price: ${product.price}</h3>
                <h4>Nuts: ${product.nuts}</h4>
                <h3>Spiciness: ${product.spiciness}</h3>
                <h4>Vegetarian: ${product.vegeterian}</h4>
                <a href="index.html?id=${product.id}">Go back</a>
            </div>
        `;
    }
}

sel.addEventListener("change", function () {
    if (sel.value === "All") {
        getAll();
        filtersArray = {}
        sel2.value = "All"   
        sel3.value = "All"
        sel4.value = "All"

    } else {
        filterArray({
            key: "categoryId",
            value: sel.value,
        })

    }
});

sel2.addEventListener("change", function () {
    filterArray({
        key: "vegeterian",
        value: sel2.value, 
    });
})

sel3.addEventListener("change", function () {
    filterArray({
        key: "nuts",
        value: sel3.value,
    });
})

sel4.addEventListener("change", function () {
    filterArray({
        key: "spiciness",
        value: sel4.value
    });
})



fetchCategories()
getAll()














































// function filterProducts() {
//     let url = 'https://restaurant.stepprojects.ge/api/Products/GetFiltered?';
//     let params = [];


//     if (vegeSel.value !== "-1") params.push(vegeterian=${vegeSel.value});
//     if (spiciness.value !== "-1") params.push(spiciness=${spiciness.value});
//     if (nuts.value !== "-1") params.push(nuts=${nuts.value});
//     if (filtered.value !== "-1") params.push(categoryId=${filtered.value});

//     if (params.length === 0) {
//         renderProduct(unFillArr);
//         return;
//     }

//     url += params.join('&');

//     fetch(url)
//         .then(response => response.json())
//         .then(response => renderProduct(response))
// }

// vegeSel.addEventListener('change', filterProducts);
// spiciness.addEventListener('change', filterProducts);
// nuts.addEventListener('change', filterProducts);
// filtered.addEventListener('change', filterProducts);