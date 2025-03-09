let cont = document.querySelector('.cont');

fetch('https://restaurant.stepprojects.ge/api/Baskets/GetAll')
  .then(resp => resp.json())
  .then(resp => renderBasket(resp));

function renderBasket(arr) {
  let totalPrice = 0;
  cont.innerHTML = '';

  for (let el of arr) {
    let basketDiv = document.createElement('div');
    basketDiv.classList.add('basket');
    basketDiv.innerHTML = `
      <div class="basket">
        <img src="${el.product.image}" alt="">
        <h3>${el.product.name}</h3>
        <h4>Price: ${el.product.price}$</h4>
        <h4>Quantity: ${el.quantity}</h4>
      </div>
    `;

    totalPrice += el.product.price * el.quantity;

    let deleteBtn = document.createElement('button');
    let plusBtn = document.createElement('button');
    plusBtn.innerText = ' + '
    deleteBtn.innerHTML = 'Delete';
    try {
      deleteBtn.addEventListener('click', () => deleteProduct(el, basketDiv));
    }
    catch (err) {
      console.log('error', err)
      deleteProduct(el, basketDiv)
    }

    basketDiv.appendChild(deleteBtn);
    cont.appendChild(basketDiv);



    plusBtn.addEventListener('click', function (e) {
      e.preventDefault();
      let updatedQuantity = parseInt(el.quantity) + 1; //parseInt არის განამბერება უბრალოდ
      fetch(`https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          `{
          "quantity": 10,
          "price": 0,
          "productId": 2
        }`
        )
      })
    })
    cont 



    

  }

  const totalDiv = document.createElement('div');
  totalDiv.classList.add('total-price');
  totalDiv.innerHTML = `<h4>Total Price: ${totalPrice}$</h4>`;
  totalDiv.style.color = 'white';
  cont.appendChild(totalDiv);

  function updateTotalPrice() {
    totalDiv.innerHTML = `<h4>Total Price: ${totalPrice}$</h4>`;
  }

  function deleteProduct(el, basketDiv) {
    if (confirm(`დარწმუნებული ხარ რომ გინდა წაშალო ${el.product.name}?`)) {
      fetch(`https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${el.product.id}`, {
        method: 'DELETE'
      })
        //  .then(resp => resp.json())
        .then(() => {
          basketDiv.remove();
          totalPrice -= el.product.price * el.quantity;
          updateTotalPrice();
        })
        .catch(err => console.log('error', err));
    }

    

 
  }
}



























































































// let cont = document.querySelector('.cont');

// fetch('https://restaurant.stepprojects.ge/api/Baskets/GetAll')
//   .then(resp => resp.json())
//   .then(resp => renderBasket(resp));

// function renderBasket(arr) {
//   let totalPrice = 0;
//   cont.innerHTML = '';

//   for (let el of arr) {
//     let basketDiv = document.createElement('div');
//     basketDiv.classList.add('basket');
//     basketDiv.innerHTML = `
//       <div class="basket">
//         <img src="${el.product.image}" alt="">
//         <h3>${el.product.name}</h3>
//         <h4 class="price">Price: ${el.product.price}$</h4>
//       </div>
//     `;

//     totalPrice += el.product.price * el.quantity;

//     // რაოდენობის კონტროლი
//     let quantityDiv = document.createElement('div');
//     quantityDiv.classList.add('quantity-control');
//     quantityDiv.innerHTML = `
//       <button class="decrease">-</button>
//       <input type="number" value="${el.quantity}" min="1" readonly>
//       <button class="increase">+</button>
//     `;

//     let quantityInput = quantityDiv.querySelector('input');
//     let increaseBtn = quantityDiv.querySelector('.increase');
//     let decreaseBtn = quantityDiv.querySelector('.decrease');

//     increaseBtn.addEventListener('click', () => changeQuantity(el, quantityInput, 1));
//     decreaseBtn.addEventListener('click', () => changeQuantity(el, quantityInput, -1));

//     let deleteBtn = document.createElement('button');
//     deleteBtn.innerHTML = 'Delete';
//     deleteBtn.addEventListener('click', () => deleteProduct(el, basketDiv));

//     basketDiv.appendChild(quantityDiv);
//     basketDiv.appendChild(deleteBtn);
//     cont.appendChild(basketDiv);
//   }

//   const totalDiv = document.createElement('div');
//   totalDiv.classList.add('total-price');
//   totalDiv.innerHTML = `<h4>Total Price: ${totalPrice}$</h4>`;
//   totalDiv.style.color = 'white';
//   cont.appendChild(totalDiv);

//   function updateTotalPrice() {
//     let newTotal = 0;

//     // დინამიური განახლება
//     document.querySelectorAll('.basket').forEach(item => {
//       let price = parseFloat(item.querySelector('.price').innerText.replace('Price: ', '').replace('$', ''));
//       let quantityInput = item.querySelector('input');  // quantityInput აიღეთ აქ

//       if (quantityInput) {  // დარწმუნდით, რომ quantityInput არსებობს
//         let quantity = parseInt(quantityInput.value);
//         newTotal += price * quantity;
//       }
//     });

//     totalDiv.innerHTML = `<h4>Total Price: ${newTotal}$</h4>`;
//   }

//   function deleteProduct(el, basketDiv) {
//     if (confirm(`დარწმუნებული ხარ რომ გინდა წაშალო ${el.product.name}?`)) {
//       fetch(`https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${el.product.id}`, {
//         method: 'DELETE'
//       })
//       .then(() => {
//         basketDiv.remove();
//         updateTotalPrice();  // როდესაც პროდუქტი იხსნება, ფასიც განახლდება
//       })
//       .catch(error => console.log('Error deleting product:', error));
//     }
//   }

//   function updateBasket(el, quantity) {
//     if (el.product && el.product.id) {
//       fetch(`https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket/${el.product.id}/${quantity}`, {
//         method: 'PUT'
//       })
//       .then(response => {
//         if (response.ok) {
//           return response.json();  // თუ მოთხოვნა წარმატებულია
//         } else {
//           throw new Error('Failed to update basket');
//         }
//       })
//       .then(() => updateTotalPrice())  // შემდეგ განახლდება total price
//       .catch(error => console.log('Error updating basket:', error));
//     } else {
//       console.log('Invalid product data:', el);
//     }
//   }

//   function changeQuantity(el, quantityInput, change) {
//     let newQuantity = Math.max(1, parseInt(quantityInput.value) + change);
//     quantityInput.value = newQuantity;
//     updateBasket(el, newQuantity);  // შესაბამისი რაოდენობის განახლება
//     updateTotalPrice();  // price update
//   }
// }
