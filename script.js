/* =========================================================
   TECHNOVA - COMPLETE SCRIPT
========================================================= */


/* ================= DEFAULT PRODUCTS ================= */

const defaultProducts = [

    {
        id: 1,
        name: "Zenith Pro Laptop",
        category: "laptop",
        price: 54990,
        image: "images/laptop.jpg",
        description: "Ultra-performance laptop for study, work and entertainment.",
        rating: 5,
        reviews: 128,
        stock: 10,
        badge: "Best Seller"
    },

    {
        id: 2,
        name: "Nexa 7 Smartphone",
        category: "electronics",
        price: 24999,
        image: "images/smartphone.jpg",
        description: "Next-generation smartphone with powerful performance.",
        rating: 5,
        reviews: 95,
        stock: 15,
        badge: "New"
    },

    {
        id: 3,
        name: "SoundWave Max Headphones",
        category: "audio",
        price: 2999,
        image: "images/headphones.jpg",
        description: "Immersive wireless audio experience.",
        rating: 5,
        reviews: 210,
        stock: 20,
        badge: "Popular"
    },

    {
        id: 4,
        name: "PulseFit Smart Watch",
        category: "wearables",
        price: 4999,
        image: "images/smartwatch.jpg",
        description: "Smart fitness companion for your daily activities.",
        rating: 4,
        reviews: 76,
        stock: 12,
        badge: "Trending"
    },

    {
        id: 5,
        name: "Titan Gaming Mouse",
        category: "gaming",
        price: 1499,
        image: "images/mouse.jpg",
        description: "Precision RGB gaming mouse.",
        rating: 5,
        reviews: 164,
        stock: 25,
        badge: "Gaming"
    },

    {
        id: 6,
        name: "Elite Mechanical Keyboard",
        category: "gaming",
        price: 2499,
        image: "images/keyboard.jpg",
        description: "RGB mechanical keyboard for gaming and productivity.",
        rating: 5,
        reviews: 143,
        stock: 18,
        badge: "Popular"
    },

    {
        id: 7,
        name: "BassBoom Speaker",
        category: "audio",
        price: 2199,
        image: "images/speaker.jpg",
        description: "Portable powerful Bluetooth speaker.",
        rating: 4,
        reviews: 88,
        stock: 17,
        badge: "New"
    },

    {
        id: 8,
        name: "Nova Power Bank 20K",
        category: "power",
        price: 1299,
        image: "images/powerbank.jpg",
        description: "Fast charging 20,000mAh power bank.",
        rating: 4,
        reviews: 112,
        stock: 30,
        badge: "Value Pick"
    }

];


/* ================= STORAGE ================= */

function getStorage(key, fallback) {

    try {

        const data =
            localStorage.getItem(key);

        return data
            ? JSON.parse(data)
            : fallback;

    } catch (error) {

        return fallback;

    }

}


function setStorage(key, value) {

    localStorage.setItem(
        key,
        JSON.stringify(value)
    );

}


/* ================= DATA ================= */

let products =
    getStorage(
        "technovaProducts",
        defaultProducts
    );

let cart =
    getStorage(
        "technovaCart",
        []
    );

let wishlist =
    getStorage(
        "technovaWishlist",
        []
    );

let orders =
    getStorage(
        "technovaOrders",
        []
    );

let users =
    getStorage(
        "technovaUsers",
        []
    );

let currentUser =
    getStorage(
        "technovaCurrentUser",
        null
    );


let selectedCategory = "all";

let selectedPrice = 60000;

let authMode = "login";

let selectedImageData = "";


/* ================= SAVE ================= */

function saveData() {

    setStorage(
        "technovaProducts",
        products
    );

    setStorage(
        "technovaCart",
        cart
    );

    setStorage(
        "technovaWishlist",
        wishlist
    );

    setStorage(
        "technovaOrders",
        orders
    );

    setStorage(
        "technovaUsers",
        users
    );

    setStorage(
        "technovaCurrentUser",
        currentUser
    );

}


/* ================= MONEY ================= */

function money(value) {

    return "₹" +
        Number(value || 0)
            .toLocaleString("en-IN");

}


/* ================= SECURITY ================= */

function escapeHTML(value) {

    return String(value ?? "")
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;")
        .replaceAll("'","&#039;");

}


/* ================= TOAST ================= */

function showToast(message) {

    const toast =
        document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        },2500);

}


/* ================= PRODUCTS ================= */

