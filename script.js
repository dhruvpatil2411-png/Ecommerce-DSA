/* =====================================================
   TECHNOVA FINAL JAVASCRIPT
===================================================== */

const products = [
    {
        id: 1,
        name: "Zenith Pro Laptop",
        price: 54990,
        category: "laptop",
        icon: "💻"
    },
    {
        id: 2,
        name: "Nexa 7 Smartphone",
        price: 24999,
        category: "electronics",
        icon: "📱"
    },
    {
        id: 3,
        name: "SoundWave Max Headphones",
        price: 2999,
        category: "audio",
        icon: "🎧"
    },
    {
        id: 4,
        name: "PulseFit Smart Watch",
        price: 4999,
        category: "wearables",
        icon: "⌚"
    },
    {
        id: 5,
        name: "Titan Gaming Mouse",
        price: 1499,
        category: "gaming",
        icon: "🖱️"
    },
    {
        id: 6,
        name: "Elite Mechanical Keyboard",
        price: 2499,
        category: "gaming",
        icon: "⌨️"
    },
    {
        id: 7,
        name: "BassBoom Speaker",
        price: 2199,
        category: "audio",
        icon: "🔊"
    },
    {
        id: 8,
        name: "Nova Power Bank 20K",
        price: 1299,
        category: "power",
        icon: "🔋"
    }
];


/* =====================================================
   LOCAL STORAGE
===================================================== */

let cart =
    JSON.parse(
        localStorage.getItem("technovaCart")
    ) || [];

let wishlist =
    JSON.parse(
        localStorage.getItem("technovaWishlist")
    ) || [];

let orders =
    JSON.parse(
        localStorage.getItem("technovaOrders")
    ) || [];


/* =====================================================
   FORMAT PRICE
===================================================== */

function price(value) {

    return "₹" +
        Number(value)
            .toLocaleString("en-IN");

}


/* =====================================================
   SAVE DATA
===================================================== */

function saveData() {

    localStorage.setItem(
        "technovaCart",
        JSON.stringify(cart)
    );

    localStorage.setItem(
        "technovaWishlist",
        JSON.stringify(wishlist)
    );

    localStorage.setItem(
        "technovaOrders",
        JSON.stringify(orders)
    );

}


/* =====================================================
   TOAST
===================================================== */

function toast(message) {

    const box =
        document.getElementById("toast");

    box.textContent = message;

    box.classList.add("show");

    setTimeout(() => {

        box.classList.remove("show");

    }, 2200);

}


/* =====================================================
   CART
===================================================== */

function addToCart(name) {

    const product =
        products.find(
            p => p.name === name
        );

    if (!product) return;


    const existing =
        cart.find(
            item => item.id === product.id
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            quantity: 1

        });

    }


    saveData();

    updateCart();

    updateRecommendations();

    toast(
        product.name +
        " added to cart 🛒"
    );

}


function changeQuantity(id, amount) {

    const item =
        cart.find(
            product => product.id === id
        );

    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                product =>
                    product.id !== id
            );

    }


    saveData();

    updateCart();

    updateRecommendations();

}


function removeFromCart(id) {

    cart =
        cart.filter(
            item => item.id !== id
        );

    saveData();

    updateCart();

    updateRecommendations();

}


function cartCount() {

    return cart.reduce(
        (sum, item) =>
            sum + item.quantity,
        0
    );

}


function cartTotal() {

    return cart.reduce(
        (sum, item) =>
            sum +
            item.price *
            item.quantity,
        0
    );

}


/* =====================================================
   UPDATE CART
===================================================== */

function updateCart() {

    document.getElementById(
        "cartCount"
    ).textContent =
        cartCount();


    const container =
        document.getElementById(
            "modalCartItems"
        );


    if (cart.length === 0) {

        container.innerHTML =
            `<p class="empty-cart">
                Your cart is empty.
            </p>`;

    } else {

        container.innerHTML = "";


        cart.forEach(item => {

            const div =
                document.createElement("div");

            div.className =
                "cart-item";


            div.innerHTML = `

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ${price(item.price)}
                </p>

                <div class="quantity-control">

                    <button
                        onclick="
                        changeQuantity(
                            ${item.id},
                            -1
                        )">

                        −

                    </button>

                    <strong>
                        ${item.quantity}
                    </strong>

                    <button
                        onclick="
                        changeQuantity(
                            ${item.id},
                            1
                        )">

                        +

                    </button>

                </div>

                <button
                    class="remove-btn"
                    onclick="
                    removeFromCart(
                        ${item.id}
                    )">

                    Remove

                </button>

            `;


            container.appendChild(div);

        });

    }


    document.getElementById(
        "modalCartTotal"
    ).textContent =
        price(cartTotal());

}


