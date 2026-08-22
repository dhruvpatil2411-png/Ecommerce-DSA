/* =====================================================
   TECHNOVA - FINAL JAVASCRIPT
===================================================== */


/* ================= PRODUCTS ================= */

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


/* ================= LOCAL STORAGE ================= */

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


/* ================= HELPERS ================= */

function money(value) {

    return "₹" +
        Number(value)
            .toLocaleString("en-IN");

}


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


function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(function () {

        toast.classList.remove("show");

    }, 2000);

}


/* ================= CART ================= */

function addToCart(productId) {

    const product =
        products.find(
            p => p.id === Number(productId)
        );

    if (!product) {

        showToast("Product not found ❌");

        return;

    }


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

    showToast(
        product.name +
        " added to cart 🛒"
    );

}


function updateCart() {

    const cartCount =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    document.getElementById(
        "cartCount"
    ).textContent =
        cartCount;


    const container =
        document.getElementById(
            "cartItems"
        );


    if (cart.length === 0) {

        container.innerHTML = `
            <div class="empty-cart">
                🛒 Your cart is empty.
            </div>
        `;

    } else {

        container.innerHTML = "";


        cart.forEach(function(item) {

            const div =
                document.createElement("div");

            div.className =
                "cart-item";


            div.innerHTML = `

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ${money(item.price)}
                </p>

                <div class="quantity">

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
                    class="remove"
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


    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                item.price *
                item.quantity,
            0
        );


    document.getElementById(
        "cartTotal"
    ).textContent =
        money(total);

}


function changeQuantity(id, amount) {

    const item =
        cart.find(
            product =>
                product.id === Number(id)
        );


    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                product =>
                    product.id !== Number(id)
            );

    }


    saveData();

    updateCart();

    updateRecommendations();

}


function removeFromCart(id) {

    cart =
        cart.filter(
            item =>
                item.id !== Number(id)
        );


    saveData();

    updateCart();

    updateRecommendations();

    showToast(
        "Product removed from cart"
    );

}


/* ================= CART MODAL ================= */

function openCart() {

    document
        .getElementById("cartModal")
        .classList.add("show");

    updateCart();

}


function closeCart() {

    document
        .getElementById("cartModal")
        .classList.remove("show");

}


document
    .getElementById("closeCart")
    .addEventListener(
        "click",
        closeCart
    );


document
    .getElementById("cartModal")
    .addEventListener(
        "click",
        function(event) {

            if (
                event.target ===
                document.getElementById(
                    "cartModal"
                )
            ) {

                closeCart();

            }

        }
    );


/* ================= WISHLIST ================= */

function toggleWishlist(id, button) {

    id = Number(id);


    if (
        wishlist.includes(id)
    ) {

        wishlist =
            wishlist.filter(
                item => item !== id
            );

        button.textContent = "♡";

        button.classList.remove(
            "active"
        );

        showToast(
            "Removed from wishlist"
        );

    } else {

        wishlist.push(id);

        button.textContent = "♥";

        button.classList.add(
            "active"
        );

        showToast(
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

        container.innerHTML = `
            <div class="empty-cart">
                ❤️ Your wishlist is empty.
            </div>
        `;

        return;

    }


    container.innerHTML = "";


    wishlist.forEach(function(id) {

        const product =
            products.find(
                p => p.id === id
            );


        if (!product) return;


        const card =
            document.createElement("div");

        card.className =
            "wishlist-card";


        card.innerHTML = `

            <div class="icon">
                ${product.icon}
            </div>

            <h3>
                ${product.name}
            </h3>

            <p>
                ${money(product.price)}
            </p>

            <button
                onclick="
                addToCart(${product.id})
                ">

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


        container.appendChild(card);

    });

}


function removeWishlist(id) {

    wishlist =
        wishlist.filter(
            item => item !== Number(id)
        );

    saveData();

    renderWishlist();

    updateHeartButtons();

}


/* ================= HEART BUTTONS ================= */

function updateHeartButtons() {

    document
        .querySelectorAll(".heart")
        .forEach(function(button) {

            const id =
                Number(
                    button.dataset.id
                );


            if (
                wishlist.includes(id)
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


/* ================= SEARCH ================= */

function filterProducts() {

    const search =
        document
            .getElementById(
                "productSearch"
            )
            .value
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
            ".product"
        );


    let count = 0;


    cards.forEach(function(card) {

        const name =
            card.dataset.name
                .toLowerCase();


        const cardCategory =
            card.dataset.category;


        const cardPrice =
            Number(
                card.dataset.price
            );


        const matchesSearch =
            name.includes(search);


        const matchesCategory =
            category === "all" ||
            cardCategory === category;


        const matchesPrice =
            cardPrice <= maxPrice;


        if (
            matchesSearch &&
            matchesCategory &&
            matchesPrice
        ) {

            card.style.display =
                "";

            count++;

        } else {

            card.style.display =
                "none";

        }

    });


    document.getElementById(
        "resultCount"
    ).textContent =
        "Showing " +
        count +
        " products";

}


/* ================= SEARCH SYNC ================= */

document
    .getElementById("topSearch")
    .addEventListener(
        "input",
        function() {

            document.getElementById(
                "productSearch"
            ).value =
                this.value;

            filterProducts();

        }
    );


document
    .getElementById("productSearch")
    .addEventListener(
        "input",
        function() {

            document.getElementById(
                "topSearch"
            ).value =
                this.value;

            filterProducts();

        }
    );


/* ================= CATEGORY ================= */

document
    .querySelectorAll(".category")
    .forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                const category =
                    this.dataset.category;


                document.getElementById(
                    "categoryFilter"
                ).value =
                    category;


                document
                    .querySelectorAll(
                        ".category"
                    )
                    .forEach(function(btn) {

                        btn.classList.remove(
                            "active"
                        );

                    });


                this.classList.add(
                    "active"
                );


                filterProducts();

            }
        );

    });


