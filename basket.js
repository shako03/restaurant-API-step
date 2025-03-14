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


<<<<<<< HEAD
      let updatedQuantity = el.quantity + 1;

      let requestBody = {
        quantity: updatedQuantity,
        price: el.product.price,
        productId: el.product.id
=======
      let updatedQuantity = el.quantity + 1; 

      let requestBody = {
        quantity: updatedQuantity, 
        price: el.product.price,   
        productId: el.product.id    
>>>>>>> 34fff188f45e9df29c7919d50756440877732f9c
      };

      fetch(`https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })
        .then(() => {
<<<<<<< HEAD
          el.quantity = updatedQuantity;
          basketDiv.querySelector('.quantity').innerHTML = `Quantity: ${el.quantity}`;
          updateTotalPrice();
        })
    });
=======
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
>>>>>>> 34fff188f45e9df29c7919d50756440877732f9c








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



    const styleBtn = (btn) => {
      btn.style.backgroundColor = '#4CAF50';
      btn.style.color = 'white';
      btn.style.padding = '5px 10px'; 
      btn.style.border = 'none';
      btn.style.fontSize = '14px'; 
      btn.style.cursor = 'pointer';
      btn.style.borderRadius = '5px';
      btn.style.margin = '5px';
    };
    
<<<<<<< HEAD
    styleBtn(minusBtn);
    styleBtn(deleteBtn);
    styleBtn(plusBtn);



    basketDiv.appendChild(minusBtn);
=======
basketDiv.appendChild(minusBtn);
>>>>>>> 34fff188f45e9df29c7919d50756440877732f9c
    basketDiv.appendChild(deleteBtn);
    basketDiv.appendChild(plusBtn);
    cont.appendChild(basketDiv);
  }

  const totalDiv = document.createElement('div');
  totalDiv.classList.add('total-price');
  totalDiv.innerHTML = `<h4>Total Price: ${totalPrice}$</h4>`;
  totalDiv.style.color = 'black';
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

          arr = arr.filter(item => item.product.id !== el.product.id);
          basketDiv.remove();
          updateTotalPrice();
        })
        .catch(err => console.log('Error:', err));
    }
  }
}