/* =====================================================
   CART MODAL
===================================================== */

function openCart() {

    document
        .getElementById("cartPanel")
        .classList.add("active");

    updateCart();

}


function closeCart() {

    document
        .getElementById("cartPanel")
        .classList.remove("active");

}


document
    .getElementById("cartPanel")
    .addEventListener(
        "click",
        function(e) {

            if (
                e.target === this
            ) {

                closeCart();

            }

        }
    );


/* =====================================================
   WISHLIST
===================================================== */

function toggleWishlist(
    button,
    name
) {

    const product =
        products.find(
            p => p.name === name
        );

    if (!product) return;


    if (
        wishlist.includes(
            product.id
        )
    ) {

        wishlist =
            wishlist.filter(
                id =>
                    id !== product.id
            );

        button.textContent = "♡";

        button.classList.remove(
            "active"
        );

        toast(
            "Removed from wishlist"
        );

    } else {

        wishlist.push(
            product.id
        );

        button.textContent = "♥";

        button.classList.add(
            "active"
        );

        toast(
            "Added to wishlist ❤️"
        );

    }


    saveData();

    renderWishlist();

}


function renderWishlist() {

    const container =
        document.getElementById(
            "wishlistContainer"
        );


    document.getElementById(
        "wishlistCount"
    ).textContent =
        wishlist.length +
        " ITEMS";


    if (wishlist.length === 0) {

        container.innerHTML =
            `<div class="empty-orders">
                Your wishlist is empty.
            </div>`;

        return;

    }


    container.innerHTML = "";


    wishlist.forEach(id => {

        const product =
            products.find(
                p => p.id === id
            );

        if (!product) return;


        const div =
            document.createElement("div");

        div.className =
            "wishlist-item";


        div.innerHTML = `

            <div class="recommendation-icon">
                ${product.icon}
            </div>

            <h3>
                ${product.name}
            </h3>

            <p>
                ${price(product.price)}
            </p>

            <button
                onclick="
                addToCart(
                    '${product.name}'
                )">

                Add to Cart

            </button>

            <button
                onclick="
                removeWishlist(
                    ${product.id}
                )">

                Remove

            </button>

        `;


        container.appendChild(div);

    });

}


function removeWishlist(id) {

    wishlist =
        wishlist.filter(
            item => item !== id
        );

    saveData();

    renderWishlist();

    updateWishlistButtons();

}


/* =====================================================
   UPDATE HEARTS
===================================================== */

function updateWishlistButtons() {

    document
        .querySelectorAll(
            ".product-card"
        )
        .forEach(card => {

            const name =
                card.dataset.name;

            const product =
                products.find(
                    p => p.name === name
                );

            const button =
                card.querySelector(
                    ".wishlist-btn"
                );


            if (!product || !button)
                return;


            if (
                wishlist.includes(
                    product.id
                )
            ) {

                button.textContent = "♥";

                button.classList.add(
                    "active"
                );

            } else {

                button.textContent = "♡";

                button.classList.remove(
                    "active"
                );

            }

        });

}


/* =====================================================
   SEARCH
===================================================== */

function syncSearch() {

    const top =
        document.getElementById(
            "searchInput"
        );

    const product =
        document.getElementById(
            "productSearch"
        );


    if (
        document.activeElement === top
    ) {

        product.value =
            top.value;

    } else {

        top.value =
            product.value;

    }


    applyFilters();

}


/* =====================================================
   CATEGORY
===================================================== */

function selectCategory(category) {

    document.getElementById(
        "categoryFilter"
    ).value = category;


    document
        .querySelectorAll(
            ".category-option"
        )
        .forEach(button =>
            button.classList.remove(
                "active"
            )
        );


    event.currentTarget
        .classList.add("active");


    applyFilters();

}


function changeCategoryFromSelect() {

    const category =
        document.getElementById(
            "categoryFilter"
        ).value;


    document
        .querySelectorAll(
            ".category-option"
        )
        .forEach(button =>
            button.classList.remove(
                "active"
            )
        );


    applyFilters();

}


/* =====================================================
   PRICE FILTER
===================================================== */

