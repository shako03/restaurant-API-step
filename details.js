import { footer } from './data.js';



let cont = document.querySelector('.cont');

let productId = window.location.search.split('=')[1];
let foot = document.querySelector('.footer')


fetch('https://restaurant.stepprojects.ge/api/Products/GetAll')
    .then(res => res.json())
    .then(json => { let product = json.find(item => item.id == productId); renderProduct(product); })






function renderProduct(product) {
    cont.innerHTML = ''
    cont.innerHTML = `
            <div class="box">
                <div class="img-cont" style="background-image: url(${product.image});"></div>
                <h2>${product.name}</h2>
                <h3>Price: ${product.price}</h3>
                <h4>Nuts: ${product.nuts}</h4>
                <h3>Spiciness: ${product.spiciness}</h3>
                <h4>Vegetarian: ${product.vegeterian}</h4>

                <div class="btn-parent">
                    <a href="index.html">go back</a>
                    <button class="order-now" data-product-id="${product.id}" data-price="${product.price}">Order Now</button>
                </div>
            </div>
        `;

    const btns = document.querySelectorAll('.order-now');

    btns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();


            const productId = btn.getAttribute('data-product-id');
            const price = btn.getAttribute('data-price');

            let btnData = {
                quantity: 1,
                price: price,
                productId: productId
            };

            fetch('https://restaurant.stepprojects.ge/api/Baskets/AddToBasket', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(btnData)
            })
                .then(resp => resp.json())
                .then(resp => {
                    console.log('Product added to basket:', resp);
                })
        });
    });





}




foot.innerHTML += footer