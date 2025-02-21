// let cont = document.querySelector('.cont')

// let id = window.location.search.split('=')[1]

// fetch(`https://restaurant.stepprojects.ge/api/Products/GetProductById/${id}`)

// .then (res => res.json())

// .then ( json => renderProduct(json) )

// function renderProduct(productObj) {

//             cont.innerHTML = ' '
//             cont.innerHTML = 
//             `            
//             <div class="box">
//                          <div class="img-cont" style = "background-image: url(${productObj.image});" >  </div>

//                         <h2>${productObjl.name}</h2>
//                         <h3>price : ${productObj.price} </h3>
//                         <h4> nuts : ${productObj.nuts} </h4>
//                        <h3> spiciness ${productObj.spiciness}
//                        <h4> vegetarian : ${productObj.vegeterian} </h4>
//                         <a href="details.html?id=${productObj.id}"> See more </a>
//             </div>

//             `

// }



let cont = document.querySelector('.cont');

let productId = window.location.search.split('=')[1];



fetch('https://restaurant.stepprojects.ge/api/Products/GetAll')  
.then(res => res.json())
.then(json => {let product = json.find(item => item.id == productId);  renderProduct(product);})






function renderProduct(productObj) {
      cont.innerHTML = '';
            cont.innerHTML = `
            <div class="box">
                <div class="img-cont" style="background-image: url(${productObj.image});"></div>
                <h2>${productObj.name}</h2>
                <h3>Price: ${productObj.price}</h3>
                <h4>Nuts: ${productObj.nuts}</h4>
                <h3>Spiciness: ${productObj.spiciness}</h3>
                <h4>Vegetarian: ${productObj.vegeterian}</h4>
                <a href="index.html?id=${productObj.id}">Go back</a>
            </div>
        `;
      
}




