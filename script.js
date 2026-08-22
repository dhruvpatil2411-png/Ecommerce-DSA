// ============================
// SHOPPING CART
// ============================

let cartCount = 0;

function addToCart(productName) {

    cartCount++;

    document.getElementById("cartCount")
        .textContent = cartCount;

    alert(
        "✅ " +
        productName +
        " added to cart!"
    );
}


// ============================
// PRODUCT SEARCH
// ============================

function searchProducts() {

    let searchText =
        document.getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();

    let products =
        document.querySelectorAll(".product-card");

    products.forEach(function(product) {

        let productName =
            product
            .getAttribute("data-name")
            .toLowerCase();

        if (productName.includes(searchText)) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });
}


// ============================
// PRODUCT SORTING
// ============================

function sortProducts() {

    let container =
        document.getElementById(
            "productContainer"
        );

    let products =
        Array.from(
            container.querySelectorAll(
                ".product-card"
            )
        );

    let sortOption =
        document.getElementById(
            "sortSelect"
        ).value;


    if (sortOption === "low") {

        products.sort(function(a, b) {

            return Number(a.dataset.price)
                 - Number(b.dataset.price);

        });

    }


    if (sortOption === "high") {

        products.sort(function(a, b) {

            return Number(b.dataset.price)
                 - Number(a.dataset.price);

        });

    }


    products.forEach(function(product) {

        container.appendChild(product);

    });
}