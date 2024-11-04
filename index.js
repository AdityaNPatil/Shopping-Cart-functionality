// array of products
const products = [
    { name: "Adidas Shoes", price: 2500, id: 1, quantity: 1, },
    { name: "Sting Energy Drink", price: 120, id: 2, quantity: 1, },
    { name: "Umbrella", price: 500, id: 3, quantity: 1, },
    { name: "Cat Food", price: 900, id: 4, quantity: 1, },
    { name: "T Shirt", price: 300, id: 5, quantity: 1, },
    { name: "Book", price: 100, id: 6, quantity: 1, },
];

// give each product as separate product card and store all such cards in productHTML array
const productsHTML = products.map((product) => {
    return `
        <div class="product-card">
            <h2 class="product-name">${product.name}</h2>
            <strong>$${product.price}</strong>
            <button class="product-btn" id=${product.id}>Add to Cart</button>
        </div>`
})
const result = document.querySelector(".result");
result.innerHTML = productsHTML.join("");        // join all elements of productsHTML array

// create array to store products in cart
let cart = [];

// function to update cart -- whenever product add to cart clicked 
// map and render cart items and call it to render the current items
function updateCart() {
    // map all products in cart array and store them as new array as individual cart items with separate html
    const cartHTML = cart.map((item) => {
        return `
            <h3>${item.name}</h3>
            <div class="cart-detail">
                <div class="mid">          
                    <button onclick={decrItem(${item.id})}>-</button>
                    <p>${item.quantity}</p>
                    <button onclick={incrItem(${item.id})}>+</button>
                    <p>$${item.price}</p>
                    <button onclick={deleteItem(${item.id})} class="cart-product" id=${item.id}>D</button>
                </div>
            </div>
        `
    })
    const cartItems = document.querySelector(".cart-items");
    cartItems.innerHTML = cartHTML.join("");
}

// function to add product to cart -- arguments are (products array , product id)
function addToCart(products, id) {
    // find product details for matching  product id that exists in the array of products at top of page
    const product = products.find((prod) => prod.id === id);
    // find product details in cart (if it already exists)
    const cartProduct = cart.find((product) => product.id === id);

    // if product already in cart increase quantity else add to cart array
    if (cartProduct != undefined && product.id == cartProduct.id) {
        incrItem(id);
    } else {
        cart.unshift(product);
    }

    // update cart and get total items and price
    updateCart();
    getTotalItemsAndPrice(cart);
}

// add event listener to all product buttons to add to cart
let totalProducts = document.querySelectorAll(".product-card").length;
for (let i = 0; i < totalProducts; i++) {
    document.querySelectorAll(".product-btn")[i].addEventListener("click", function (e) {
        addToCart(products, parseInt(e.target.id));
    })
}

// function to calculate total items and total cart value -- arguments = cart array
function getTotalItemsAndPrice(cart) {
    // ◘ using the reduce function on cart array of objects [{totalItem , cartTotalPrice}] -- we destructure it here
    // .reduce(func(totalAccumulator , currentValue , currIndex , array) , initialValue)
    let { totalItem, cartTotalPrice } = cart.reduce(
        (total, cartItem) => {
            total.cartTotalPrice += cartItem.price * cartItem.quantity;
            total.totalItem += cartItem.quantity;
            return total;
        },
        { totalItem: 0, cartTotalPrice: 0 }
    );

    // render the totals
    const totalItemsHTML = document.querySelector(".noOfItems");
    totalItemsHTML.innerHTML = `${totalItem} items`;
    const totalAmountHTML = document.querySelector(".total");
    totalAmountHTML.innerHTML = `$ ${cartTotalPrice}`;
}

// Increasing and Decreasing Item Quantity in Cart
function incrItem(id) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i] && cart[i].id == id) {
            cart[i].quantity += 1;
        }
    }
    updateCart();
    getTotalItemsAndPrice(cart);
}

function decrItem(id) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i] && cart[i].id == id) {
            cart[i].quantity -= 1;
        }
    }
    updateCart();
    getTotalItemsAndPrice(cart);
}

// Delete item in cart
function deleteItem(id) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            cart[i].quantity = 1;
            cart.splice(i, 1);
        }
    }
    updateCart();
    getTotalItemsAndPrice(cart);
}