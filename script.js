/* =========================================================
   TECHNOVA - COMPLETE JAVASCRIPT
   DSA E-COMMERCE PROJECT
========================================================= */


/* =========================================================
   PRODUCT DATA
========================================================= */

const products = [
    {
        id: 1,
        name: "Zenith Pro Laptop",
        price: 54990,
        category: "laptop",
        description: "Ultra-performance laptop",
        icon: "💻",
        rating: 5
    },

    {
        id: 2,
        name: "Nexa 7 Smartphone",
        price: 24999,
        category: "electronics",
        description: "Next-generation smartphone",
        icon: "📱",
        rating: 5
    },

    {
        id: 3,
        name: "SoundWave Max Headphones",
        price: 2999,
        category: "audio",
        description: "Immersive wireless audio",
        icon: "🎧",
        rating: 5
    },

    {
        id: 4,
        name: "PulseFit Smart Watch",
        price: 4999,
        category: "wearables",
        description: "Smart fitness companion",
        icon: "⌚",
        rating: 4
    },

    {
        id: 5,
        name: "Titan Gaming Mouse",
        price: 1499,
        category: "gaming",
        description: "Precision RGB gaming mouse",
        icon: "🖱️",
        rating: 5
    },

    {
        id: 6,
        name: "Elite Mechanical Keyboard",
        price: 2499,
        category: "gaming",
        description: "RGB mechanical keyboard",
        icon: "⌨️",
        rating: 5
    },

    {
        id: 7,
        name: "BassBoom Speaker",
        price: 2199,
        category: "audio",
        description: "Portable powerful speaker",
        icon: "🔊",
        rating: 4
    },

    {
        id: 8,
        name: "Nova Power Bank 20K",
        price: 1299,
        category: "power",
        description: "Fast charging power bank",
        icon: "🔋",
        rating: 4
    }
];


/* =========================================================
   CART
========================================================= */

let cart = JSON.parse(
    localStorage.getItem("technovaCart")
) || [];


/* =========================================================
   WISHLIST
========================================================= */

let wishlist = JSON.parse(
    localStorage.getItem("technovaWishlist")
) || [];


/* =========================================================
   ORDERS
========================================================= */

let orders = JSON.parse(
    localStorage.getItem("technovaOrders")
) || [];


/* =========================================================
   CURRENT FILTER
========================================================= */

let selectedCategory = "all";


/* =========================================================
   FORMAT PRICE
========================================================= */

function formatPrice(price) {

    return "₹" + Number(price).toLocaleString("en-IN");

}


/* =========================================================
   SAVE CART
========================================================= */

function saveCart() {

    localStorage.setItem(
        "technovaCart",
        JSON.stringify(cart)
    );

}


/* =========================================================
   SAVE WISHLIST
========================================================= */

function saveWishlist() {

    localStorage.setItem(
        "technovaWishlist",
        JSON.stringify(wishlist)
    );

}


/* =========================================================
   SAVE ORDERS
========================================================= */

function saveOrders() {

    localStorage.setItem(
        "technovaOrders",
        JSON.stringify(orders)
    );

}


/* =========================================================
   TOAST MESSAGE
========================================================= */

function showToast(message) {

    const toast =
        document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(productName) {

    const product = products.find(
        p => p.name === productName
    );

    if (!product) return;


    const existing = cart.find(
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


    saveCart();

    updateCartUI();

    updateRecommendations();

    showToast(
        `${product.name} added to cart 🛒`
    );

}


/* =========================================================
   REMOVE FROM CART
========================================================= */

function removeFromCart(id) {

    cart = cart.filter(
        item => item.id !== id
    );

    saveCart();

    updateCartUI();

    updateRecommendations();

}


/* =========================================================
   CHANGE QUANTITY
========================================================= */

function changeQuantity(id, amount) {

    const item = cart.find(
        product => product.id === id
    );

    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart = cart.filter(
            product => product.id !== id
        );

    }


    saveCart();

    updateCartUI();

    updateRecommendations();

}


/* =========================================================
   CART TOTAL
========================================================= */

function getCartTotal() {

    return cart.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

}


/* =========================================================
   CART COUNT
========================================================= */

function getCartCount() {

    return cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );

}


