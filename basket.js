// let cont = document.querySelector('.cont')

// fetch('https://restaurant.stepprojects.ge/api/Baskets/GetAll')
// .then(resp => resp.json())
// .then(resp => renderBasket(resp))



// function renderBasket (arr) {
//   for(let el of arr){
//       cont.innerHTML += `
//       <div class="basket">
//                 <img src = "${el.product.image}" alt = "">
//                 <h3>: ${el.product.name}</h3>
//                 <h4>price : ${el.product.price}$</h4>
//                 <h4>quantity: ${el.quantity}</h4>
//       </div>
//       `
//       let deleteBtn = document.createElement('button')
//       deleteBtn.innerHTML = 'Delete'
//       deleteBtn.addEventListener('click' , function(e) {
//         e.preventDefault()
//         console.log(el.product.id)
//         fetch(`https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${el.product.id}`, {
//           method: 'DELETE'
//         })
//         .then(resp => resp.json())
//         .then(resp =>{
//           window.location.reload()
//         })
//         .catch(err => console.log('error' , err))
//         window.location.reload()
//       })
//       cont.appendChild(deleteBtn)
//     }
//   }


let cont = document.querySelector('.cont')

fetch('https://restaurant.stepprojects.ge/api/Baskets/GetAll')
  .then(resp => resp.json())
  .then(resp => renderBasket(resp))

function renderBasket(arr) {
  for (let el of arr) {

    let basketDiv = document.createElement('div')
    basketDiv.classList.add('basket')
    basketDiv.innerHTML = `
      <div class="basket">
        <img src = "${el.product.image}" alt = "">
        <h3> ${el.product.name}</h3>
        <h4>price : ${el.product.price}$</h4>
        <h4>quantity: ${el.quantity}</h4>
      </div>
      `


    let deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = 'Delete'
    deleteBtn.addEventListener('click', function (e) {
      e.preventDefault()
      console.log(el.product.id)

      fetch(`https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${el.product.id}`, {
        method: 'DELETE'
      })
        .then(resp => resp.json())
        .then(resp => {

          basketDiv.remove()
        })
        .catch(err => console.log('error', err))
    })


    basketDiv.appendChild(deleteBtn)
    cont.appendChild(basketDiv)
  }
}