function renderProducts(list = products) {

    const grid =
        document.getElementById(
            "productsGrid"
        );

    if (!grid) return;

    grid.innerHTML = "";


    if (!list.length) {

        grid.innerHTML = `

            <div style="
                grid-column:1/-1;
                text-align:center;
                padding:40px;
            ">

                <h3>😕 No products found</h3>

                <p>
                    Try another search or category.
                </p>

            </div>

        `;

        updateResultCount(0);

        return;

    }


    list.forEach(product => {

        const card =
            document.createElement("div");

        card.className = "product";


        const stars =
            "★".repeat(
                Number(product.rating || 0)
            );


        const liked =
            wishlist.includes(
                Number(product.id)
            );


        card.innerHTML = `

            ${
                product.badge
                ? `
                    <span class="badge">
                        ${escapeHTML(product.badge)}
                    </span>
                  `
                : ""
            }


            <button
                class="heart ${liked ? "active" : ""}"
                onclick="toggleWishlist(${product.id})">
                ${liked ? "♥" : "♡"}
            </button>


            <div class="image-box">

                <img
                    src="${escapeHTML(product.image)}"
                    alt="${escapeHTML(product.name)}"
                    onerror="
                        this.src='https://via.placeholder.com/300x220?text=TechNova'
                    ">

            </div>


            <h3>
                ${escapeHTML(product.name)}
            </h3>


            <p>
                ${escapeHTML(product.description)}
            </p>


            <div class="rating">

                ${stars}

                <span>
                    (${product.reviews || 0})
                </span>

            </div>


            <h4>
                ${money(product.price)}
            </h4>


            <small class="stock">

                ${
                    Number(product.stock) > 0
                    ? `✓ ${product.stock} In Stock`
                    : "✕ Out of Stock"
                }

            </small>


            <button
                class="details-button"
                onclick="showProductDetails(${product.id})">
                View Details
            </button>


            <button
                class="add-cart"
                onclick="addToCart(${product.id})"
                ${Number(product.stock) <= 0 ? "disabled" : ""}>

                ${
                    Number(product.stock) > 0
                    ? "Add to Cart"
                    : "Out of Stock"
                }

            </button>

        `;


        grid.appendChild(card);

    });


    updateResultCount(list.length);

}


function updateResultCount(count) {

    const element =
        document.getElementById(
            "resultCount"
        );

    if (element) {

        element.textContent =
            `Showing ${count} product${count === 1 ? "" : "s"}`;

    }

}


/* ================= FILTER ================= */

function filterProducts() {

    const search =
        (
            document.getElementById(
                "productSearch"
            )?.value || ""
        )
        .toLowerCase()
        .trim();


    const topSearch =
        (
            document.getElementById(
                "topSearch"
            )?.value || ""
        )
        .toLowerCase()
        .trim();


    const finalSearch =
        search || topSearch;


    const category =
        document.getElementById(
            "categoryFilter"
        )?.value || selectedCategory;


    let result =
        products.filter(product => {

            const searchMatch =
                !finalSearch ||
                product.name
                    .toLowerCase()
                    .includes(finalSearch) ||
                product.description
                    .toLowerCase()
                    .includes(finalSearch);


            const categoryMatch =
                category === "all" ||
                product.category === category;


            const priceMatch =
                Number(product.price) <=
                Number(selectedPrice);


            return (
                searchMatch &&
                categoryMatch &&
                priceMatch
            );

        });


    const sort =
        document.getElementById(
            "sortFilter"
        )?.value || "featured";


    if (sort === "low") {

        result.sort(
            (a,b) =>
                a.price - b.price
        );

    }


    if (sort === "high") {

        result.sort(
            (a,b) =>
                b.price - a.price
        );

    }


    if (sort === "name") {

        result.sort(
            (a,b) =>
                a.name.localeCompare(b.name)
        );

    }


    renderProducts(result);

}


/* ================= CATEGORY ================= */

function setupCategoryButtons() {

    document
        .querySelectorAll(".category")
        .forEach(button => {

            button.addEventListener(
                "click",
                function() {

                    selectedCategory =
                        this.dataset.category;


                    const select =
                        document.getElementById(
                            "categoryFilter"
                        );


                    if (select) {

                        select.value =
                            selectedCategory;

                    }


                    document
                        .querySelectorAll(".category")
                        .forEach(item =>
                            item.classList.remove("active")
                        );


                    this.classList.add("active");

                    filterProducts();

                }
            );

        });

}


/* ================= CART ================= */

function addToCart(id) {

    id = Number(id);


    const product =
        products.find(
            p => Number(p.id) === id
        );


    if (!product) return;


    if (Number(product.stock) <= 0) {

        showToast("Out of stock ❌");

        return;

    }


    const existing =
        cart.find(
            p => Number(p.id) === id
        );


    if (existing) {

        if (
            existing.quantity >=
            Number(product.stock)
        ) {

            showToast(
                "Maximum stock reached ❌"
            );

            return;

        }

        existing.quantity++;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: Number(product.price),

            image: product.image,

            quantity: 1

        });

    }


    saveData();

    updateCart();

    updateRecommendations();

    showToast(
        `${product.name} added to cart 🛒`
    );

}


function updateCart() {

    const count =
        cart.reduce(
            (sum,item) =>
                sum + Number(item.quantity),
            0
        );


    const countElement =
        document.getElementById(
            "cartCount"
        );


    if (countElement) {

        countElement.textContent =
            count;

    }


    renderCart();

}


