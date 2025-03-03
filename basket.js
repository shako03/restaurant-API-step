let cont = document.querySelector('.cont')

fetch('https://restaurant.stepprojects.ge/api/Baskets/GetAll')
.then(resp => resp.json())
.then(resp => renderBasket(resp))



function renderBasket (arr) {

  for(let el of arr){
      cont.innerHTML += `
      <div class="basket">
                <img src = "${el.product.image}" alt = "">
                <h2>${el.product.id}</h2>
                <h3>: ${el.product.name}</h3>
                <h4>: ${el.product.price}</h4>
                <h4>quantity: ${el.quantity}</h4>
      </div>

      `
  }

}