// ============================================
// SHOPSMART
// E-COMMERCE DSA MINI PROJECT
//
// DSA USED:
// 1. Linked List
// 2. Binary Search Tree
// 3. Searching
// 4. Sorting
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
// LINKED LIST NODE
// ============================================

class CartNode {

    constructor(
        name,
        price,
        quantity = 1
    ) {

        this.name = name;

        this.price = price;

        this.quantity = quantity;

        this.next = null;

    }

}


// ============================================
// SHOPPING CART LINKED LIST
// ============================================

class ShoppingCart {

    constructor() {

        this.head = null;

    }


    // ========================================
    // INSERT
    // ========================================

    add(name, price) {

        let current =
            this.head;


        // If product already exists

        while (
            current !== null
        ) {

            if (
                current.name === name
            ) {

                current.quantity++;

                return;

            }


            current =
                current.next;

        }


        // Create new node

        const newNode =
            new CartNode(
                name,
                price
            );


        // Empty list

        if (
            this.head === null
        ) {

            this.head =
                newNode;

            return;

        }


        // Go to last node

        current =
            this.head;


        while (
            current.next !== null
        ) {

            current =
                current.next;

        }


        current.next =
            newNode;

    }


    // ========================================
    // DELETE
    // ========================================

    remove(name) {

        if (
            this.head === null
        ) {

            return false;

        }


        // Delete first node

        if (
            this.head.name === name
        ) {

            this.head =
                this.head.next;

            return true;

        }


        let current =
            this.head;


        while (
            current.next !== null
        ) {

            if (
                current.next.name === name
            ) {

                current.next =
                    current.next.next;

                return true;

            }


            current =
                current.next;

        }


        return false;

    }


    // ========================================
    // SEARCH NODE
    // ========================================

    find(name) {

        let current =
            this.head;


        while (
            current !== null
        ) {

            if (
                current.name === name
            ) {

                return current;

            }


            current =
                current.next;

        }


        return null;

    }


    // ========================================
    // CHANGE QUANTITY
    // ========================================

    changeQuantity(
        name,
        change
    ) {

        const node =
            this.find(name);


        if (
            node === null
        ) {

            return;

        }


        node.quantity +=
            change;


        if (
            node.quantity <= 0
        ) {

            this.remove(name);

        }

    }


    // ========================================
    // CLEAR
    // ========================================

    clear() {

        this.head = null;

    }


    // ========================================
    // TRAVERSAL
    // ========================================

    toArray() {

        const items = [];

        let current =
            this.head;


        while (
            current !== null
        ) {

            items.push({

                name:
                    current.name,

                price:
                    current.price,

                quantity:
                    current.quantity

            });


            current =
                current.next;

        }


        return items;

    }


    // ========================================
    // TOTAL
    // ========================================

    getTotal() {

        let total = 0;

        let current =
            this.head;


        while (
            current !== null
        ) {

            total +=
                current.price *
                current.quantity;


            current =
                current.next;

        }


        return total;

    }


    // ========================================
    // TOTAL QUANTITY
    // ========================================

    getTotalQuantity() {

        let total = 0;

        let current =
            this.head;


        while (
            current !== null
        ) {

            total +=
                current.quantity;


            current =
                current.next;

        }


        return total;

    }

}


// ============================================
// CREATE CART
// ============================================

const shoppingCart =
    new ShoppingCart();


// ============================================
// WISHLIST
// ============================================

let wishlist =
    JSON.parse(
        localStorage.getItem(
            "shopSmartWishlist"
        )
    ) || [];


// ============================================
// RECOMMENDATIONS
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
// SAVE CART
// ============================================

function saveCart() {

    localStorage.setItem(

        "shopSmartCart",

        JSON.stringify(
            shoppingCart.toArray()
        )

    );

}


// ============================================
// SAVE WISHLIST
// ============================================

function saveWishlist() {

    localStorage.setItem(

        "shopSmartWishlist",

        JSON.stringify(
            wishlist
        )

    );

}


// ============================================
// RESTORE CART
// ============================================