/* =========================================================
   UPDATE CART UI
========================================================= */

function updateCartUI() {

    const count =
        getCartCount();

    const total =
        getCartTotal();


    const cartCount =
        document.getElementById("cartCount");

    if (cartCount) {

        cartCount.textContent =
            count;

    }


    const cartLabel =
        document.getElementById(
            "cartItemLabel"
        );

    if (cartLabel) {

        cartLabel.textContent =
            `${count} ITEMS`;

    }


    const cartTotal =
        document.getElementById(
            "cartTotal"
        );

    if (cartTotal) {

        cartTotal.textContent =
            formatPrice(total);

    }


    renderCartItems();

    renderModalCart();

}


/* =========================================================
   RENDER CART
========================================================= */

function renderCartItems() {

    const container =
        document.getElementById(
            "cartItems"
        );

    if (!container) return;


    if (cart.length === 0) {

        container.innerHTML =
            `<p class="empty-cart">
                Your cart is empty.
            </p>`;

        return;

    }


    container.innerHTML = "";


    cart.forEach(item => {

        const div =
            document.createElement("div");

        div.className =
            "cart-item";


        div.innerHTML = `

            <h3>${item.name}</h3>

            <p>
                ${formatPrice(item.price)}
            </p>

            <div class="quantity-control">

                <button
                    onclick="changeQuantity(
                        ${item.id}, -1
                    )"
                >
                    −
                </button>

                <strong>
                    ${item.quantity}
                </strong>

                <button
                    onclick="changeQuantity(
                        ${item.id}, 1
                    )"
                >
                    +
                </button>

            </div>

            <button
                class="remove-btn"
                onclick="removeFromCart(
                    ${item.id}
                )"
            >
                Remove
            </button>

        `;


        container.appendChild(div);

    });

}


/* =========================================================
   MODAL CART
========================================================= */

function renderModalCart() {

    const container =
        document.getElementById(
            "modalCartItems"
        );

    const total =
        document.getElementById(
            "modalCartTotal"
        );


    if (!container) return;


    if (cart.length === 0) {

        container.innerHTML =
            `<p class="empty-cart">
                Your cart is empty.
            </p>`;

    } else {

        container.innerHTML = "";


        cart.forEach(item => {

            const div =
                document.createElement(
                    "div"
                );

            div.className =
                "cart-item";


            div.innerHTML = `

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ${formatPrice(item.price)}
                </p>

                <div class="quantity-control">

                    <button
                        onclick="changeQuantity(
                            ${item.id}, -1
                        )"
                    >
                        −
                    </button>

                    <strong>
                        ${item.quantity}
                    </strong>

                    <button
                        onclick="changeQuantity(
                            ${item.id}, 1
                        )"
                    >
                        +
                    </button>

                </div>

                <button
                    class="remove-btn"
                    onclick="removeFromCart(
                        ${item.id}
                    )"
                >
                    Remove
                </button>

            `;


            container.appendChild(div);

        });

    }


    if (total) {

        total.textContent =
            formatPrice(
                getCartTotal()
            );

    }

}


/* =========================================================
   OPEN CART
========================================================= */

function openCart() {

    const modal =
        document.getElementById(
            "cartPanel"
        );

    if (modal) {

        modal.classList.add("active");

    }

}


/* =========================================================
   CLOSE CART
========================================================= */

function closeCart() {

    const modal =
        document.getElementById(
            "cartPanel"
        );

    if (modal) {

        modal.classList.remove(
            "active"
        );

    }

}


/* =========================================================
   WISHLIST
========================================================= */

function toggleWishlist(
    button,
    productName
) {

    const product =
        products.find(
            p => p.name === productName
        );

    if (!product) return;


    const exists =
        wishlist.includes(
            product.id
        );


    if (exists) {

        wishlist =
            wishlist.filter(
                id => id !== product.id
            );

        button.classList.remove(
            "active"
        );

        button.textContent = "♡";

        showToast(
            "Removed from wishlist"
        );

    } else {

        wishlist.push(
            product.id
        );

        button.classList.add(
            "active"
        );

        button.textContent = "♥";

        showToast(
            "Added to wishlist ❤️"
        );

    }


    saveWishlist();

    renderWishlist();

}


