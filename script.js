/* =========================================================
   TECHNOVA - FINAL LATEST JAVASCRIPT
========================================================= */


/* PRODUCTS */

const products = [

    {
        id: 1,
        name: "Zenith Pro Laptop",
        price: 54990,
        category: "laptop",
        image: "images/laptop.jpg",
        rating: "★★★★★",
        reviews: 128,
        badge: "Best Seller",
        description:
            "A powerful performance laptop designed for students, professionals and creators.",
        specs: [
            "Intel Core i7 Processor",
            "16GB RAM",
            "512GB SSD",
            "15.6-inch Full HD Display",
            "Windows 11"
        ]
    },

    {
        id: 2,
        name: "Nexa 7 Smartphone",
        price: 24999,
        category: "electronics",
        image: "images/smartphone.jpg",
        rating: "★★★★★",
        reviews: 95,
        badge: "New",
        description:
            "A modern smartphone with a powerful processor, excellent camera and long battery life.",
        specs: [
            "6.6-inch AMOLED Display",
            "8GB RAM",
            "128GB Storage",
            "50MP Camera",
            "5000mAh Battery"
        ]
    },

    {
        id: 3,
        name: "SoundWave Max Headphones",
        price: 2999,
        category: "audio",
        image: "images/headphones.jpg",
        rating: "★★★★★",
        reviews: 210,
        badge: "Popular",
        description:
            "Wireless headphones delivering immersive sound with comfortable all-day listening.",
        specs: [
            "Active Noise Cancellation",
            "Bluetooth 5.3",
            "40 Hours Battery",
            "Fast Charging",
            "Built-in Microphone"
        ]
    },

    {
        id: 4,
        name: "PulseFit Smart Watch",
        price: 4999,
        category: "wearables",
        image: "images/smartwatch.jpg",
        rating: "★★★★☆",
        reviews: 76,
        badge: "Trending",
        description:
            "A smart fitness companion for tracking your health, activity and daily performance.",
        specs: [
            "1.9-inch AMOLED Display",
            "Heart Rate Monitor",
            "SpO2 Tracking",
            "7 Days Battery",
            "IP68 Water Resistant"
        ]
    },

    {
        id: 5,
        name: "Titan Gaming Mouse",
        price: 1499,
        category: "gaming",
        image: "images/mouse.jpg",
        rating: "★★★★★",
        reviews: 164,
        badge: "Gaming",
        description:
            "Precision gaming mouse with responsive controls and customizable RGB lighting.",
        specs: [
            "16000 DPI Sensor",
            "RGB Lighting",
            "6 Programmable Buttons",
            "Ergonomic Design",
            "USB Connection"
        ]
    },

    {
        id: 6,
        name: "Elite Mechanical Keyboard",
        price: 2499,
        category: "gaming",
        image: "images/keyboard.jpg",
        rating: "★★★★★",
        reviews: 143,
        badge: "Popular",
        description:
            "A premium mechanical keyboard designed for gaming, coding and productivity.",
        specs: [
            "Mechanical Blue Switches",
            "RGB Backlight",
            "Anti-Ghosting",
            "USB Type-C",
            "Durable Keycaps"
        ]
    },

    {
        id: 7,
        name: "BassBoom Speaker",
        price: 2199,
        category: "audio",
        image: "images/speaker.jpg",
        rating: "★★★★☆",
        reviews: 88,
        badge: "New",
        description:
            "Portable Bluetooth speaker with powerful bass and clear sound.",
        specs: [
            "20W Output",
            "Bluetooth 5.2",
            "12 Hours Battery",
            "USB-C Charging",
            "Water Resistant"
        ]
    },

    {
        id: 8,
        name: "Nova Power Bank 20K",
        price: 1299,
        category: "power",
        image: "images/powerbank.jpg",
        rating: "★★★★☆",
        reviews: 112,
        badge: "Value Pick",
        description:
            "High-capacity power bank with fast charging support.",
        specs: [
            "20000mAh Capacity",
            "22.5W Fast Charging",
            "Dual USB Output",
            "USB-C Input",
            "LED Battery Indicator"
        ]
    }

];


/* STORAGE */

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

let users =
    JSON.parse(
        localStorage.getItem("technovaUsers")
    ) || [];