function restoreCart() {

    const savedCart =
        JSON.parse(
            localStorage.getItem(
                "shopSmartCart"
            )
        );


    if (!savedCart) {

        return;

    }


    savedCart.forEach(
        function(item) {

            shoppingCart.add(
                item.name,
                item.price
            );


            const node =
                shoppingCart.find(
                    item.name
                );


            if (node) {

                node.quantity =
                    item.quantity;

            }

        }
    );

}


// ============================================
// TOAST
// ============================================

function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    setTimeout(
        function() {

            toast.classList.remove(
                "show"
            );

        },
        2000
    );

}


// ============================================
// ADD TO CART
// ============================================

function addToCart(
    productName
) {

    if (
        !products[productName]
    ) {

        return;

    }


    shoppingCart.add(

        productName,

        products[
            productName
        ].price

    );


    saveCart();

    updateCart();

    showRecommendations(
        productName
    );


    showToast(

        "✅ " +
        productName +
        " added to cart"

    );

}


// ============================================
// UPDATE CART UI
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


    cartItems.innerHTML =
        "";


    const items =
        shoppingCart.toArray();


    if (
        items.length === 0
    ) {

        cartItems.innerHTML = `

            <p class="empty-cart">

                Your cart is empty.

            </p>

        `;


        cartCount.textContent =
            "0";


        cartTotal.textContent =
            "₹0";


        return;

    }


    items.forEach(
        function(
            item,
            index
        ) {


            const element =
                document.createElement(
                    "div"
                );


            element.className =
                "cart-item";


            element.innerHTML = `

                <h3>
                    ${item.name}
                </h3>


                <p>
                    Price:
                    ₹${item.price.toLocaleString()}
                </p>


                <div
                    class="quantity-control"
                >

                    <button
                        onclick="
                            changeQuantityByIndex(
                                ${index},
                                -1
                            )
                        "
                    >
                        −
                    </button>


                    <strong>
                        ${item.quantity}
                    </strong>


                    <button
                        onclick="
                            changeQuantityByIndex(
                                ${index},
                                1
                            )
                        "
                    >
                        +
                    </button>

                </div>


                <p>

                    Subtotal:
                    ₹${(
                        item.price *
                        item.quantity
                    ).toLocaleString()}

                </p>


                <button
                    class="remove-btn"
                    onclick="
                        removeCartItem(
                            '${item.name}'
                        )
                    "
                >
                    ❌ Remove
                </button>

            `;


            cartItems.appendChild(
                element
            );

        }
    );


    cartCount.textContent =
        shoppingCart
            .getTotalQuantity();


    cartTotal.textContent =
        "₹" +
        shoppingCart
            .getTotal()
            .toLocaleString();

}


// ============================================
// CHANGE QUANTITY
// ============================================

function changeQuantityByIndex(
    index,
    change
) {

    const items =
        shoppingCart.toArray();


    if (
        !items[index]
    ) {

        return;

    }


    shoppingCart.changeQuantity(

        items[index].name,

        change

    );


    saveCart();

    updateCart();

}


// ============================================
// REMOVE CART ITEM
// ============================================

function removeCartItem(
    name
) {

    shoppingCart.remove(
        name
    );


    saveCart();

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

    shoppingCart.clear();

    saveCart();

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
        .getElementById(
            "cartPanel"
        )
        .classList
        .add(
            "active"
        );

}


// ============================================
// CLOSE CART
// ============================================

function closeCart() {

    document
        .getElementById(
            "cartPanel"
        )
        .classList
        .remove(
            "active"
        );

}


// ============================================
// CHECKOUT
// ============================================

function checkout() {

    if (
        shoppingCart.head === null
    ) {

        showToast(
            "🛒 Cart is empty"
        );

        return;

    }


    const total =
        shoppingCart.getTotal();


    alert(

        "🎉 Order placed successfully!\n\n" +

        "Total Amount: ₹" +

        total.toLocaleString() +

        "\n\n" +

        "This is a demo checkout."

    );


    shoppingCart.clear();

    saveCart();

    updateCart();

}


// ============================================
// SEARCH PRODUCTS
// ============================================

function searchProducts() {

    applyFilters();

}


// ============================================
// FILTER PRODUCTS
// ============================================

function filterProducts() {

    applyFilters();

}


// ============================================
// APPLY SEARCH + CATEGORY
// ============================================

