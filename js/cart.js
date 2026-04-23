// Render products items
// 'products' is now globally available from products-data.js
const productList = document.getElementById("product-list");
if (productList) {
    products.forEach(p => {
        productList.innerHTML += `
        <div class="col-md-3 mb-4">
            <article class="card shadow-sm h-100">
                <img src="${p.image}" class="card-img-top" alt="${p.name} - $${p.price.toFixed(2)}" loading="lazy" style="object-fit: cover; height: 200px;">
                <div class="card-body d-flex flex-column">
                    <h3 class="card-title">${p.name}</h3>
                    <p class="card-text fw-bold" aria-label="Price">$${p.price.toFixed(2)}</p>
                    <div class="mt-auto">
                        <button class="btn btn-primary w-100 mb-2" onclick="addToCart(${p.id})" aria-label="Add ${p.name} to shopping cart">Add to Cart</button>
                        <a href="pages/product-details.html?id=${p.id}" class="btn btn-outline-dark w-100" aria-label="View details for ${p.name}">View More</a>
                    </div>
                </div>
            </article>
        </div>
        `;
    });
}

// Load cart count
function updateCartCount() {
    if (typeof app !== 'undefined' && app.initialized) {
        document.getElementById("cart-count").textContent = app.cart.getItemCount();
    } else {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        document.getElementById("cart-count").textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
}

// Add to cart
function addToCart(id) {
    app.addToCart(id);
}
