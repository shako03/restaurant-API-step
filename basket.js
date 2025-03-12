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
        <h4 class="quantity">Quantity: ${el.quantity}</h4>
      </div>
    `;

    totalPrice += el.product.price * el.quantity;





    let deleteBtn = document.createElement('button');
    let plusBtn = document.createElement('button');
    plusBtn.innerText = ' + ';
    deleteBtn.innerText = 'Delete';
    let minusBtn = document.createElement('button');
    minusBtn.innerText = ' - ';




    deleteBtn.addEventListener('click', () => deleteProduct(el, basketDiv));



    plusBtn.addEventListener('click', function (e) {
      e.preventDefault();


      let updatedQuantity = el.quantity + 1; 

      let requestBody = {
        quantity: updatedQuantity, 
        price: el.product.price,   
        productId: el.product.id    
      };

      fetch(`https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })
        .then(() => {
          el.quantity = updatedQuantity;  
          basketDiv.querySelector('.quantity').innerHTML = `Quantity: ${el.quantity}`;  
          updateTotalPrice(); 
        })
    });








    minusBtn.addEventListener('click', function (e) {
      e.preventDefault();
      
      let updatedQuantity = el.quantity > 0 ? el.quantity - 1 : 0; 

      let requestBody = {
        quantity: updatedQuantity,  
        price: el.product.price,    
        productId: el.product.id    
      };

      fetch(`https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })
      .then(() => {
        el.quantity = updatedQuantity;  
        basketDiv.querySelector('.quantity').innerHTML = `Quantity: ${el.quantity}`;  
        updateTotalPrice();  
      })

    });



    
basketDiv.appendChild(minusBtn);
    basketDiv.appendChild(deleteBtn);
    basketDiv.appendChild(plusBtn);
    cont.appendChild(basketDiv);
  }

  const totalDiv = document.createElement('div');
  totalDiv.classList.add('total-price');
  totalDiv.innerHTML = `<h4>Total Price: ${totalPrice}$</h4>`;
  totalDiv.style.color = 'white';
  cont.appendChild(totalDiv);

  function updateTotalPrice() {
    totalPrice = arr.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    totalDiv.innerHTML = `<h4>Total Price: ${totalPrice}$</h4>`;
  }

  function deleteProduct(el, basketDiv) {
    if (confirm(`დარწმუნებული ხარ რომ გინდა წაშალო ${el.product.name}?`)) {
      fetch(`https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${el.product.id}`, {
        method: 'DELETE'
      })
        .then(() => {
          basketDiv.remove();
          updateTotalPrice();
        })
        .catch(err => console.log('Error:', err));
    }
  }
}