/* =========================================================
   RENDER WISHLIST
========================================================= */

function renderWishlist() {

    const container =
        document.getElementById(
            "wishlistContainer"
        );

    const preview =
        document.getElementById(
            "wishlistPreview"
        );

    const count =
        document.getElementById(
            "wishlistCount"
        );


    if (count) {

        count.textContent =
            `${wishlist.length} ITEMS`;

    }


    if (container) {

        if (wishlist.length === 0) {

            container.innerHTML =
                `<p class="empty-orders">
                    Your wishlist is empty.
                </p>`;

        } else {

            container.innerHTML = "";


            wishlist.forEach(id => {

                const product =
                    products.find(
                        p => p.id === id
                    );

                if (!product) return;


                const card =
                    document.createElement(
                        "div"
                    );

                card.className =
                    "wishlist-item";


                card.innerHTML = `

                    <div
                        class="recommendation-icon"
                    >
                        ${product.icon}
                    </div>

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        ${formatPrice(
                            product.price
                        )}
                    </p>

                    <button
                        onclick="
                            removeWishlist(
                                ${product.id}
                            )
                        "
                    >
                        Remove
                    </button>

                    <button
                        onclick="
                            addToCart(
                                '${product.name}'
                            )
                        "
                    >
                        Add to Cart
                    </button>

                `;


                container.appendChild(card);

            });

        }

    }


    if (preview) {

        if (wishlist.length === 0) {

            preview.innerHTML =
                `<p>
                    No wishlist items.
                </p>`;

        } else {

            preview.innerHTML = "";


            wishlist.slice(0, 3)
                .forEach(id => {

                    const product =
                        products.find(
                            p => p.id === id
                        );

                    if (!product) return;


                    const div =
                        document.createElement(
                            "div"
                        );

                    div.className =
                        "wishlist-item";


                    div.innerHTML = `

                        <h3>
                            ${product.icon}
                            ${product.name}
                        </h3>

                        <p>
                            ${formatPrice(
                                product.price
                            )}
                        </p>

                    `;


                    preview.appendChild(div);

                });

        }

    }


    updateWishlistButtons();

}


/* =========================================================
   REMOVE WISHLIST
========================================================= */

function removeWishlist(id) {

    wishlist =
        wishlist.filter(
            item => item !== id
        );

    saveWishlist();

    renderWishlist();

    showToast(
        "Removed from wishlist"
    );

}


/* =========================================================
   UPDATE WISHLIST BUTTONS
========================================================= */

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

                button.classList.add(
                    "active"
                );

                button.textContent =
                    "♥";

            } else {

                button.classList.remove(
                    "active"
                );

                button.textContent =
                    "♡";

            }

        });

}


/* =========================================================
   SEARCH
========================================================= */

function syncSearch() {

    const input =
        document.getElementById(
            "productSearch"
        );

    const topInput =
        document.getElementById(
            "searchInput"
        );


    if (input && topInput) {

        topInput.value =
            input.value;

    }


    applyFilters();

}


/* =========================================================
   APPLY FILTERS
========================================================= */

function applyFilters() {

    const search =
        (
            document.getElementById(
                "productSearch"
            )?.value ||

            document.getElementById(
                "searchInput"
            )?.value ||

            ""
        )
        .toLowerCase()
        .trim();


    const category =
        document.getElementById(
            "categoryFilter"
        )?.value ||
        selectedCategory;


    const maxPrice =
        Number(
            document.getElementById(
                "priceFilter"
            )?.value ||
            60000
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

        const price =
            Number(
                card.dataset.price
            );


        const matchesSearch =
            name.includes(search);


        const matchesCategory =
            category === "all" ||
            cardCategory === category;


        const matchesPrice =
            price <= maxPrice;


        if (
            matchesSearch &&
            matchesCategory &&
            matchesPrice
        ) {

            card.style.display =
                "";

            visible++;

        } else {

            card.style.display =
                "none";

        }

    });


    const result =
        document.getElementById(
            "resultCount"
        );

    if (result) {

        result.textContent =
            `Showing ${visible} products`;

    }

}