document
    .getElementById(
        "categoryFilter"
    )
    .addEventListener(
        "change",
        function() {

            document
                .querySelectorAll(
                    ".category"
                )
                .forEach(function(btn) {

                    btn.classList.remove(
                        "active"
                    );

                    if (
                        btn.dataset.category ===
                        document.getElementById(
                            "categoryFilter"
                        ).value
                    ) {

                        btn.classList.add(
                            "active"
                        );

                    }

                });


            filterProducts();

        }
    );


/* ================= PRICE ================= */

document
    .getElementById("priceFilter")
    .addEventListener(
        "input",
        function() {

            document.getElementById(
                "priceValue"
            ).textContent =
                "Up to " +
                money(this.value);

            filterProducts();

        }
    );


document
    .getElementById("applyPrice")
    .addEventListener(
        "click",
        function() {

            filterProducts();

            showToast(
                "Price filter applied"
            );

        }
    );


/* ================= SORT ================= */

document
    .getElementById("sortFilter")
    .addEventListener(
        "change",
        function() {

            const type =
                this.value;


            const grid =
                document.getElementById(
                    "productsGrid"
                );


            const cards =
                Array.from(
                    grid.querySelectorAll(
                        ".product"
                    )
                );


            cards.sort(
                function(a,b) {

                    if (
                        type === "low"
                    ) {

                        return Number(
                            a.dataset.price
                        ) -
                        Number(
                            b.dataset.price
                        );

                    }


                    if (
                        type === "high"
                    ) {

                        return Number(
                            b.dataset.price
                        ) -
                        Number(
                            a.dataset.price
                        );

                    }


                    if (
                        type === "name"
                    ) {

                        return a.dataset.name
                            .localeCompare(
                                b.dataset.name
                            );

                    }


                    return 0;

                }
            );


            cards.forEach(
                card =>
                    grid.appendChild(card)
            );


            filterProducts();

        }
    );


/* ================= PRODUCT BUTTONS ================= */

document
    .querySelectorAll(".add-cart")
    .forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                addToCart(
                    this.dataset.id
                );

            }
        );

    });


document
    .querySelectorAll(".heart")
    .forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                toggleWishlist(
                    this.dataset.id,
                    this
                );

            }
        );

    });


/* ================= RECOMMENDATIONS ================= */