function filterByPrice() {

    const value =
        document.getElementById(
            "priceFilter"
        ).value;


    document.getElementById(
        "priceValue"
    ).textContent =
        "Up to " +
        price(value);


    applyFilters();

}


/* =====================================================
   FILTER
===================================================== */

function applyFilters() {

    const search =
        document.getElementById(
            "productSearch"
        ).value
            .toLowerCase()
            .trim();


    const category =
        document.getElementById(
            "categoryFilter"
        ).value;


    const maxPrice =
        Number(
            document.getElementById(
                "priceFilter"
            ).value
        );


    const cards =
        document.querySelectorAll(
            ".product-card"
        );


    let visible = 0;


    cards.forEach(card => {

        const name =
            card.dataset.name
                .toLowerCase();

        const cardCategory =
            card.dataset.category;

        const cardPrice =
            Number(
                card.dataset.price
            );


        const searchMatch =
            name.includes(search);


        const categoryMatch =
            category === "all" ||
            cardCategory === category;


        const priceMatch =
            cardPrice <= maxPrice;


        if (
            searchMatch &&
            categoryMatch &&
            priceMatch
        ) {

            card.style.display = "";

            visible++;

        } else {

            card.style.display =
                "none";

        }

    });


    document.getElementById(
        "resultCount"
    ).textContent =
        `Showing ${visible} products`;

}


/* =====================================================
   SORT
===================================================== */

function sortProducts() {

    const type =
        document.getElementById(
            "sortSelect"
        ).value;


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


    cards.sort(
        (a,b) => {

            if (type === "low") {

                return (
                    Number(
                        a.dataset.price
                    ) -
                    Number(
                        b.dataset.price
                    )
                );

            }


            if (type === "high") {

                return (
                    Number(
                        b.dataset.price
                    ) -
                    Number(
                        a.dataset.price
                    )
                );

            }


            if (type === "name") {

                return a.dataset.name
                    .localeCompare(
                        b.dataset.name
                    );

            }


            return (
                Number(
                    a.dataset.name
                ) -
                Number(
                    b.dataset.name
                )
            );

        }
    );


    cards.forEach(card =>
        container.appendChild(card)
    );


    applyFilters();

}


/* =====================================================
   RECOMMENDATION
===================================================== */

function updateRecommendations() {

    const container =
        document.getElementById(
            "recommendationContainer"
        );


    let recommended = [];


    if (cart.length > 0) {

        const cartCategories =
            cart.map(item => {

                const product =
                    products.find(
                        p =>
                            p.id ===
                            item.id
                    );

                return product.category;

            });


        recommended =
            products.filter(
                product =>

                    !cart.some(
                        item =>
                            item.id ===
                            product.id
                    ) &&

                    cartCategories.includes(
                        product.category
                    )
            );

    }


    if (
        recommended.length === 0
    ) {

        recommended =
            products.slice(0,3);

    }


    container.innerHTML = "";


    recommended
        .slice(0,3)
        .forEach(product => {

            const div =
                document.createElement(
                    "div"
                );

            div.className =
                "recommendation-card";


            div.innerHTML = `

                <div class="
                    recommendation-icon
                ">
                    ${product.icon}
                </div>

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ${price(product.price)}
                </p>

                <button
                    class="add-btn"
                    onclick="
                    addToCart(
                        '${product.name}'
                    )">

                    Add to Cart

                </button>

            `;


            container.appendChild(div);

        });

}


/* =====================================================
   BINARY SEARCH TREE
===================================================== */

class Node {

    constructor(value) {

        this.value = value;

        this.left = null;

        this.right = null;

    }

}


class BST {

    constructor() {

        this.root = null;

    }


    insert(value) {

        const node =
            new Node(value);


        if (!this.root) {

            this.root = node;

            return;

        }


        let current =
            this.root;


        while (true) {

            if (
                value <
                current.value
            ) {

                if (
                    current.left === null
                ) {

                    current.left =
                        node;

                    return;

                }

                current =
                    current.left;

            } else {

                if (
                    current.right === null
                ) {

                    current.right =
                        node;

                    return;

                }

                current =
                    current.right;

            }

        }

    }


    search(value) {

        let current =
            this.root;


        while (current) {

            if (
                current.value ===
                value
            ) {

                return true;

            }


            if (
                value <
                current.value
            ) {

                current =
                    current.left;

            } else {

                current =
                    current.right;

            }

        }


        return false;

    }


