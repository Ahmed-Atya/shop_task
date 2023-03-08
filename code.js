const products = [{
        id: 0,
        product_name: "Gold Coin",
        product_price: 1125,
        instock: 40,
        product_image: "https://cdn.pixabay.com/photo/2018/01/17/12/48/currency-3088147_960_720.jpg",
        added_to_cart: false
    },
    {
        id: 1,
        product_name: "Diamond Necklace",
        product_price: 3500.00,
        instock: 90,
        product_image: "https://cdn.pixabay.com/photo/2017/10/19/10/58/heart-2867197_960_720.jpg",
        added_to_cart: false
    },
    {
        id: 2,
        product_name: "Silver Watch",
        product_price: 225.99,
        instock: 49,
        product_image: "https://cdn.pixabay.com/photo/2017/03/19/18/50/mens-2157350_960_720.jpg",
        added_to_cart: false
    },
    {
        id: 3,
        product_name: "Platinum Ring",
        product_price: 895.00,
        instock: 19,
        product_image: "https://cdn.pixabay.com/photo/2017/03/29/23/36/diamond-2186840_960_720.jpg",
        added_to_cart: false
    },
    {
        id: 4,
        product_name: "Emerald Earrings",
        product_price: 1750.00,
        instock: 440,
        product_image: "https://cdn.pixabay.com/photo/2020/02/04/08/29/earrings-4817566_960_720.jpg",
        added_to_cart: false
    },
    {
        id: 5,
        product_name: "Sphire Bracelet",
        product_price: 1425.0,
        instock: 140,
        product_image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        added_to_cart: false
    }
];

// Toggle Hamburger Menu
const hamburger = document.querySelector(".hamburger");
const navbarResponsive = document.querySelector(".navbar-responsive");
hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navbarResponsive.classList.toggle("active");
});
// showinng shopping cart taggle button
const shoppingCart = document.querySelector(".shopping_cart");
const cartLinks = document.querySelectorAll('.cart');
 cartLinks.forEach((cartLink)=>{
    cartLink.addEventListener("click", function () {
        shoppingCart.classList.toggle("active");
 })

});


const productsContainer = document.querySelector('.products .container');
const cartItems = document.querySelector(".cart-items");
const subtotal = document.querySelector(".subtotal");
const totalItemsInCart = document.querySelector(".items_count");


function generateProducts() {
    products.forEach((product) => {
        productsContainer.innerHTML += `
        <div class="product">
        <h3 class="name">${product.product_name}</h3>
        <p class="price">${product.product_price}</p>
        <img src="${product.product_image}" alt="product-image" class="product_image"/>
        <div class="actions">
            <button class="add_to_cart"  onclick="addToCart(${product.id})">Add to Cart</button>
            <button class="quick_view">Quick View</button>
        </div>
        </div>
        `;

    })
}
generateProducts();
let pageProducts = document.querySelectorAll('.container .product');
let addToCartBtns = document.querySelectorAll('.add_to_cart');
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

function addToCart(id) {
    // check if prodcut already exist in cart
    if (cart.some((item) => item.id === id)) {
        changeNumberOfUnits("plus", id);
    } else {
        const item = products.find((product) => product.id === id);

        cart.push({
            ...item,
            numberOfUnits: 1,
        });
    }
    products[id].added_to_cart = true;
    addToCartBtns[id].textContent = products[id].added_to_cart ? "remove from cart" : "add to cart";
    addToCartBtns[id].style.backgroundColor = products[id].added_to_cart ? "#f00" : "#1b06d8";
    updateCart();
}

function updateCart() {
    renderCartItems();
    CalculateSubtotal();
    localStorage.setItem("CART", JSON.stringify(cart));
}

function CalculateSubtotal() {
    let totalPrice = 0,
        totalItems = 0;

    cart.forEach((item) => {
        totalPrice += item.product_price * item.numberOfUnits;
        totalItems += item.numberOfUnits;
    });

    subtotal.innerHTML = `Subtotal (${totalItems} items): $${totalPrice.toFixed(2)}`;
    totalItemsInCart.innerHTML = totalItems;
}

function renderCartItems() {
    cartItems.innerHTML = "";

    cart.forEach((item) => {
        cartItems.innerHTML += `
          <div class="cart-item">
              <button class="remove_from_cart"  onclick="removeItemFromCart(${item.id})">remove item</button>
              <div class="item-info">
                  <img src="${item.product_image}" alt="${item.product_name}">
                  <h4>${item.product_name}</h4> 
              </div>
            
              <div class="unit-price">
                  <small>$</small>${item.product_price}
              </div>
              <div class="units">
                  <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                  <div class="number">${item.numberOfUnits}</div>
                  <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>           
              </div>
          </div>
        `;
    });
}
// remove item from cart
function removeItemFromCart(id) {
    cart = cart.filter((item) => item.id !== id);
    products[id].added_to_cart = false;
    addToCartBtns[id].textContent = products[id].added_to_cart ? "remove from cart" : "add to cart";
    addToCartBtns[id].style.backgroundColor = products[id].added_to_cart ? "#f00" : "#1b06d8";
    updateCart();
}

function changeNumberOfUnits(action, id) {
    cart = cart.map((item) => {
        let numberOfUnits = item.numberOfUnits;

        if (item.id === id) {
            if (action === "minus" && numberOfUnits > 1) {
                numberOfUnits--;
            } else if (action === "plus" && numberOfUnits < item.instock) {
                numberOfUnits++;
            }
        }

        return {
            ...item,
            numberOfUnits,
        };
    });

    updateCart();
}

function showModel() {
    let quickViewbuttons = document.querySelectorAll('.quick_view');
    let modal = document.querySelector('.modal');
    quickViewbuttons.forEach((button, index) => {
        button.addEventListener('click', function () {
            modal.querySelector('.content').innerHTML = `
          <span class="close">&times;</span>
          <h3 class="name">${products[index].product_name}</h3>
          <p class="price">${products[index].product_price}</p>
          <img src="${products[index].product_image}" alt="">
          <div class="actions">
              <button class="add_to_cart">Add to Cart</button>
          </div>
          `;
            modal.style.display = "flex";

            const closeButton = document.querySelector('.close');

            closeButton.addEventListener('click', () => {
                modal.style.display = 'none';
            })

            document.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            })
        });

    });

}
showModel();