/* =========================================================
   CATEGORY
========================================================= */

function selectCategory(category) {

    selectedCategory =
        category;


    const select =
        document.getElementById(
            "categoryFilter"
        );


    if (select) {

        select.value =
            category;

    }


    document
        .querySelectorAll(
            ".category-option"
        )
        .forEach(button => {

            button.classList.remove(
                "active"
            );

        });


    event?.currentTarget
        ?.classList
        .add("active");


    applyFilters();

}


/* =========================================================
   PRICE FILTER
========================================================= */

function filterByPrice() {

    const slider =
        document.getElementById(
            "priceFilter"
        );

    const label =
        document.getElementById(
            "priceValue"
        );


    if (!slider) return;


    const value =
        Number(
            slider.value
        );


    if (label) {

        label.textContent =
            `Up to ${formatPrice(
                value
            )}`;

    }


    applyFilters();

}


/* =========================================================
   SORT PRODUCTS
========================================================= */

function sortProducts() {

    const value =
        document.getElementById(
            "sortSelect"
        )?.value;


    const container =
        document.getElementById(
            "productContainer"
        );


    if (!container) return;


    const cards =
        Array.from(
            container.querySelectorAll(
                ".product-card"
            )
        );


    cards.sort((a, b) => {

        const priceA =
            Number(
                a.dataset.price
            );

        const priceB =
            Number(
                b.dataset.price
            );

        const nameA =
            a.dataset.name;

        const nameB =
            b.dataset.name;


        if (value === "low") {

            return priceA - priceB;

        }


        if (value === "high") {

            return priceB - priceA;

        }


        if (value === "name") {

            return nameA.localeCompare(
                nameB
            );

        }


        return 0;

    });


    cards.forEach(card => {

        container.appendChild(
            card
        );

    });


    applyFilters();

}


/* =========================================================
   RECOMMENDATION SYSTEM
========================================================= */