function renderCart() {

    const container =
        document.getElementById(
            "cartItems"
        );


    if (!container) return;


    container.innerHTML = "";


    if (!cart.length) {

        container.innerHTML = `

            <div class="empty-cart">

                🛒

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add some products.
                </p>

            </div>

        `;

    } else {

        cart.forEach(item => {

            const div =
                document.createElement("div");

            div.className = "cart-item";


            div.innerHTML = `

                <h3>
                    ${escapeHTML(item.name)}
                </h3>

                <p>
                    ${money(item.price)}
                </p>


                <div class="quantity">

                    <button
                        onclick="
                            changeQuantity(${item.id},-1)
                        ">
                        −
                    </button>

                    <strong>
                        ${item.quantity}
                    </strong>

                    <button
                        onclick="
                            changeQuantity(${item.id},1)
                        ">
                        +
                    </button>

                </div>


                <button
                    class="remove"
                    onclick="
                        removeFromCart(${item.id})
                    ">
                    Remove
                </button>

            `;


            container.appendChild(div);

        });

    }


    const total =
        cart.reduce(
            (sum,item) =>
                sum +
                Number(item.price) *
                Number(item.quantity),
            0
        );


    const totalElement =
        document.getElementById(
            "cartTotal"
        );


    if (totalElement) {

        totalElement.textContent =
            money(total);

    }


    renderCheckoutItems();

}


function changeQuantity(id,amount) {

    const item =
        cart.find(
            p =>
                Number(p.id) === Number(id)
        );


    const product =
        products.find(
            p =>
                Number(p.id) === Number(id)
        );


    if (!item || !product) return;


    const quantity =
        Number(item.quantity) +
        Number(amount);


    if (quantity <= 0) {

        removeFromCart(id);

        return;

    }


    if (
        quantity >
        Number(product.stock)
    ) {

        showToast(
            "Stock limit reached ❌"
        );

        return;

    }


    item.quantity =
        quantity;


    saveData();

    updateCart();

}


function removeFromCart(id) {

    cart =
        cart.filter(
            item =>
                Number(item.id) !==
                Number(id)
        );


    saveData();

    updateCart();

    updateRecommendations();

    showToast(
        "Product removed"
    );

}


function openCart() {

    document
        .getElementById("cartModal")
        ?.classList.add("show");

}


function closeCart() {

    document
        .getElementById("cartModal")
        ?.classList.remove("show");

}


/* ================= WISHLIST ================= */

function toggleWishlist(id) {

    id = Number(id);


    const index =
        wishlist.indexOf(id);


    if (index === -1) {

        wishlist.push(id);

        showToast(
            "Added to wishlist ❤️"
        );

    } else {

        wishlist.splice(index,1);

        showToast(
            "Removed from wishlist"
        );

    }


    saveData();

    renderProducts();

    renderWishlist();

}


function renderWishlist() {

    const container =
        document.getElementById(
            "wishlistContainer"
        );


    const count =
        document.getElementById(
            "wishlistCount"
        );


    if (!container) return;


    const items =
        products.filter(
            p =>
                wishlist.includes(
                    Number(p.id)
                )
        );


    if (count) {

        count.textContent =
            `${items.length} ITEM${items.length === 1 ? "" : "S"}`;

    }


    container.innerHTML = "";


    if (!items.length) {

        container.innerHTML = `

            <div style="
                grid-column:1/-1;
                text-align:center;
                padding:30px;
            ">

                ❤️

                <h3>
                    Wishlist is empty
                </h3>

            </div>

        `;

        return;

    }


    items.forEach(product => {

        const card =
            document.createElement("div");

        card.className =
            "wishlist-card";


        card.innerHTML = `

            <div class="icon">❤️</div>

            <h3>
                ${escapeHTML(product.name)}
            </h3>

            <p>
                ${money(product.price)}
            </p>

            <button
                onclick="addToCart(${product.id})">
                Add to Cart
            </button>

            <button
                onclick="
                    toggleWishlist(${product.id})
                ">
                Remove
            </button>

        `;


        container.appendChild(card);

    });

}


/* ================= PRODUCT DETAILS ================= */

function showProductDetails(id) {

    const product =
        products.find(
            p =>
                Number(p.id) ===
                Number(id)
        );


    if (!product) return;


    const modal =
        document.getElementById(
            "productDetailsModal"
        );


    const content =
        document.getElementById(
            "productDetailsContent"
        );


    const stars =
        "★".repeat(
            Number(product.rating || 0)
        );


    content.innerHTML = `

        <div class="details-image">

            <img
                src="${escapeHTML(product.image)}"
                alt="${escapeHTML(product.name)}">

        </div>


        <div class="details-info">

            <h2>
                ${escapeHTML(product.name)}
            </h2>

            <div>
                ${stars}
                (${product.reviews || 0})
            </div>

            <div class="details-price">
                ${money(product.price)}
            </div>

            <p class="details-description">
                ${escapeHTML(product.description)}
            </p>

            <p>
                ✓ Premium Quality
                <br>
                ✓ 1 Year Warranty
                <br>
                ✓ Easy Returns
            </p>

            <br>

            <button
                class="details-add-cart"
                onclick="
                    addToCart(${product.id});
                    closeProductDetails();
                "
                ${product.stock <= 0 ? "disabled" : ""}>

                ${
                    product.stock > 0
                    ? "🛒 Add to Cart"
                    : "Out of Stock"
                }

            </button>

        </div>

    `;


    modal.classList.add("show");

}


function closeProductDetails() {

    document
        .getElementById(
            "productDetailsModal"
        )
        ?.classList.remove("show");

}


/* ================= CHECKOUT ================= */

