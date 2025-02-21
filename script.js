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


sel.addEventListener("change", function() {
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








      
          