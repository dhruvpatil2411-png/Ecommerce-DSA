// ============================================
// SHOPSMART E-COMMERCE DSA MINI PROJECT
// ============================================


// ============================================
// PRODUCT DATA
// ============================================

const products = {

    "Smart Laptop": {
        price: 55000,
        icon: "💻"
    },

    "Smartphone": {
        price: 25000,
        icon: "📱"
    },

    "Wireless Headphones": {
        price: 2999,
        icon: "🎧"
    },

    "Smart Watch": {
        price: 4999,
        icon: "⌚"
    },

    "Gaming Mouse": {
        price: 1499,
        icon: "🖱️"
    },

    "Bluetooth Speaker": {
        price: 2999,
        icon: "🔊"
    },

    "Gaming Keyboard": {
        price: 2499,
        icon: "⌨️"
    },

    "Power Bank": {
        price: 1299,
        icon: "🔋"
    }

};


// ============================================
// CART
// ============================================

let cart =
    JSON.parse(
        localStorage.getItem("shopSmartCart")
    ) || [];


// ============================================
// WISHLIST
// ============================================

let wishlist =
    JSON.parse(
        localStorage.getItem("shopSmartWishlist")
    ) || [];


// ============================================
// RECOMMENDATION DATA
// ============================================

const recommendations = {

    "Smart Laptop": [
        "Gaming Mouse",
        "Gaming Keyboard",
        "Wireless Headphones"
    ],

    "Smartphone": [
        "Wireless Headphones",
        "Smart Watch",
        "Power Bank"
    ],

    "Wireless Headphones": [
        "Smartphone",
        "Bluetooth Speaker",
        "Smart Watch"
    ],

    "Smart Watch": [
        "Smartphone",
        "Wireless Headphones",
        "Power Bank"
    ],

    "Gaming Mouse": [
        "Smart Laptop",
        "Gaming Keyboard",
        "Wireless Headphones"
    ],

    "Bluetooth Speaker": [
        "Wireless Headphones",
        "Smartphone",
        "Smart Watch"
    ],

    "Gaming Keyboard": [
        "Gaming Mouse",
        "Smart Laptop",
        "Wireless Headphones"
    ],

    "Power Bank": [
        "Smartphone",
        "Smart Watch",
        "Wireless Headphones"
    ]

};


// ============================================
// SAVE DATA
// ============================================

function saveData() {

    localStorage.setItem(
        "shopSmartCart",
        JSON.stringify(cart)
    );

    localStorage.setItem(
        "shopSmartWishlist",
        JSON.stringify(wishlist)
    );

}


// ============================================
// TOAST MESSAGE
// ============================================

function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(function() {

        toast.classList.remove("show");

    }, 2000);

}


// ============================================
// ADD TO CART
// ============================================

function addToCart(productName) {

    const existing =
        cart.find(
            item =>
                item.name === productName
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            name: productName,

            price:
                products[productName].price,

            quantity: 1

        });

    }


    saveData();

    updateCart();

    showRecommendations(productName);

    showToast(
        "✅ " +
        productName +
        " added to cart"
    );

}