function updateRecommendations() {

    const container =
        document.getElementById(
            "recommendationContainer"
        );

    const side =
        document.getElementById(
            "sideRecommendations"
        );

    const text =
        document.getElementById(
            "recommendationText"
        );


    let recommendations = [];


    if (cart.length > 0) {

        const categories =
            cart.map(item => {

                const product =
                    products.find(
                        p => p.id === item.id
                    );

                return product?.category;

            });


        recommendations =
            products.filter(
                product =>

                    !cart.some(
                        item =>
                            item.id ===
                            product.id
                    ) &&

                    categories.includes(
                        product.category
                    )
            );

    }


    if (
        recommendations.length === 0
    ) {

        recommendations =
            products.slice(0, 3);

    }


    recommendations =
        recommendations.slice(
            0,
            3
        );


    if (text) {

        text.textContent =
            cart.length > 0

                ? "Based on products in your cart."

                : "Popular products you may like.";

    }


    if (container) {

        container.innerHTML = "";


        recommendations.forEach(
            product => {

                const card =
                    document.createElement(
                        "div"
                    );

                card.className =
                    "recommendation-card";


                card.innerHTML = `

                    <div
                        class="recommendation-icon"
                    >
                        ${product.icon}
                    </div>

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        ${formatPrice(
                            product.price
                        )}
                    </p>

                    <button
                        class="add-btn"
                        onclick="
                            addToCart(
                                '${product.name}'
                            )
                        "
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


    if (side) {

        side.innerHTML = "";


        recommendations
            .slice(0, 2)
            .forEach(product => {

                const div =
                    document.createElement(
                        "div"
                    );

                div.className =
                    "wishlist-item";


                div.innerHTML = `

                    <h3>
                        ${product.icon}
                        ${product.name}
                    </h3>

                    <p>
                        ${formatPrice(
                            product.price
                        )}
                    </p>

                `;


                side.appendChild(
                    div
                );

            });

    }

}


/* =========================================================
   BINARY SEARCH TREE
========================================================= */

class BSTNode {

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
            new BSTNode(value);


        if (!this.root) {

            this.root = node;

            return;

        }


        let current =
            this.root;


        while (true) {

            if (
                value < current.value
            ) {

                if (!current.left) {

                    current.left =
                        node;

                    return;

                }

                current =
                    current.left;

            } else {

                if (!current.right) {

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
                value < current.value
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

        if (!node) return result;


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


/* =========================================================
   CREATE BST
========================================================= */

const priceBST =
    new BinarySearchTree();


products.forEach(
    product => {

        priceBST.insert(
            product.price
        );

    }
);


/* =========================================================
   BST SEARCH
========================================================= */

function searchBST() {

    const input =
        document.getElementById(
            "bstSearchInput"
        );


    const result =
        document.getElementById(
            "bstResult"
        );


    if (!input || !result)
        return;


    const price =
        Number(
            input.value
        );


    if (!price) {

        result.textContent =
            "Please enter a price.";

        return;

    }


    const found =
        priceBST.search(
            price
        );


    if (found) {

        const product =
            products.find(
                p => p.price === price
            );


        result.innerHTML = `
            ✅ Price found in BST.
            <br>
            Product:
            <strong>
                ${product?.name || "Product"}
            </strong>
            <br>
            Price:
            ${formatPrice(price)}
        `;

    } else {

        result.innerHTML = `
            ❌ Price ${formatPrice(
                price
            )}
            was not found in BST.
        `;

    }

}


/* =========================================================
   SHOW BST DATA
========================================================= */

function showBSTData() {

    const result =
        document.getElementById(
            "bstResult"
        );


    if (!result) return;


    const values =
        priceBST.inorder(
            priceBST.root
        );


    result.innerHTML = `

        <strong>
            BST Inorder Traversal:
        </strong>

        <br><br>

        ${values
            .map(
                value =>
                    formatPrice(value)
            )
            .join(" → ")}

    `;

}


/* =========================================================
   CHECKOUT
========================================================= */

function checkout() {

    if (cart.length === 0) {

        showToast(
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
            getCartTotal(),

        status:
            "Confirmed"

    };


    orders.unshift(
        order
    );


    saveOrders();


    cart = [];


    saveCart();


    updateCartUI();

    renderOrders();

    updateRecommendations();

    closeCart();


    showToast(
        `Order ${order.id} placed successfully 🎉`
    );


    document
        .getElementById(
            "orders"
        )
        ?.scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================================
   RENDER ORDERS
========================================================= */

function renderOrders() {

    const container =
        document.getElementById(
            "orderContainer"
        );

    const message =
        document.getElementById(
            "orderMessage"
        );


    if (!container) return;


    if (orders.length === 0) {

        container.innerHTML = `
            <div class="empty-orders">
                No orders yet.
            </div>
        `;

        if (message) {

            message.textContent =
                "Your previous orders will appear here.";

        }

        return;

    }


    if (message) {

        message.textContent =
            `${orders.length} order(s) found.`;

    }


    container.innerHTML = "";


    orders.forEach(order => {

        const card =
            document.createElement(
                "div"
            );

        card.className =
            "order-card";


        let productsHTML = "";


        order.items.forEach(item => {

            productsHTML += `

                <div class="order-product">

                    <span>
                        ${item.name}
                        × ${item.quantity}
                    </span>

                    <strong>
                        ${formatPrice(
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


            <div class="order-products">

                ${productsHTML}

            </div>


            <div class="order-total">

                Total:
                ${formatPrice(
                    order.total
                )}

            </div>

        `;


        container.appendChild(
            card
        );

    });

}


/* =========================================================
   CLEAR ORDERS
========================================================= */

function clearOrderHistory() {

    if (orders.length === 0) {

        showToast(
            "No orders to clear."
        );

        return;

    }


    const confirmDelete =
        confirm(
            "Clear all order history?"
        );


    if (!confirmDelete)
        return;


    orders = [];


    saveOrders();

    renderOrders();


    showToast(
        "Order history cleared."
    );

}


/* =========================================================
   CLOSE MODAL WHEN CLICK OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    function(event) {

        const modal =
            document.getElementById(
                "cartPanel"
            );


        if (
            modal &&
            event.target === modal
        ) {

            closeCart();

        }

    }
);


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCartUI();

        renderWishlist();

        renderOrders();

        updateRecommendations();

        filterByPrice();

        updateWishlistButtons();

    }
);