function openCheckout() {

    if (!cart.length) {

        showToast(
            "Cart is empty ❌"
        );

        return;

    }


    renderCheckoutItems();

    document
        .getElementById(
            "checkoutModal"
        )
        ?.classList.add("show");

}


function closeCheckout() {

    document
        .getElementById(
            "checkoutModal"
        )
        ?.classList.remove("show");

}


function renderCheckoutItems() {

    const container =
        document.getElementById(
            "checkoutItems"
        );


    const totalElement =
        document.getElementById(
            "checkoutTotal"
        );


    if (!container) return;


    container.innerHTML = "";


    let total = 0;


    cart.forEach(item => {

        const subtotal =
            Number(item.price) *
            Number(item.quantity);


        total += subtotal;


        const div =
            document.createElement("div");

        div.className =
            "checkout-item";


        div.innerHTML = `

            <span>
                ${escapeHTML(item.name)}
                × ${item.quantity}
            </span>

            <strong>
                ${money(subtotal)}
            </strong>

        `;


        container.appendChild(div);

    });


    if (totalElement) {

        totalElement.textContent =
            money(total);

    }

}


/* ================= PLACE ORDER ================= */

function placeOrder() {

    if (!cart.length) return;


    const name =
        document.getElementById(
            "checkoutName"
        ).value.trim();


    const phone =
        document.getElementById(
            "checkoutPhone"
        ).value.trim();


    const address =
        document.getElementById(
            "checkoutAddress"
        ).value.trim();


    const city =
        document.getElementById(
            "checkoutCity"
        ).value.trim();


    const pincode =
        document.getElementById(
            "checkoutPincode"
        ).value.trim();


    if (
        !name ||
        !phone ||
        !address ||
        !city ||
        !pincode
    ) {

        showToast(
            "Fill all delivery details ❌"
        );

        return;

    }


    if (!/^[0-9]{10}$/.test(phone)) {

        showToast(
            "Enter valid mobile number ❌"
        );

        return;

    }


    if (!/^[0-9]{6}$/.test(pincode)) {

        showToast(
            "Enter valid PIN code ❌"
        );

        return;

    }


    const payment =
        document.querySelector(
            'input[name="payment"]:checked'
        )?.value || "cod";


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
                .slice(-8),

        date:
            new Date()
                .toLocaleString("en-IN"),

        customer: {
            name,
            phone,
            address,
            city,
            pincode
        },

        payment,

        items:
            JSON.parse(
                JSON.stringify(cart)
            ),

        total,

        status:
            "Confirmed"

    };


    cart.forEach(item => {

        const product =
            products.find(
                p =>
                    Number(p.id) ===
                    Number(item.id)
            );


        if (product) {

            product.stock -=
                Number(item.quantity);

        }

    });


    orders.unshift(order);

    cart = [];


    saveData();

    updateCart();

    renderProducts();

    renderOrders();

    renderLowStockProducts();

    renderRecentOrders();

    updateAdminStats();


    closeCheckout();

    closeCart();


    showToast(
        `Order ${order.id} placed 🎉`
    );

}


/* ================= ORDERS ================= */

function renderOrders() {

    const container =
        document.getElementById(
            "ordersContainer"
        );


    if (!container) return;


    container.innerHTML = "";


    if (!orders.length) {

        container.innerHTML = `

            <div style="
                text-align:center;
                padding:30px;
            ">

                📦

                <h3>
                    No orders yet
                </h3>

            </div>

        `;

        return;

    }


    orders.forEach(order => {

        const div =
            document.createElement("div");

        div.className =
            "order-card";


        const items =
            order.items
                .map(item => `

                    <div class="order-item">

                        <span>
                            ${escapeHTML(item.name)}
                            × ${item.quantity}
                        </span>

                        <strong>
                            ${money(
                                item.price *
                                item.quantity
                            )}
                        </strong>

                    </div>

                `)
                .join("");


        div.innerHTML = `

            <div class="order-top">

                <div>

                    <b>
                        Order #${escapeHTML(order.id)}
                    </b>

                    <p>
                        ${escapeHTML(order.date)}
                    </p>

                </div>

                <span class="order-status">
                    ${escapeHTML(order.status)}
                </span>

            </div>

            ${items}

            <div class="order-total">

                Total:
                ${money(order.total)}

            </div>

        `;


        container.appendChild(div);

    });

}


function clearOrders() {

    if (!confirm(
        "Clear all orders?"
    )) return;


    orders = [];

    saveData();

    renderOrders();

    renderRecentOrders();

    updateAdminStats();

    showToast(
        "Orders cleared"
    );

}


/* ================= AUTH ================= */

function openAuth() {

    document
        .getElementById("authModal")
        ?.classList.add("show");

    updateAuthUI();

}


function closeAuth() {

    document
        .getElementById("authModal")
        ?.classList.remove("show");

}


function toggleAuthMode() {

    authMode =
        authMode === "login"
        ? "register"
        : "login";

    updateAuthUI();

}


function updateAuthUI() {

    const name =
        document.getElementById(
            "authName"
        );

    const title =
        document.getElementById(
            "authTitle"
        );

    const submit =
        document.getElementById(
            "authSubmit"
        );

    const toggle =
        document.getElementById(
            "authToggle"
        );


    if (authMode === "login") {

        title.textContent =
            "Welcome to TechNova 👋";

        name.style.display =
            "none";

        submit.textContent =
            "Login";

        toggle.textContent =
            "Create Account";

    } else {

        title.textContent =
            "Create TechNova Account 🚀";

        name.style.display =
            "block";

        submit.textContent =
            "Create Account";

        toggle.textContent =
            "Login";

    }

}