function applyFilters() {

    const search =
        document
            .getElementById(
                "searchInput"
            )
            .value
            .toLowerCase()
            .trim();


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


    let count = 0;


    cards.forEach(
        function(card) {

            const name =
                card.dataset.name
                    .toLowerCase();


            const cardCategory =
                card.dataset.category;


            const searchMatch =
                name.includes(
                    search
                );


            const categoryMatch =

                category === "all" ||

                cardCategory ===
                    category;


            if (
                searchMatch &&
                categoryMatch
            ) {

                card.style.display =
                    "";

                count++;

            }

            else {

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
        count +
        " products";

}


// ============================================
// SORT PRODUCTS
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


    if (
        option === "low"
    ) {

        cards.sort(
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


    else if (
        option === "high"
    ) {

        cards.sort(
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


    else if (
        option === "name"
    ) {

        cards.sort(
            function(a, b) {

                return (

                    a.dataset.name
                        .localeCompare(
                            b.dataset.name
                        )

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


    applyFilters();

}


// ============================================
// RECOMMENDATION SYSTEM
// ============================================

function showRecommendations(
    productName
) {

    const container =
        document.getElementById(
            "recommendationContainer"
        );


    const text =
        document.getElementById(
            "recommendationText"
        );


    container.innerHTML =
        "";


    text.textContent =

        "Because you selected " +
        productName +
        ":";


    const list =
        recommendations[
            productName
        ];


    if (!list) {

        return;

    }


    list.forEach(
        function(name) {

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
                    onclick="
                        addToCart(
                            '${name}'
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


// ============================================
// WISHLIST
// ============================================

function toggleWishlist(
    button,
    productName
) {

    const index =
        wishlist.indexOf(
            productName
        );


    if (
        index === -1
    ) {

        wishlist.push(
            productName
        );


        button.classList.add(
            "active"
        );


        button.textContent =
            "♥";


        showToast(
            "❤️ Added to wishlist"
        );

    }


    else {

        wishlist.splice(
            index,
            1
        );


        button.classList.remove(
            "active"
        );


        button.textContent =
            "♡";


        showToast(
            "Removed from wishlist"
        );

    }


    saveWishlist();

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


    container.innerHTML =
        "";


    if (
        wishlist.length === 0
    ) {

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

                <div
                    class="product-icon"
                >
                    ${products[name].icon}
                </div>


                <h3>
                    ${name}
                </h3>


                <p>
                    ₹${products[name].price.toLocaleString()}
                </p>


                <button
                    onclick="
                        removeFromWishlist(
                            '${name}'
                        )
                    "
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

function removeFromWishlist(
    name
) {

    const index =
        wishlist.indexOf(
            name
        );


    if (
        index !== -1
    ) {

        wishlist.splice(
            index,
            1
        );

    }


    saveWishlist();

    displayWishlist();

    restoreWishlistButtons();


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

            const onclick =
                button.getAttribute(
                    "onclick"
                );


            if (!onclick) {

                return;

            }


            const match =
                onclick.match(
                    /'([^']+)'/
                );


            if (!match) {

                return;

            }


            const name =
                match[1];


            if (
                wishlist.includes(
                    name
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
// BST NODE
// ============================================

class BSTNode {

    constructor(
        price,
        productName
    ) {

        this.price =
            price;

        this.productName =
            productName;

        this.left =
            null;

        this.right =
            null;

    }

}


// ============================================
// BINARY SEARCH TREE
// ============================================

class ProductBST {

    constructor() {

        this.root =
            null;

    }


    // ========================================
    // INSERT
    // ========================================

    insert(
        price,
        productName
    ) {

        const newNode =
            new BSTNode(
                price,
                productName
            );


        if (
            this.root === null
        ) {

            this.root =
                newNode;

            return;

        }


        let current =
            this.root;


        while (true) {

            if (
                price <
                current.price
            ) {

                if (
                    current.left === null
                ) {

                    current.left =
                        newNode;

                    return;

                }


                current =
                    current.left;

            }


            else {

                if (
                    current.right === null
                ) {

                    current.right =
                        newNode;

                    return;

                }


                current =
                    current.right;

            }

        }

    }


    // ========================================
    // SEARCH
    // ========================================

    search(price) {

        let current =
            this.root;


        while (
            current !== null
        ) {

            if (
                price ===
                current.price
            ) {

                return current;

            }


            if (
                price <
                current.price
            ) {

                current =
                    current.left;

            }


            else {

                current =
                    current.right;

            }

        }


        return null;

    }


    // ========================================
    // INORDER
    // ========================================

    inorder(
        node = this.root,
        result = []
    ) {

        if (
            node === null
        ) {

            return result;

        }


        this.inorder(
            node.left,
            result
        );


        result.push({

            price:
                node.price,

            product:
                node.productName

        });


        this.inorder(
            node.right,
            result
        );


        return result;

    }


    // ========================================
    // MINIMUM
    // ========================================

    getMinimum() {

        if (
            this.root === null
        ) {

            return null;

        }


        let current =
            this.root;


        while (
            current.left !== null
        ) {

            current =
                current.left;

        }


        return current;

    }


    // ========================================
    // MAXIMUM
    // ========================================

    getMaximum() {

        if (
            this.root === null
        ) {

            return null;

        }


        let current =
            this.root;


        while (
            current.right !== null
        ) {

            current =
                current.right;

        }


        return current;

    }

}


// ============================================
// CREATE BST
// ============================================

const productBST =
    new ProductBST();


// ============================================
// INSERT PRODUCTS INTO BST
// ============================================

Object.keys(products).forEach(
    function(productName) {

        productBST.insert(

            products[
                productName
            ].price,

            productName

        );

    }
);


// ============================================
// SEARCH BST
// ============================================

function searchBST() {

    const input =
        document.getElementById(
            "bstSearchInput"
        );


    const result =
        document.getElementById(
            "bstResult"
        );


    const price =
        Number(
            input.value
        );


    if (
        !price
    ) {

        result.innerHTML = `

            ⚠️ Please enter
            a valid price.

        `;

        return;

    }


    const node =
        productBST.search(
            price
        );


    if (node) {

        result.innerHTML = `

            <h3>
                ✅ Product Found
            </h3>


            <p>

                Product:
                <strong>
                    ${node.productName}
                </strong>

            </p>


            <p>

                Price:
                <strong>
                    ₹${node.price.toLocaleString()}
                </strong>

            </p>

        `;

    }


    else {

        result.innerHTML = `

            <h3>
                ❌ Product Not Found
            </h3>


            <p>

                No product exists
                with price
                ₹${price.toLocaleString()}.

            </p>

        `;

    }

}


// ============================================
// BST INFORMATION
// ============================================

function showBSTData() {

    const result =
        document.getElementById(
            "bstResult"
        );


    const sorted =
        productBST.inorder();


    const minimum =
        productBST.getMinimum();


    const maximum =
        productBST.getMaximum();


    let html = `

        <h3>
            🌳 BST Information
        </h3>


        <p>
            <strong>
                Inorder Traversal:
            </strong>
        </p>


        <p>

    `;


    sorted.forEach(
        function(
            item,
            index
        ) {

            html +=

                "₹" +
                item.price.toLocaleString() +
                " - " +
                item.product;


            if (
                index <
                sorted.length - 1
            ) {

                html +=
                    " → ";

            }

        }
    );


    html += `

        </p>


        <hr>


        <p>

            💰 Minimum Price:

            <strong>

                ${minimum.productName}
                -
                ₹${minimum.price.toLocaleString()}

            </strong>

        </p>


        <p>

            💎 Maximum Price:

            <strong>

                ${maximum.productName}
                -
                ₹${maximum.price.toLocaleString()}

            </strong>

        </p>

    `;


    result.innerHTML =
        html;

}


// ============================================
// LINKED LIST CONSOLE DISPLAY
// ============================================

function displayLinkedList() {

    let current =
        shoppingCart.head;


    const result = [];


    while (
        current !== null
    ) {

        result.push(
            current.name
        );


        current =
            current.next;

    }


    console.log(

        "Shopping Cart Linked List:",

        result.length
            ? result.join(
                " -> "
            ) + " -> NULL"
            : "NULL"

    );

}


// ============================================
// INITIALIZE
// ============================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        restoreCart();

        updateCart();

        displayWishlist();

        restoreWishlistButtons();

        displayLinkedList();

    }
);