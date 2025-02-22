//  let cont =document.querySelector('.cont')
//  let sel = document.querySelector('.sel')

// fetch('https://restaurant.stepprojects.ge/api/Products/GetAll')

// .then(resp => resp.json())

// .then(resp => renderProduct(resp))


// function renderProduct(arr) {
//       for(let el of arr) {
//             cont.innerHTML += 
//             `            
//             <div class="box">
//                          <div class="img-cont" style = "background-image: url(${el.image});" >  </div>

//                         <h2>${el.name}</h2>
//                         <h3>price : ${el.price} </h3>
//                         <h4> nuts : ${el.nuts} </h4>
//                        <h3> spiciness ${el.spiciness}
//                        <h4> vegetarian : ${el.vegeterian} </h4>
//                         <a href="details.html?id=${el.id}"> See more </a>
//             </div>

//             `
//       }
// }



// fetch(`https://restaurant.stepprojects.ge/api/Categories/GetCategory/${sel.value}`)

// .then(resp => resp.json()) 

// .then(resp => optionOfFill(resp))

// function optionOfFill (arr) {
//       for(let el of arr) {
//             sel.innerHTML += `


//       <option value="${el.id}"> ${el.name.toUpperCase()} </option>

//             `
//       }
// }


// sel.addEventListener( "change" , function(){

//       if(sel.value == "All"){
//             fetch('https://restaurant.stepprojects.ge/api/Products/GetAll')
//             .then(res=>res.json())
//             .then(json=> renderProduct(json))
//       }
//       else{
//             fetch (`https://restaurant.stepprojects.ge/api/Categories/GetCategory/${sel.value}`)
//             .then(resp => resp.json())
//             .then(resp => renderProduct(resp))
//       }
// })












let cont = document.querySelector('.cont');
let sel = document.querySelector('.sel');
let sel2 = document.querySelector('.sel2');
let sel3 = document.querySelector('.sel3');
let sel4 = document.querySelector('.sel4');
let sel5 = document.querySelector('.sel5');


fetch('https://restaurant.stepprojects.ge/api/Categories/GetAll')
    .then(resp => resp.json())
    .then(categories => fillOptions(categories))


fetch(`https://restaurant.stepprojects.ge/api/Products/GetFiltered?category=${sel2.value}`)
    .then(resp => resp.json())
    .then(text => console.log(text))






function fillOptions(categories) {
    sel.innerHTML = '<option value="All">All</option>';
    for (let category of categories) {
        sel.innerHTML += `
            <option value="${category.id}">${category.name.toUpperCase()}</option>
        `;
    }
}


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
                <a href="details.html?id=${product.id}">See more</a>
            </div>
        `;
    }
}




fetch('https://restaurant.stepprojects.ge/api/Products/GetAll')
    .then(res => res.json())
    .then(json => renderProducts(json))









    fetch('https://fakestoreapi.com/products/categories')
    .then(resp => resp.json())
    .then(resp => FillOptions(resp))
    
    function FillOptions ( arr ) {
    for (let el of arr) {
          sel.innerHTML += `  
          <option value="${el}">${el.toUpperCase()}</option>
          
          `
    }
    }











// let cont = document.querySelector('.cont');
// let sel = document.querySelector('.sel');
// let sel2 = document.querySelector('.sel2');
// let vegetarianCheckbox = document.querySelector('.vegetarian'); 
// let nutsCheckbox = document.querySelector('.nuts'); 
// let spicinessSelect = document.querySelector('.spiciness'); 


// fetch('https://restaurant.stepprojects.ge/api/Categories/GetAll')
//     .then(resp => resp.json())
//     .then(categories => fillOptions(categories))
//     .catch(error => console.error('Error fetching categories:', error));


// function fetchProducts() {
//     const categoryId = sel2.value; 
//     const vegetarian = vegetarianCheckbox.checked; 
//     const nuts = nutsCheckbox.checked; 
//     const spiciness = parseInt(spicinessSelect.value); 


//     let url = `https://restaurant.stepprojects.ge/api/Products/GetFiltered?categoryId=${categoryId}`;
//     if (vegetarian) url += `&vegetarian=true`;
//     if (nuts) url += `&nuts=true`;
//     if (!isNaN(spiciness) && spiciness !== "") url += `&spiciness=${spiciness}`;

//     console.log("Fetching products from URL:", url); 

//     fetch(url)
//         .then(resp => resp.json())
//         .then(products => renderProducts(products))
//         .catch(error => console.error('Error fetching products:', error));
// }

// function fillOptions(categories) {
//     sel.innerHTML = '<option value="All">All</option>';
//     categories.forEach(category => {
//         sel.innerHTML += `
//             <option value="${category.id}">${category.name.toUpperCase()}</option>
//         `;
//     });
// }


// sel.addEventListener("change", function () {
//     if (sel.value === "All") {
//         fetch('https://restaurant.stepprojects.ge/api/Products/GetAll')
//             .then(res => res.json())
//             .then(json => renderProducts(json))
//             .catch(error => console.error('Error fetching all products:', error));
//     } else {
//         fetch(`https://restaurant.stepprojects.ge/api/Categories/GetCategory/${sel.value}`)
//             .then(resp => resp.json())
//             .then(category => {
                
//                 sel2.innerHTML = ''; 
//                 category.products.forEach(product => {
//                     sel2.innerHTML += `<option value="${product.id}">${product.name}</option>`;
//                 });
//                 renderProducts(category.products); 
//             })
//             .catch(error => console.error('Error fetching category:', error));
//     }
// });


// vegetarianCheckbox.addEventListener("change", fetchProducts);
// nutsCheckbox.addEventListener("change", fetchProducts);
// spicinessSelect.addEventListener("change", fetchProducts);


// function renderProducts(products) {
//     cont.innerHTML = '';
//     if (products.length === 0) {
//         cont.innerHTML = '<p>No products found matching your criteria.</p>';
//     } else {
//         products.forEach(product => {
//             cont.innerHTML += `
//                 <div class="box">
//                     <div class="img-cont" style="background-image: url(${product.image});"></div>
//                     <h2>${product.name}</h2>
//                     <h3>Price: ${product.price}</h3>
//                     <h4>Nuts: ${product.nuts ? 'Yes' : 'No'}</h4>
//                     <h3>Spiciness: ${product.spiciness}</h3>
//                     <h4>Vegetarian: ${product.vegetarian ? 'Yes' : 'No'}</h4>
//                     <a href="details.html?id=${product.id}">See more</a>
//                 </div>
//             `;
//         });
//     }
// }

// fetch('https://restaurant.stepprojects.ge/api/Products/GetAll')
//     .then(res => res.json())
//     .then(json => renderProducts(json))
//     .catch(error => console.error('Error fetching all products initially:', error));