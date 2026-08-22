// ======================================
// SHOPSMART E-COMMERCE DSA PROJECT
// ======================================


// ======================================
// PRODUCT DATA
// ======================================

const products = {

    "Smart Laptop": 55000,

    "Smartphone": 25000,

    "Wireless Headphones": 2999,

    "Smart Watch": 4999,

    "Gaming Mouse": 1499,

    "Bluetooth Speaker": 2999

};


// ======================================
// SHOPPING CART
// Linked List Concept
// ======================================

let cart = [];


// ======================================
// ADD TO CART
// ======================================

function addToCart(productName) {

    let existingProduct =
        cart.find(
            item =>
                item.name === productName
        );


    if (existingProduct) {

        existingProduct.quantity++;

    }

    else {

        cart.push({

            name: productName,

            price: products[productName],

            quantity: 1

        });

    }


    updateCart();

    alert(
        "✅ " +
        productName +
        " added to cart!"
    );
}


// ======================================
// UPDATE CART
// ======================================

function updateCart() {

    const cartItems =
        document.getElementById(
            "cartItems"
        );


    const cartCount =
        document.getElementById(
            "cartCount"
        );


    const cartTotal =
        document.getElementById(
            "cartTotal"
        );


    cartItems.innerHTML = "";


    // Empty cart

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;


        cartCount.textContent = "0";

        cartTotal.textContent = "₹0";

        return;
    }


    let total = 0;

    let totalQuantity = 0;


    // Traverse cart

    cart.forEach(
        function(item, index) {

            let subtotal =
                item.price *
                item.quantity;


            total += subtotal;

            totalQuantity +=
                item.quantity;


            let cartItem =
                document.createElement(
                    "div"
                );


            cartItem.className =
                "cart-item";


            cartItem.innerHTML = `

                <h3>
                    ${item.name}
                </h3>

                <p>
                    Price:
                    ₹${item.price.toLocaleString()}
                </p>

                <p>
                    Quantity:
                    ${item.quantity}
                </p>

                <p>
                    Subtotal:
                    ₹${subtotal.toLocaleString()}
                </p>

                <button
                    class="remove-btn"
                    onclick="removeFromCart(${index})"
                >
                    ❌ Remove
                </button>

            `;


            cartItems.appendChild(
                cartItem
            );

        }
    );


    cartCount.textContent =
        totalQuantity;


    cartTotal.textContent =
        "₹" +
        total.toLocaleString();
}


// ======================================
// REMOVE FROM CART
// ======================================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


// ======================================
// CLEAR CART
// ======================================

function clearCart() {

    if (cart.length === 0) {

        return;
    }


    cart = [];

    updateCart();
}


// ======================================
// OPEN CART
// ======================================

function openCart() {

    document
        .getElementById(
            "cartPanel"
        )
        .classList
        .add("active");
}


// ======================================
// CLOSE CART
// ======================================

function closeCart() {

    document
        .getElementById(
            "cartPanel"
        )
        .classList
        .remove("active");
}


// ======================================
// PRODUCT SEARCH
// ======================================

function searchProducts() {

    let searchText =
        document
        .getElementById(
            "searchInput"
        )
        .value
        .toLowerCase()
        .trim();


    let productCards =
        document.querySelectorAll(
            ".product-card"
        );


    productCards.forEach(
        function(product) {

            let productName =
                product
                .getAttribute(
                    "data-name"
                )
                .toLowerCase();


            if (
                productName.includes(
                    searchText
                )
            ) {

                product.style.display =
                    "block";

            }

            else {

                product.style.display =
                    "none";

            }

        }
    );
}


// ======================================
// PRODUCT SORTING
// ======================================

function sortProducts() {

    let container =
        document.getElementById(
            "productContainer"
        );


    let productCards =
        Array.from(
            container.querySelectorAll(
                ".product-card"
            )
        );


    let sortOption =
        document.getElementById(
            "sortSelect"
        ).value;


    // LOW TO HIGH

    if (
        sortOption === "low"
    ) {

        productCards.sort(
            function(a, b) {

                return (
                    Number(
                        a.dataset.price
                    )
                    -
                    Number(
                        b.dataset.price
                    )
                );

            }
        );

    }


    // HIGH TO LOW

    if (
        sortOption === "high"
    ) {

        productCards.sort(
            function(a, b) {

                return (
                    Number(
                        b.dataset.price
                    )
                    -
                    Number(
                        a.dataset.price
                    )
                );

            }
        );

    }


    // Display sorted products

    productCards.forEach(
        function(product) {

            container.appendChild(
                product
            );

        }
    );

}