    inorder(
        node,
        result = []
    ) {

        if (!node)
            return result;


        this.inorder(
            node.left,
            result
        );


        result.push(
            node.value
        );


        this.inorder(
            node.right,
            result
        );


        return result;

    }

}


const priceTree =
    new BST();


products.forEach(
    product =>
        priceTree.insert(
            product.price
        )
);


/* =====================================================
   BST SEARCH
===================================================== */

function searchBST() {

    const input =
        Number(
            document.getElementById(
                "bstSearchInput"
            ).value
        );


    const result =
        document.getElementById(
            "bstResult"
        );


    if (!input) {

        result.innerHTML =
            "Please enter a price.";

        return;

    }


    if (
        priceTree.search(input)
    ) {

        const product =
            products.find(
                p =>
                    p.price ===
                    input
            );


        result.innerHTML = `

            ✅ Price found!

            <br><br>

            Product:
            <strong>
                ${product.name}
            </strong>

            <br>

            Price:
            <strong>
                ${price(input)}
            </strong>

        `;

    } else {

        result.innerHTML = `

            ❌ ${price(input)}
            was not found in BST.

        `;

    }

}


/* =====================================================
   SHOW BST
===================================================== */

function showBSTData() {

    const result =
        document.getElementById(
            "bstResult"
        );


    const values =
        priceTree.inorder(
            priceTree.root
        );


    result.innerHTML = `

        <strong>
            BST Inorder Traversal
        </strong>

        <br><br>

        ${
            values
                .map(
                    value =>
                        price(value)
                )
                .join(" → ")
        }

    `;

}


/* =====================================================
   CHECKOUT
===================================================== */

function checkout() {

    if (cart.length === 0) {

        toast(
            "Your cart is empty ❌"
        );

        return;

    }


    const order = {

        id:
            "TN" +
            Date.now()
                .toString()
                .slice(-6),

        date:
            new Date()
                .toLocaleString(
                    "en-IN"
                ),

        items:
            cart.map(
                item => ({
                    ...item
                })
            ),

        total:
            cartTotal(),

        status:
            "Confirmed"

    };


    orders.unshift(order);

    cart = [];


    saveData();

    updateCart();

    renderOrders();

    updateRecommendations();

    closeCart();


    toast(
        "Order placed successfully 🎉"
    );


    document
        .getElementById("orders")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =====================================================
   ORDERS
===================================================== */

function renderOrders() {

    const container =
        document.getElementById(
            "orderContainer"
        );


    const message =
        document.getElementById(
            "orderMessage"
        );


    if (orders.length === 0) {

        container.innerHTML = `

            <div class="empty-orders">
                No orders yet.
            </div>

        `;

        message.textContent =
            "Your previous orders will appear here.";

        return;

    }


    message.textContent =
        `${orders.length} order(s) found.`;


    container.innerHTML = "";


    orders.forEach(order => {

        const card =
            document.createElement(
                "div"
            );

        card.className =
            "order-card";


        let itemHTML = "";


        order.items.forEach(item => {

            itemHTML += `

                <div class="order-product">

                    <span>
                        ${item.name}
                        × ${item.quantity}
                    </span>

                    <strong>
                        ${price(
                            item.price *
                            item.quantity
                        )}
                    </strong>

                </div>

            `;

        });


        card.innerHTML = `

            <div class="order-header">

                <div>

                    <strong>
                        Order
                        <span class="order-id">
                            #${order.id}
                        </span>
                    </strong>

                    <br>

                    <small>
                        ${order.date}
                    </small>

                </div>

                <span class="order-status">
                    ${order.status}
                </span>

            </div>

            <div>
                ${itemHTML}
            </div>

            <div class="order-total">

                Total:
                ${price(order.total)}

            </div>

        `;


        container.appendChild(card);

    });

}


/* =====================================================
   CLEAR ORDERS
===================================================== */

function clearOrderHistory() {

    if (
        orders.length === 0
    ) {

        toast(
            "No orders to clear."
        );

        return;

    }


    if (
        !confirm(
            "Clear all order history?"
        )
    ) {

        return;

    }


    orders = [];

    saveData();

    renderOrders();

    toast(
        "Order history cleared."
    );

}


/* =====================================================
   SHOP NOW
===================================================== */

function scrollToProducts() {

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =====================================================
   INITIALIZE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCart();

        renderWishlist();

        updateWishlistButtons();

        renderOrders();

        updateRecommendations();

        filterByPrice();

    }
);