let currentUser =
    JSON.parse(
        localStorage.getItem("technovaCurrentUser")
    ) || null;

let authMode = "login";


/* HELPERS */

function money(value) {

    return "₹" +
        Number(value).toLocaleString("en-IN");

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

    localStorage.setItem(
        "technovaUsers",
        JSON.stringify(users)
    );

}


function showToast(message) {

    const toast =
        document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);

}


/* =========================================================
   CART
========================================================= */

function addToCart(id) {

    id = Number(id);

    const product =
        products.find(
            p => p.id === id
        );

    if (!product) return;

    const existing =
        cart.find(
            item => item.id === id
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

    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    const countElement =
        document.getElementById("cartCount");

    if (countElement) {
        countElement.textContent = count;
    }


    const container =
        document.getElementById("cartItems");

    if (!container) return;


    if (cart.length === 0) {

        container.innerHTML = `
            <div class="empty-cart">
                🛒 Your cart is empty.
            </div>
        `;

    } else {

        container.innerHTML = "";

        cart.forEach(item => {

            const div =
                document.createElement("div");

            div.className = "cart-item";

            div.innerHTML = `

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ${money(item.price)}
                </p>

                <div class="quantity">

                    <button
                        onclick="changeQuantity(${item.id}, -1)"
                    >
                        −
                    </button>

                    <strong>
                        ${item.quantity}
                    </strong>

                    <button
                        onclick="changeQuantity(${item.id}, 1)"
                    >
                        +
                    </button>

                </div>

                <button
                    class="remove"
                    onclick="removeFromCart(${item.id})"
                >
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

    const totalElement =
        document.getElementById("cartTotal");

    if (totalElement) {
        totalElement.textContent =
            money(total);
    }

}


function changeQuantity(id, amount) {

    id = Number(id);

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

    id = Number(id);

    cart =
        cart.filter(
            item => item.id !== id
        );

    saveData();
    updateCart();
    updateRecommendations();

    showToast(
        "Product removed from cart"
    );

}


/* CART MODAL */

function openCart() {

    const modal =
        document.getElementById("cartModal");

    if (!modal) return;

    updateCart();

    modal.classList.add("show");

}


function closeCart() {

    const modal =
        document.getElementById("cartModal");

    if (modal) {
        modal.classList.remove("show");
    }

}


document
    .getElementById("closeCart")
    ?.addEventListener(
        "click",
        closeCart
    );


document
    .getElementById("cartModal")
    ?.addEventListener(
        "click",
        function(event) {

            if (
                event.target ===
                this
            ) {
                closeCart();
            }

        }
    );


/* =========================================================
   PRODUCT DETAILS
========================================================= */

function showProductDetails(id) {

    id = Number(id);

    const product =
        products.find(
            p => p.id === id
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

    if (!modal || !content) return;


    const specs =
        product.specs
            .map(
                spec =>
                    `<li>✓ ${spec}</li>`
            )
            .join("");


    content.innerHTML = `

        <div class="details-image">

            <img
                src="${product.image}"
                alt="${product.name}"
            >

        </div>


        <div class="details-info">

            <span class="details-badge">
                ${product.badge}
            </span>

            <h2>
                ${product.name}
            </h2>

            <div class="details-rating">

                ${product.rating}

                <span>
                    (${product.reviews} reviews)
                </span>

            </div>

            <h3 class="details-price">
                ${money(product.price)}
            </h3>

            <p class="details-description">
                ${product.description}
            </p>

            <h3>
                Specifications
            </h3>

            <ul class="spec-list">
                ${specs}
            </ul>

            <div class="details-stock">
                ✓ In Stock
            </div>

            <button
                class="details-add-cart"
                onclick="
                    addToCart(${product.id});
                    closeProductDetails();
                "
            >
                🛒 Add to Cart
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


document
    .getElementById(
        "productDetailsModal"
    )
    ?.addEventListener(
        "click",
        function(event) {

            if (
                event.target === this
            ) {
                closeProductDetails();
            }

        }
    );


/* =========================================================
   WISHLIST
========================================================= */

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

        button.classList.remove("active");

        showToast(
            "Removed from wishlist"
        );

    } else {

        wishlist.push(id);

        button.textContent = "♥";

        button.classList.add("active");

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

    const count =
        document.getElementById(
            "wishlistCount"
        );

    if (count) {
        count.textContent =
            wishlist.length +
            " ITEMS";
    }

    if (!container) return;


    if (wishlist.length === 0) {

        container.innerHTML = `
            <div class="empty-cart">
                ❤️ Your wishlist is empty.
            </div>
        `;

        return;
    }


    container.innerHTML = "";


    wishlist.forEach(id => {

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
                🛍️
            </div>

            <h3>
                ${product.name}
            </h3>

            <p>
                ${money(product.price)}
            </p>

            <button
                onclick="addToCart(${product.id})"
            >
                Add to Cart
            </button>

            <button
                onclick="removeWishlist(${product.id})"
            >
                Remove
            </button>
        `;

        container.appendChild(card);

    });

}


function removeWishlist(id) {

    id = Number(id);

    wishlist =
        wishlist.filter(
            item => item !== id
        );

    saveData();

    renderWishlist();

    updateHeartButtons();

}


function updateHeartButtons() {

    document
        .querySelectorAll(".heart")
        .forEach(button => {

            const id =
                Number(
                    button.dataset.id
                );

            if (
                wishlist.includes(id)
            ) {

                button.textContent = "♥";
                button.classList.add("active");

            } else {

                button.textContent = "♡";
                button.classList.remove("active");

            }

        });

}


/* =========================================================
   SEARCH + FILTER
========================================================= */

function filterProducts() {

    const searchInput =
        document.getElementById(
            "productSearch"
        );

    const categoryInput =
        document.getElementById(
            "categoryFilter"
        );

    const priceInput =
        document.getElementById(
            "priceFilter"
        );

    if (
        !searchInput ||
        !categoryInput ||
        !priceInput
    ) return;


    const search =
        searchInput.value
            .toLowerCase()
            .trim();

    const category =
        categoryInput.value;

    const maxPrice =
        Number(
            priceInput.value
        );


    let visible = 0;


    document
        .querySelectorAll(".product")
        .forEach(card => {

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

                card.style.display = "";
                visible++;

            } else {

                card.style.display = "none";

            }

        });


    const result =
        document.getElementById(
            "resultCount"
        );

    if (result) {

        result.textContent =
            "Showing " +
            visible +
            " products";

    }

}


/* SEARCH */

document
    .getElementById("topSearch")
    ?.addEventListener(
        "input",
        function() {

            const search =
                document.getElementById(
                    "productSearch"
                );

            if (search) {
                search.value =
                    this.value;
            }

            filterProducts();

        }
    );


document
    .getElementById("productSearch")
    ?.addEventListener(
        "input",
        function() {

            const top =
                document.getElementById(
                    "topSearch"
                );

            if (top) {
                top.value =
                    this.value;
            }

            filterProducts();

        }
    );


/* CATEGORY BUTTONS */

document
    .querySelectorAll(".category")
    .forEach(button => {

        button.addEventListener(
            "click",
            function() {

                const category =
                    this.dataset.category;

                document
                    .getElementById(
                        "categoryFilter"
                    )
                    .value = category;

                document
                    .querySelectorAll(
                        ".category"
                    )
                    .forEach(btn =>
                        btn.classList.remove(
                            "active"
                        )
                    );

                this.classList.add("active");

                filterProducts();

            }
        );

    });


/* CATEGORY SELECT */

document
    .getElementById(
        "categoryFilter"
    )
    ?.addEventListener(
        "change",
        function() {

            document
                .querySelectorAll(
                    ".category"
                )
                .forEach(btn => {

                    btn.classList.toggle(
                        "active",
                        btn.dataset.category ===
                        this.value
                    );

                });

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

            const value =
                document.getElementById(
                    "priceValue"
                );

            if (value) {

                value.textContent =
                    "Up to " +
                    money(this.value);

            }

            filterProducts();

        }
    );


document
    .getElementById(
        "applyPrice"
    )
    ?.addEventListener(
        "click",
        function() {

            filterProducts();

            showToast(
                "Price filter applied"
            );

        }
    );


/* SORT */

document
    .getElementById(
        "sortFilter"
    )
    ?.addEventListener(
        "change",
        function() {

            const grid =
                document.getElementById(
                    "productsGrid"
                );

            if (!grid) return;


            const cards =
                Array.from(
                    grid.querySelectorAll(
                        ".product"
                    )
                );


            if (this.value === "low") {

                cards.sort(
                    (a,b) =>
                        Number(a.dataset.price) -
                        Number(b.dataset.price)
                );

            }

            else if (
                this.value === "high"
            ) {

                cards.sort(
                    (a,b) =>
                        Number(b.dataset.price) -
                        Number(a.dataset.price)
                );

            }

            else if (
                this.value === "name"
            ) {

                cards.sort(
                    (a,b) =>
                        a.dataset.name
                            .localeCompare(
                                b.dataset.name
                            )
                );

            }


            cards.forEach(
                card =>
                    grid.appendChild(card)
            );

            filterProducts();

        }
    );


/* ADD CART BUTTONS */

document
    .querySelectorAll(".add-cart")
    .forEach(button => {

        button.addEventListener(
            "click",
            function() {

                addToCart(
                    this.dataset.id
                );

            }
        );

    });


/* HEART BUTTONS */

document
    .querySelectorAll(".heart")
    .forEach(button => {

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


/* =========================================================
   RECOMMENDATIONS
========================================================= */

function updateRecommendations() {

    const container =
        document.getElementById(
            "recommendations"
        );

    if (!container) return;


    let recommended = [];


    if (cart.length > 0) {

        const categories =
            cart
                .map(item => {

                    const product =
                        products.find(
                            p =>
                                p.id ===
                                item.id
                        );

                    return product
                        ? product.category
                        : null;

                });


        recommended =
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
        recommended.length === 0
    ) {

        recommended =
            products.slice(0,3);

    }


    container.innerHTML = "";


    recommended
        .slice(0,3)
        .forEach(product => {

            const card =
                document.createElement("div");

            card.className =
                "recommend-card";

            card.innerHTML = `

                <div class="icon">
                    🛍️
                </div>

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ${money(product.price)}
                </p>

                <button
                    onclick="addToCart(${product.id})"
                >
                    Add to Cart
                </button>

            `;

            container.appendChild(card);

        });

}


/* =========================================================
   BST
========================================================= */

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
                    !current.left
                ) {

                    current.left =
                        node;

                    return;

                }

                current =
                    current.left;

            } else {

                if (
                    !current.right
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

        if (!node) {
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


products.forEach(
    product =>
        bst.insert(product.price)
);


document
    .getElementById("bstSearch")
    ?.addEventListener(
        "click",
        function() {

            const input =
                document.getElementById(
                    "bstInput"
                );

            const result =
                document.getElementById(
                    "bstResult"
                );

            const value =
                Number(input.value);


            if (!value) {

                result.textContent =
                    "Please enter a price.";

                return;

            }


            if (
                bst.search(value)
            ) {

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
    ?.addEventListener(
        "click",
        function() {

            const result =
                document.getElementById(
                    "bstResult"
                );

            const values =
                bst.inorder(bst.root);

            result.innerHTML = `

                <b>
                    BST Inorder Traversal:
                </b>

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


/* =========================================================
   LOGIN / SIGNUP
========================================================= */

function openAuth() {

    const modal =
        document.getElementById(
            "authModal"
        );

    if (!modal) return;

    modal.classList.add("show");

    updateAuthUI();

}


function closeAuth() {

    document
        .getElementById(
            "authModal"
        )
        ?.classList.remove("show");

}


function toggleAuthMode() {

    authMode =
        authMode === "login"
            ? "signup"
            : "login";

    updateAuthUI();

}


function updateAuthUI() {

    const title =
        document.getElementById(
            "authTitle"
        );

    const subtitle =
        document.getElementById(
            "authSubtitle"
        );

    const name =
        document.getElementById(
            "authName"
        );

    const button =
        document.getElementById(
            "authSubmit"
        );

    const toggle =
        document.getElementById(
            "authToggle"
        );


    if (
        !title ||
        !subtitle ||
        !name ||
        !button ||
        !toggle
    ) return;


    if (
        authMode === "login"
    ) {

        title.textContent =
            "Welcome Back 👋";

        subtitle.textContent =
            "Login to continue shopping";

        name.style.display =
            "none";

        button.textContent =
            "Login";

        toggle.textContent =
            "Create Account";

    } else {

        title.textContent =
            "Create Account 🚀";

        subtitle.textContent =
            "Join TechNova today";

        name.style.display =
            "block";

        button.textContent =
            "Create Account";

        toggle.textContent =
            "Login";

    }

}


/* AUTH SUBMIT */

document
    .getElementById(
        "authSubmit"
    )
    ?.addEventListener(
        "click",
        function() {

            const name =
                document
                    .getElementById(
                        "authName"
                    )
                    .value
                    .trim();

            const email =
                document
                    .getElementById(
                        "authEmail"
                    )
                    .value
                    .trim()
                    .toLowerCase();

            const password =
                document
                    .getElementById(
                        "authPassword"
                    )
                    .value;


            if (
                authMode === "login"
            ) {

                if (
                    !email ||
                    !password
                ) {

                    showToast(
                        "Please enter email and password ❌"
                    );

                    return;

                }


                const user =
                    users.find(
                        u =>
                            u.email === email &&
                            u.password === password
                    );


                if (!user) {

                    showToast(
                        "Invalid email or password ❌"
                    );

                    return;

                }


                currentUser =
                    user;


                localStorage.setItem(
                    "technovaCurrentUser",
                    JSON.stringify(
                        currentUser
                    )
                );


                closeAuth();

                updateUserButton();

                showToast(
                    "Welcome back, " +
                    user.name +
                    " 👋"
                );


                return;

            }


            if (
                !name ||
                !email ||
                !password
            ) {

                showToast(
                    "Please fill all fields ❌"
                );

                return;

            }


            if (
                password.length < 6
            ) {

                showToast(
                    "Password must be 6+ characters ❌"
                );

                return;

            }


            if (
                users.some(
                    user =>
                        user.email ===
                        email
                )
            ) {

                showToast(
                    "Account already exists ❌"
                );

                return;

            }


            const newUser = {

                id: Date.now(),

                name: name,

                email: email,

                password: password

            };


            users.push(newUser);

            currentUser =
                newUser;


            localStorage.setItem(
                "technovaUsers",
                JSON.stringify(users)
            );

            localStorage.setItem(
                "technovaCurrentUser",
                JSON.stringify(
                    currentUser
                )
            );


            closeAuth();

            updateUserButton();

            showToast(
                "Account created successfully 🎉"
            );


            document.getElementById(
                "authName"
            ).value = "";

            document.getElementById(
                "authEmail"
            ).value = "";

            document.getElementById(
                "authPassword"
            ).value = "";

        }
    );


/* USER BUTTON */

function updateUserButton() {

    const button =
        document.querySelector(
            ".login-button"
        );

    if (!button) return;


    if (currentUser) {

        button.textContent =
            "👤 " +
            currentUser.name;

        button.title =
            "Click to logout";

    } else {

        button.textContent =
            "👤 Login";

        button.title =
            "Login / Signup";

    }

}


document
    .querySelector(".login-button")
    ?.addEventListener(
        "click",
        function() {

            if (currentUser) {

                if (
                    confirm(
                        "Logout from TechNova?"
                    )
                ) {

                    currentUser = null;

                    localStorage.removeItem(
                        "technovaCurrentUser"
                    );

                    updateUserButton();

                    showToast(
                        "Logged out successfully 👋"
                    );

                }

            } else {

                openAuth();

            }

        }
    );


document
    .getElementById("authModal")
    ?.addEventListener(
        "click",
        function(event) {

            if (
                event.target === this
            ) {
                closeAuth();
            }

        }
    );


/* =========================================================
   CHECKOUT
========================================================= */

function openCheckout() {

    if (!currentUser) {

        closeCart();

        openAuth();

        showToast(
            "Please login before checkout 🔐"
        );

        return;

    }


    if (cart.length === 0) {

        showToast(
            "Your cart is empty 🛒"
        );

        return;

    }


    const modal =
        document.getElementById(
            "checkoutModal"
        );

    if (!modal) return;


    document.getElementById(
        "checkoutName"
    ).value =
        currentUser.name || "";


    renderCheckout();

    closeCart();

    modal.classList.add("show");

}


function closeCheckout() {

    document
        .getElementById(
            "checkoutModal"
        )
        ?.classList.remove("show");

}


function renderCheckout() {

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

        const itemTotal =
            item.price *
            item.quantity;

        total += itemTotal;


        const div =
            document.createElement(
                "div"
            );

        div.className =
            "checkout-item";

        div.innerHTML = `

            <span>
                ${item.name}
                × ${item.quantity}
            </span>

            <strong>
                ${money(itemTotal)}
            </strong>

        `;

        container.appendChild(div);

    });


    if (totalElement) {

        totalElement.textContent =
            money(total);

    }

}


/* CHECKOUT BUTTON */

document
    .getElementById("checkout")
    ?.addEventListener(
        "click",
        openCheckout
    );


/* PLACE ORDER */

document
    .getElementById("placeOrder")
    ?.addEventListener(
        "click",
        function() {

            if (!currentUser) {

                closeCheckout();

                openAuth();

                return;

            }


            if (cart.length === 0) {

                showToast(
                    "Cart is empty ❌"
                );

                closeCheckout();

                return;

            }


            const name =
                document
                    .getElementById(
                        "checkoutName"
                    )
                    .value
                    .trim();

            const phone =
                document
                    .getElementById(
                        "checkoutPhone"
                    )
                    .value
                    .trim();

            const address =
                document
                    .getElementById(
                        "checkoutAddress"
                    )
                    .value
                    .trim();

            const city =
                document
                    .getElementById(
                        "checkoutCity"
                    )
                    .value
                    .trim();

            const pincode =
                document
                    .getElementById(
                        "checkoutPincode"
                    )
                    .value
                    .trim();

            const payment =
                document.querySelector(
                    'input[name="payment"]:checked'
                );


            if (
                !name ||
                !phone ||
                !address ||
                !city ||
                !pincode
            ) {

                showToast(
                    "Please fill all delivery details ❌"
                );

                return;

            }


            if (
                !/^[0-9]{10}$/.test(phone)
            ) {

                showToast(
                    "Enter valid 10-digit mobile number ❌"
                );

                return;

            }


            if (
                !/^[0-9]{6}$/.test(pincode)
            ) {

                showToast(
                    "Enter valid 6-digit PIN code ❌"
                );

                return;

            }


            let total = 0;


            cart.forEach(item => {

                total +=
                    item.price *
                    item.quantity;

            });


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

                customer: name,

                phone: phone,

                address: address,

                city: city,

                pincode: pincode,

                payment:
                    payment
                        ? payment.value
                        : "cod",

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

            closeCheckout();


            showToast(
                "🎉 Order placed successfully!"
            );


            document
                .getElementById("orders")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


/* CHECKOUT OUTSIDE CLICK */

document
    .getElementById(
        "checkoutModal"
    )
    ?.addEventListener(
        "click",
        function(event) {

            if (
                event.target === this
            ) {

                closeCheckout();

            }

        }
    );


/* =========================================================
   ORDERS
========================================================= */

function renderOrders() {

    const container =
        document.getElementById(
            "ordersContainer"
        );

    if (!container) return;


    if (orders.length === 0) {

        container.innerHTML = `
            <div class="empty-cart">
                📦 No orders yet.
            </div>
        `;

        return;

    }


    container.innerHTML = "";


    orders.forEach(order => {

        const card =
            document.createElement(
                "div"
            );

        card.className =
            "order-card";


        const itemsHTML =
            order.items
                .map(
                    item => `

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

                    `
                )
                .join("");


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


document
    .getElementById(
        "clearOrders"
    )
    ?.addEventListener(
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


            if (
                confirm(
                    "Clear all orders?"
                )
            ) {

                orders = [];

                saveData();

                renderOrders();

                showToast(
                    "Orders cleared"
                );

            }

        }
    );


/* =========================================================
   SHOP NOW
========================================================= */

function goProducts() {

    document
        .getElementById(
            "products"
        )
        ?.scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================================
   INITIALIZE
========================================================= */

updateCart();

renderWishlist();

updateHeartButtons();

renderOrders();

updateRecommendations();

filterProducts();

updateUserButton();

updateAuthUI();