// ============================================
// UPDATE CART
// ============================================

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

            const subtotal =
                item.price *
                item.quantity;


            total += subtotal;

            totalQuantity +=
                item.quantity;


            const itemElement =
                document.createElement(
                    "div"
                );

            itemElement.className =
                "cart-item";


            itemElement.innerHTML = `

                <h3>
                    ${item.name}
                </h3>

                <p>
                    Price:
                    ₹${item.price.toLocaleString()}
                </p>

                <div class="quantity-control">

                    <button
                        onclick="changeQuantity(${index}, -1)"
                    >
                        −
                    </button>

                    <strong>
                        ${item.quantity}
                    </strong>

                    <button
                        onclick="changeQuantity(${index}, 1)"
                    >
                        +
                    </button>

                </div>

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
                itemElement
            );

        }
    );


    cartCount.textContent =
        totalQuantity;


    cartTotal.textContent =
        "₹" +
        total.toLocaleString();

}


// ============================================
// CHANGE QUANTITY
// ============================================

function changeQuantity(index, change) {

    cart[index].quantity += change;


    if (
        cart[index].quantity <= 0
    ) {

        cart.splice(index, 1);

    }


    saveData();

    updateCart();

}


// ============================================
// REMOVE FROM CART
// ============================================

function removeFromCart(index) {

    const name =
        cart[index].name;

    cart.splice(index, 1);

    saveData();

    updateCart();

    showToast(
        "❌ " +
        name +
        " removed"
    );

}


// ============================================
// CLEAR CART
// ============================================

function clearCart() {

    if (cart.length === 0) {

        showToast(
            "Cart is already empty"
        );

        return;

    }


    cart = [];

    saveData();

    updateCart();

    showToast(
        "🗑️ Cart cleared"
    );

}


// ============================================
// OPEN CART
// ============================================

function openCart() {

    document
        .getElementById("cartPanel")
        .classList
        .add("active");

}


// ============================================
// CLOSE CART
// ============================================

function closeCart() {

    document
        .getElementById("cartPanel")
        .classList
        .remove("active");

}


// ============================================
// CHECKOUT
// ============================================

function checkout() {

    if (cart.length === 0) {

        showToast(
            "🛒 Cart is empty"
        );

        return;

    }


    let total = 0;


    cart.forEach(
        function(item) {

            total +=
                item.price *
                item.quantity;

        }
    );


    alert(
        "🎉 Order placed successfully!\n\n" +
        "Total Amount: ₹" +
        total.toLocaleString() +
        "\n\nThis is a demo checkout."
    );


    cart = [];

    saveData();

    updateCart();

}


// ============================================
// SEARCH
// ============================================

function searchProducts() {

    const text =
        document
            .getElementById(
                "searchInput"
            )
            .value
            .toLowerCase()
            .trim();


    const cards =
        document.querySelectorAll(
            ".product-card"
        );


    let visible = 0;


    cards.forEach(
        function(card) {

            const name =
                card
                    .dataset
                    .name
                    .toLowerCase();


            if (
                name.includes(text)
            ) {

                card.style.display =
                    "";

                visible++;

            } else {

                card.style.display =
                    "none";

            }

        }
    );


    document
        .getElementById(
            "resultCount"
        )
        .textContent =
            "Showing " +
            visible +
            " products";

}


// ============================================
// CATEGORY FILTER
// ============================================

function filterProducts() {

    const category =
        document
            .getElementById(
                "categoryFilter"
            )
            .value;


    const cards =
        document.querySelectorAll(
            ".product-card"
        );


    let visible = 0;


    cards.forEach(
        function(card) {

            const cardCategory =
                card.dataset.category;


            if (
                category === "all" ||
                cardCategory === category
            ) {

                card.style.display =
                    "";

                visible++;

            } else {

                card.style.display =
                    "none";

            }

        }
    );


    document
        .getElementById(
            "resultCount"
        )
        .textContent =
            "Showing " +
            visible +
            " products";

}


// ============================================
// SORT
// ============================================

function sortProducts() {

    const container =
        document.getElementById(
            "productContainer"
        );


    const cards =
        Array.from(
            container.querySelectorAll(
                ".product-card"
            )
        );


    const option =
        document
            .getElementById(
                "sortSelect"
            )
            .value;


    if (option === "low") {

        cards.sort(
            function(a, b) {

                return (
                    Number(
                        a.dataset.price
                    ) -
                    Number(
                        b.dataset.price
                    )
                );

            }
        );

    }


    if (option === "high") {

        cards.sort(
            function(a, b) {

                return (
                    Number(
                        b.dataset.price
                    ) -
                    Number(
                        a.dataset.price
                    )
                );

            }
        );

    }


    if (option === "name") {

        cards.sort(
            function(a, b) {

                return a.dataset.name
                    .localeCompare(
                        b.dataset.name
                    );

            }
        );

    }


    cards.forEach(
        function(card) {

            container.appendChild(
                card
            );

        }
    );

}


// ============================================
// RECOMMENDATION SYSTEM
// ============================================

function showRecommendations(productName) {

    const container =
        document.getElementById(
            "recommendationContainer"
        );


    const text =
        document.getElementById(
            "recommendationText"
        );


    container.innerHTML = "";


    text.textContent =
        "Because you selected " +
        productName +
        ":";


    const recommended =
        recommendations[productName];


    if (!recommended) {

        return;

    }


    recommended.forEach(
        function(name) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "recommendation-card";


            card.innerHTML = `

                <div class="recommendation-icon">
                    ${products[name].icon}
                </div>

                <h3>
                    ${name}
                </h3>

                <p>
                    ₹${products[name].price.toLocaleString()}
                </p>

                <br>

                <button
                    class="add-btn"
                    onclick="addToCart('${name}')"
                >
                    Add to Cart
                </button>

            `;


            container.appendChild(
                card
            );

        }
    );

}


// ============================================
// WISHLIST
// ============================================

function toggleWishlist(button, productName) {

    const index =
        wishlist.indexOf(
            productName
        );


    if (index === -1) {

        wishlist.push(
            productName
        );

        button.classList.add(
            "active"
        );

        button.textContent = "♥";

        showToast(
            "❤️ Added to wishlist"
        );

    } else {

        wishlist.splice(
            index,
            1
        );

        button.classList.remove(
            "active"
        );

        button.textContent = "♡";

        showToast(
            "Removed from wishlist"
        );

    }


    saveData();

    displayWishlist();

}


// ============================================
// DISPLAY WISHLIST
// ============================================

function displayWishlist() {

    const container =
        document.getElementById(
            "wishlistContainer"
        );


    const text =
        document.getElementById(
            "wishlistText"
        );


    container.innerHTML = "";


    if (wishlist.length === 0) {

        text.textContent =
            "No products added to wishlist.";

        return;

    }


    text.textContent =
        wishlist.length +
        " product(s) in your wishlist.";


    wishlist.forEach(
        function(name) {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "wishlist-item";


            item.innerHTML = `

                <div class="product-icon">
                    ${products[name].icon}
                </div>

                <h3>
                    ${name}
                </h3>

                <p>
                    ₹${products[name].price.toLocaleString()}
                </p>

                <button
                    onclick="removeFromWishlist('${name}')"
                >
                    Remove
                </button>

            `;


            container.appendChild(
                item
            );

        }
    );

}


// ============================================
// REMOVE WISHLIST
// ============================================

function removeFromWishlist(name) {

    const index =
        wishlist.indexOf(name);


    if (index !== -1) {

        wishlist.splice(
            index,
            1
        );

    }


    saveData();

    displayWishlist();

    showToast(
        "Removed from wishlist"
    );

}


// ============================================
// RESTORE WISHLIST BUTTONS
// ============================================

function restoreWishlistButtons() {

    const buttons =
        document.querySelectorAll(
            ".wishlist-btn"
        );


    buttons.forEach(
        function(button) {

            const onclickText =
                button.getAttribute(
                    "onclick"
                );


            const match =
                onclickText.match(
                    /'([^']+)'/
                );


            if (!match) {
                return;
            }


            const productName =
                match[1];


            if (
                wishlist.includes(
                    productName
                )
            ) {

                button.classList.add(
                    "active"
                );

                button.textContent =
                    "♥";

            }

        }
    );

}


// ============================================
// INITIALIZE
// ============================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCart();

        displayWishlist();

        restoreWishlistButtons();

    }
);