function handleAuthSubmit() {

    const name =
        document.getElementById(
            "authName"
        ).value.trim();


    const email =
        document.getElementById(
            "authEmail"
        ).value.trim()
        .toLowerCase();


    const password =
        document.getElementById(
            "authPassword"
        ).value;


    if (!email || !password) {

        showToast(
            "Enter email and password ❌"
        );

        return;

    }


    if (authMode === "register") {

        if (!name) {

            showToast(
                "Enter your name ❌"
            );

            return;

        }


        if (
            users.some(
                user =>
                    user.email === email
            )
        ) {

            showToast(
                "Email already exists ❌"
            );

            return;

        }


        users.push({

            id: Date.now(),

            name,
            email,
            password

        });


        currentUser = {
            name,
            email
        };


        saveData();

        closeAuth();

        updateLoginButton();

        updateAdminStats();

        showToast(
            "Account created 🎉"
        );

        return;

    }


    const user =
        users.find(
            user =>
                user.email === email &&
                user.password === password
        );


    if (!user) {

        showToast(
            "Invalid login ❌"
        );

        return;

    }


    currentUser = {

        name: user.name,

        email: user.email

    };


    saveData();

    closeAuth();

    updateLoginButton();

    showToast(
        `Welcome ${user.name} 👋`
    );

}


function updateLoginButton() {

    const button =
        document.querySelector(
            ".login-button"
        );


    if (!button) return;


    button.textContent =
        currentUser
        ? `👤 ${currentUser.name}`
        : "👤 Login";

}


/* ================= RECOMMENDATIONS ================= */

function updateRecommendations() {

    const container =
        document.getElementById(
            "recommendations"
        );


    if (!container) return;


    const list =
        products
            .filter(
                p =>
                    !cart.some(
                        item =>
                            Number(item.id) ===
                            Number(p.id)
                    )
            )
            .slice(0,3);


    container.innerHTML = "";


    list.forEach(product => {

        const card =
            document.createElement("div");

        card.className =
            "recommend-card";


        card.innerHTML = `

            <div class="icon">
                ⚡
            </div>

            <h3>
                ${escapeHTML(product.name)}
            </h3>

            <p>
                ${money(product.price)}
            </p>

            <button
                onclick="addToCart(${product.id})">
                Add to Cart
            </button>

        `;


        container.appendChild(card);

    });

}


/* ================= BST ================= */

class BSTNode {

    constructor(product) {

        this.product = product;

        this.left = null;

        this.right = null;

    }

}


class ProductBST {

    constructor() {

        this.root = null;

    }