function updateRecommendations() {

    const container =
        document.getElementById(
            "recommendations"
        );


    let recommended = [];


    if (cart.length > 0) {

        const cartCategories =
            cart.map(function(item) {

                const product =
                    products.find(
                        p =>
                            p.id ===
                            item.id
                    );

                return product.category;

            });


        recommended =
            products.filter(function(product) {

                return (
                    !cart.some(
                        item =>
                            item.id ===
                            product.id
                    ) &&
                    cartCategories.includes(
                        product.category
                    )
                );

            });

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
        .forEach(function(product) {

            const div =
                document.createElement(
                    "div"
                );

            div.className =
                "recommend-card";


            div.innerHTML = `

                <div class="icon">
                    ${product.icon}
                </div>

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ${money(product.price)}
                </p>

                <button
                    onclick="
                    addToCart(
                        ${product.id}
                    )">

                    Add to Cart

                </button>

            `;


            container.appendChild(div);

        });

}


/* ================= BST ================= */

class Node {

    constructor(value) {

        this.value = value;

        this.left = null;

        this.right = null;

    }

}


class BinarySearchTree {

    constructor() {

        this.root = null;

    }


    insert(value) {

        const node =
            new Node(value);


        if (
            this.root === null
        ) {

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


        while (current !== null) {

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


    inorder(node, result = []) {

        if (
            node === null
        ) {

            return result;

        }


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


const bst =
    new BinarySearchTree();


products.forEach(function(product) {

    bst.insert(
        product.price
    );

});


document
    .getElementById("bstSearch")
    .addEventListener(
        "click",
        function() {

            const value =
                Number(
                    document.getElementById(
                        "bstInput"
                    ).value
                );


            const result =
                document.getElementById(
                    "bstResult"
                );


            if (!value) {

                result.textContent =
                    "Please enter a price.";

                return;

            }


            const found =
                bst.search(value);


            if (found) {

                const product =
                    products.find(
                        p =>
                            p.price ===
                            value
                    );


                result.innerHTML = `
                    ✅ Price found!
                    <br><br>
                    Product:
                    <b>${product.name}</b>
                    <br>
                    Price:
                    <b>${money(value)}</b>
                `;

            } else {

                result.innerHTML = `
                    ❌ ${money(value)}
                    was not found in BST.
                `;

            }

        }
    );


document
    .getElementById("bstShow")
    .addEventListener(
        "click",
        function() {

            const values =
                bst.inorder(
                    bst.root
                );


            document.getElementById(
                "bstResult"
            ).innerHTML = `

                <b>BST Inorder Traversal:</b>

                <br><br>

                ${values
                    .map(
                        value =>
                            money(value)
                    )
                    .join(" → ")}

            `;

        }
    );


/* ================= CHECKOUT ================= */

document
    .getElementById("checkout")
    .addEventListener(
        "click",
        function() {

            if (
                cart.length === 0
            ) {

                showToast(
                    "Cart is empty ❌"
                );

                return;

            }


            const total =
                cart.reduce(
                    (sum,item) =>
                        sum +
                        item.price *
                        item.quantity,
                    0
                );


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

                total: total,

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

            showToast(
                "Order placed successfully 🎉"
            );


            document
                .getElementById("orders")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


/* ================= ORDERS ================= */

function renderOrders() {

    const container =
        document.getElementById(
            "ordersContainer"
        );


    if (
        orders.length === 0
    ) {

        container.innerHTML = `
            <div class="empty-cart">
                📦 No orders yet.
            </div>
        `;

        return;

    }


    container.innerHTML = "";


    orders.forEach(function(order) {

        const card =
            document.createElement(
                "div"
            );

        card.className =
            "order-card";


        let itemsHTML = "";


        order.items.forEach(
            function(item) {

                itemsHTML += `

                    <div class="order-item">

                        <span>
                            ${item.name}
                            × ${item.quantity}
                        </span>

                        <b>
                            ${money(
                                item.price *
                                item.quantity
                            )}
                        </b>

                    </div>

                `;

            }
        );


        card.innerHTML = `

            <div class="order-top">

                <div>

                    <b>
                        Order #${order.id}
                    </b>

                    <br>

                    <small>
                        ${order.date}
                    </small>

                </div>

                <span class="order-status">
                    ${order.status}
                </span>

            </div>

            ${itemsHTML}

            <div class="order-total">

                Total:
                ${money(order.total)}

            </div>

        `;


        container.appendChild(card);

    });

}


/* ================= CLEAR ORDERS ================= */

document
    .getElementById("clearOrders")
    .addEventListener(
        "click",
        function() {

            if (
                orders.length === 0
            ) {

                showToast(
                    "No orders to clear"
                );

                return;

            }


            const confirmClear =
                confirm(
                    "Clear all orders?"
                );


            if (!confirmClear)
                return;


            orders = [];

            saveData();

            renderOrders();

            showToast(
                "Orders cleared"
            );

        }
    );


/* ================= SHOP NOW ================= */

function goProducts() {

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* ================= INITIALIZE ================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCart();

        renderWishlist();

        updateHeartButtons();

        renderOrders();

        updateRecommendations();

        filterProducts();

    }
);