    insert(product) {

        const node =
            new BSTNode(product);


        if (!this.root) {

            this.root = node;

            return;

        }


        let current =
            this.root;


        while (true) {

            if (
                product.price <
                current.product.price
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


    search(price) {

        let current =
            this.root;


        while (current) {

            if (
                price ===
                current.product.price
            ) {

                return current.product;

            }


            current =
                price <
                current.product.price
                ? current.left
                : current.right;

        }


        return null;

    }

}


function searchBST() {

    const price =
        Number(
            document.getElementById(
                "bstInput"
            ).value
        );


    const result =
        document.getElementById(
            "bstResult"
        );


    if (!price) {

        result.textContent =
            "Enter a valid price.";

        return;

    }


    const bst =
        new ProductBST();


    products.forEach(
        product =>
            bst.insert(product)
    );


    const found =
        bst.search(price);


    result.innerHTML =
        found
        ? `
            ✅ Found:
            <b>
                ${escapeHTML(found.name)}
            </b>
            — ${money(found.price)}
          `
        : "❌ Product not found.";

}


function showBST() {

    const result =
        document.getElementById(
            "bstResult"
        );


    const sorted =
        [...products]
            .sort(
                (a,b) =>
                    a.price - b.price
            );


    result.innerHTML = `

        <b>BST In-Order:</b>

        <br><br>

        ${
            sorted
                .map(
                    p =>
                        `${escapeHTML(p.name)}
                        (${money(p.price)})`
                )
                .join(" → ")
        }

    `;

}


/* ================= ADMIN ================= */

const ADMIN_USERNAME =
    "admin";

const ADMIN_PASSWORD =
    "admin123";


let adminLoggedIn =
    sessionStorage.getItem(
        "technovaAdmin"
    ) === "true";


function openAdminLogin() {

    if (adminLoggedIn) {

        showAdminDashboard();

        return;

    }


    document
        .getElementById(
            "adminLoginModal"
        )
        ?.classList.add("show");

}


function closeAdminLogin() {

    document
        .getElementById(
            "adminLoginModal"
        )
        ?.classList.remove("show");

}


function adminLogin() {

    const username =
        document.getElementById(
            "adminUsername"
        ).value.trim();


    const password =
        document.getElementById(
            "adminPassword"
        ).value;


    if (
        username === ADMIN_USERNAME &&
        password === ADMIN_PASSWORD
    ) {

        adminLoggedIn = true;

        sessionStorage.setItem(
            "technovaAdmin",
            "true"
        );


        closeAdminLogin();

        showAdminDashboard();

        showToast(
            "Admin login successful ⚙️"
        );

    } else {

        showToast(
            "Invalid admin credentials ❌"
        );

    }

}


function showAdminDashboard() {

    const dashboard =
        document.getElementById(
            "adminDashboard"
        );


    dashboard.classList.add("show");


    updateAdminStats();

    renderAdminProducts();

    renderLowStockProducts();

    renderRecentOrders();


    dashboard.scrollIntoView({
        behavior: "smooth"
    });

}


function adminLogout() {

    adminLoggedIn = false;

    sessionStorage.removeItem(
        "technovaAdmin"
    );


    document
        .getElementById(
            "adminDashboard"
        )
        ?.classList.remove("show");


    showToast(
        "Admin logged out 👋"
    );

}


/* ================= ADMIN STATS ================= */

function updateAdminStats() {

    const productCount =
        document.getElementById(
            "adminProductCount"
        );

    const orderCount =
        document.getElementById(
            "adminOrderCount"
        );

    const userCount =
        document.getElementById(
            "adminUserCount"
        );

    const sales =
        document.getElementById(
            "adminSales"
        );


    if (productCount)
        productCount.textContent =
            products.length;


    if (orderCount)
        orderCount.textContent =
            orders.length;


    if (userCount)
        userCount.textContent =
            users.length;


    const total =
        orders.reduce(
            (sum,order) =>
                sum +
                Number(order.total || 0),
            0
        );


    if (sales)
        sales.textContent =
            money(total);

}


/* ================= ADMIN PRODUCTS ================= */

function renderAdminProducts() {

    const table =
        document.getElementById(
            "adminProductTable"
        );


    if (!table) return;


    table.innerHTML = "";


    products.forEach(product => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${product.id}
            </td>

            <td>
                <b>
                    ${escapeHTML(product.name)}
                </b>
            </td>

            <td>
                ${escapeHTML(product.category)}
            </td>

            <td>
                ${money(product.price)}
            </td>

            <td>

                <div class="stock-controls">

                    <button
                        onclick="
                            changeStock(
                                ${product.id},
                                -1
                            )
                        ">
                        −
                    </button>

                    <span class="stock-number">
                        ${product.stock}
                    </span>

                    <button
                        onclick="
                            changeStock(
                                ${product.id},
                                1
                            )
                        ">
                        +
                    </button>

                </div>

            </td>

            <td>

                <button
                    class="admin-action edit-action"
                    onclick="
                        editProduct(${product.id})
                    ">
                    ✏️ Edit
                </button>

                <button
                    class="admin-action delete-action"
                    onclick="
                        deleteProduct(${product.id})
                    ">
                    🗑️ Delete
                </button>

            </td>

        `;


        table.appendChild(row);

    });

}


/* ================= STOCK ================= */

function changeStock(id,amount) {

    const product =
        products.find(
            p =>
                Number(p.id) ===
                Number(id)
        );


    if (!product) return;


    const stock =
        Number(product.stock) +
        Number(amount);


    if (stock < 0) {

        showToast(
            "Stock cannot be negative ❌"
        );

        return;

    }


    product.stock =
        stock;


    saveData();

    renderProducts();

    renderAdminProducts();

    renderLowStockProducts();

    showToast(
        "Stock updated 📦"
    );

}


/* ================= LOW STOCK ================= */

function renderLowStockProducts() {

    const container =
        document.getElementById(
            "lowStockList"
        );


    if (!container) return;


    const low =
        products.filter(
            p =>
                Number(p.stock) <= 5
        );


    if (!low.length) {

        container.innerHTML = `

            <div class="low-stock-item">
                ✅ All products have sufficient stock.
            </div>

        `;

        return;

    }


    container.innerHTML = "";


    low.forEach(product => {

        const div =
            document.createElement("div");


        div.className =
            Number(product.stock) === 0
            ? "low-stock-item out-stock"
            : "low-stock-item";


        div.innerHTML = `

            <b>
                ${escapeHTML(product.name)}
            </b>

            <br>

            ${
                Number(product.stock) === 0
                ? "❌ Out of Stock"
                : `⚠️ Only ${product.stock} left`
            }

        `;


        container.appendChild(div);

    });

}


/* ================= RECENT ORDERS ================= */

function renderRecentOrders() {

    const container =
        document.getElementById(
            "recentOrdersList"
        );


    if (!container) return;


    if (!orders.length) {

        container.innerHTML = `

            <div class="recent-order-item">
                📦 No orders yet.
            </div>

        `;

        return;

    }


    container.innerHTML = "";


    orders
        .slice(0,5)
        .forEach(order => {

            const div =
                document.createElement("div");


            div.className =
                "recent-order-item";


            div.innerHTML = `

                <b>
                    #${escapeHTML(order.id)}
                </b>

                <br>

                ${
                    escapeHTML(
                        order.customer?.name ||
                        "Customer"
                    )
                }

                <br>

                <strong>
                    ${money(order.total)}
                </strong>

                <br>

                <small>
                    ${escapeHTML(order.date)}
                </small>

            `;


            container.appendChild(div);

        });

}


/* ================= PRODUCT FORM ================= */

function getNextProductId() {

    if (!products.length)
        return 1;


    return (
        Math.max(
            ...products.map(
                p => Number(p.id)
            )
        ) + 1
    );

}


function openAddProduct() {

    const modal =
        document.getElementById(
            "productFormModal"
        );


    const form =
        document.getElementById(
            "productForm"
        );


    form.reset();


    document.getElementById(
        "editProductId"
    ).value = "";


    document.getElementById(
        "productFormTitle"
    ).textContent =
        "➕ Add New Product";


    selectedImageData = "";


    resetImagePreview();


    modal.classList.add("show");

}


function editProduct(id) {

    const product =
        products.find(
            p =>
                Number(p.id) ===
                Number(id)
        );


    if (!product) return;


    document.getElementById(
        "productFormTitle"
    ).textContent =
        "✏️ Edit Product";


    document.getElementById(
        "editProductId"
    ).value =
        product.id;


    document.getElementById(
        "productName"
    ).value =
        product.name;


    document.getElementById(
        "productCategory"
    ).value =
        product.category;


    document.getElementById(
        "productPrice"
    ).value =
        product.price;


    document.getElementById(
        "productStock"
    ).value =
        product.stock;


    document.getElementById(
        "productImage"
    ).value =
        product.image || "";


    document.getElementById(
        "productDescription"
    ).value =
        product.description || "";


    document.getElementById(
        "productBadge"
    ).value =
        product.badge || "";


    selectedImageData =
        product.image || "";


    showImagePreview(
        product.image
    );


    document
        .getElementById(
            "productFormModal"
        )
        .classList.add("show");

}


function closeProductForm() {

    document
        .getElementById(
            "productFormModal"
        )
        ?.classList.remove("show");

}


/* ================= IMAGE PREVIEW ================= */

function showImagePreview(src) {

    const image =
        document.getElementById(
            "productImagePreview"
        );


    const text =
        document.getElementById(
            "previewText"
        );


    if (!src) {

        resetImagePreview();

        return;

    }


    image.src = src;

    image.style.display =
        "block";

    text.style.display =
        "none";

}


function resetImagePreview() {

    const image =
        document.getElementById(
            "productImagePreview"
        );


    const text =
        document.getElementById(
            "previewText"
        );


    image.src = "";

    image.style.display =
        "none";

    text.style.display =
        "block";

}


function handleImageUpload(event) {

    const file =
        event.target.files[0];


    if (!file) return;


    if (!file.type.startsWith("image/")) {

        showToast(
            "Please select an image ❌"
        );

        return;

    }


    const reader =
        new FileReader();


    reader.onload =
        function() {

            selectedImageData =
                reader.result;

            showImagePreview(
                selectedImageData
            );

        };


    reader.readAsDataURL(file);

}


/* ================= SAVE PRODUCT FORM ================= */

function saveProductFromForm(event) {

    event.preventDefault();


    const editId =
        Number(
            document.getElementById(
                "editProductId"
            ).value
        );


    const name =
        document.getElementById(
            "productName"
        ).value.trim();


    const category =
        document.getElementById(
            "productCategory"
        ).value;


    const price =
        Number(
            document.getElementById(
                "productPrice"
            ).value
        );


    const stock =
        Number(
            document.getElementById(
                "productStock"
            ).value
        );


    const imagePath =
        document.getElementById(
            "productImage"
        ).value.trim();


    const description =
        document.getElementById(
            "productDescription"
        ).value.trim();


    const badge =
        document.getElementById(
            "productBadge"
        ).value;


    if (
        !name ||
        !category ||
        !price ||
        price <= 0 ||
        stock < 0 ||
        !description
    ) {

        showToast(
            "Please fill all required fields ❌"
        );

        return;

    }


    const image =
        selectedImageData ||
        imagePath ||
        "images/laptop.jpg";


    /* EDIT */

    if (editId) {

        const product =
            products.find(
                p =>
                    Number(p.id) ===
                    editId
            );


        if (!product) return;


        product.name =
            name;

        product.category =
            category;

        product.price =
            price;

        product.stock =
            stock;

        product.image =
            image;

        product.description =
            description;

        product.badge =
            badge;


        showToast(
            "Product updated ✏️"
        );

    }


    /* ADD */

    else {

        products.push({

            id:
                getNextProductId(),

            name,
            category,
            price,
            stock,
            image,
            description,

            rating: 5,

            reviews: 0,

            badge

        });


        showToast(
            "Product added 🎉"
        );

    }


    saveData();

    renderProducts();

    renderAdminProducts();

    renderLowStockProducts();

    updateRecommendations();

    updateAdminStats();

    closeProductForm();

}


/* ================= DELETE ================= */

function deleteProduct(id) {

    const product =
        products.find(
            p =>
                Number(p.id) ===
                Number(id)
        );


    if (!product) return;


    if (
        !confirm(
            `Delete "${product.name}"?`
        )
    ) return;


    products =
        products.filter(
            p =>
                Number(p.id) !==
                Number(id)
        );


    cart =
        cart.filter(
            p =>
                Number(p.id) !==
                Number(id)
        );


    wishlist =
        wishlist.filter(
            p =>
                Number(p) !==
                Number(id)
        );


    saveData();

    renderProducts();

    updateCart();

    renderWishlist();

    renderAdminProducts();

    renderLowStockProducts();

    updateRecommendations();

    updateAdminStats();


    showToast(
        "Product deleted 🗑️"
    );

}


/* ================= DARK MODE ================= */

function loadTheme() {

    const theme =
        localStorage.getItem(
            "technovaTheme"
        );


    const button =
        document.getElementById(
            "themeToggle"
        );


    if (theme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );

        if (button)
            button.textContent =
                "☀️";

    } else {

        document.body.classList.remove(
            "dark-mode"
        );

        if (button)
            button.textContent =
                "🌙";

    }

}


function toggleTheme() {

    const dark =
        document.body.classList.toggle(
            "dark-mode"
        );


    localStorage.setItem(
        "technovaTheme",
        dark ? "dark" : "light"
    );


    const button =
        document.getElementById(
            "themeToggle"
        );


    if (button) {

        button.textContent =
            dark ? "☀️" : "🌙";

    }


    showToast(
        dark
        ? "Dark Mode ON 🌙"
        : "Light Mode ON ☀️"
    );

}


/* ================= UTILITY ================= */

function goProducts() {

    document
        .getElementById("products")
        ?.scrollIntoView({
            behavior:"smooth"
        });

}


/* ================= INITIALIZE ================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {


        renderProducts();

        updateCart();

        renderWishlist();

        renderOrders();

        updateRecommendations();

        updateLoginButton();

        setupCategoryButtons();

        loadTheme();


        /* SEARCH */

        document
            .getElementById(
                "productSearch"
            )
            ?.addEventListener(
                "input",
                filterProducts
            );


        document
            .getElementById(
                "topSearch"
            )
            ?.addEventListener(
                "input",
                function() {

                    const search =
                        document.getElementById(
                            "productSearch"
                        );


                    if (search)
                        search.value =
                            this.value;


                    filterProducts();

                }
            );


        /* SORT */

        document
            .getElementById(
                "sortFilter"
            )
            ?.addEventListener(
                "change",
                filterProducts
            );


        /* CATEGORY */

        document
            .getElementById(
                "categoryFilter"
            )
            ?.addEventListener(
                "change",
                function() {

                    selectedCategory =
                        this.value;

                    filterProducts();

                }
            );


        /* PRICE */

        document
            .getElementById(
                "priceFilter"
            )
            ?.addEventListener(
                "input",
                function() {

                    selectedPrice =
                        Number(this.value);


                    const value =
                        document.getElementById(
                            "priceValue"
                        );


                    if (value)
                        value.textContent =
                            `Up to ${money(
                                selectedPrice
                            )}`;

                }
            );


        document
            .getElementById(
                "applyPrice"
            )
            ?.addEventListener(
                "click",
                filterProducts
            );


        /* CART */

        document
            .getElementById(
                "closeCart"
            )
            ?.addEventListener(
                "click",
                closeCart
            );


        document
            .getElementById(
                "checkout"
            )
            ?.addEventListener(
                "click",
                openCheckout
            );


        /* CHECKOUT */

        document
            .getElementById(
                "placeOrder"
            )
            ?.addEventListener(
                "click",
                placeOrder
            );


        /* ORDERS */

        document
            .getElementById(
                "clearOrders"
            )
            ?.addEventListener(
                "click",
                clearOrders
            );


        /* LOGIN */

        document
            .querySelector(
                ".login-button"
            )
            ?.addEventListener(
                "click",
                openAuth
            );


        document
            .getElementById(
                "authSubmit"
            )
            ?.addEventListener(
                "click",
                handleAuthSubmit
            );


        /* BST */

        document
            .getElementById(
                "bstSearch"
            )
            ?.addEventListener(
                "click",
                searchBST
            );


        document
            .getElementById(
                "bstShow"
            )
            ?.addEventListener(
                "click",
                showBST
            );


        /* PRODUCT FORM */

        document
            .getElementById(
                "productForm"
            )
            ?.addEventListener(
                "submit",
                saveProductFromForm
            );


        document
            .getElementById(
                "productImageFile"
            )
            ?.addEventListener(
                "change",
                handleImageUpload
            );


        document
            .getElementById(
                "productImage"
            )
            ?.addEventListener(
                "input",
                function() {

                    if (!selectedImageData) {

                        showImagePreview(
                            this.value
                        );

                    }

                }
            );


        /* MODAL OUTSIDE CLICK */

        document
            .querySelectorAll(".modal")
            .forEach(modal => {

                modal.addEventListener(
                    "click",
                    function(event) {

                        if (
                            event.target ===
                            this
                        ) {

                            this.classList.remove(
                                "show"
                            );

                        }

                    }
                );

            });


        /* ADMIN SESSION */

        if (
            sessionStorage.getItem(
                "technovaAdmin"
            ) === "true"
        ) {

            adminLoggedIn = true;

        }

    }
);


/* ================= ESC KEY ================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeCart();

            closeCheckout();

            closeProductDetails();

            closeAuth();

            closeAdminLogin();

            closeProductForm();

        }

    }
);