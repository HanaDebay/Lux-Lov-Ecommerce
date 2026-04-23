document.addEventListener("DOMContentLoaded", () => {
  
  // Ensure the global 'app' instance is initialized.
  // 'products' is assumed to be loaded from products-data.js and passed to app.initialize in the HTML.
  if (typeof app === 'undefined' || !app.initialized) {
    console.error("App is not initialized. Ensure products-data.js and app.js are loaded before collection.js and app.initialize(products) is called.");
    // Fallback or early exit if app is not ready
    const grid = document.getElementById("collection-grid");
    if (grid) {
      grid.innerHTML = `<p class="text-center text-danger">Error: Application not initialized. Please try again later.</p>`;
    }
    return;
  }

  const grid = document.getElementById("collection-grid");

  if (!grid) {
    console.error("Could not find collection-grid");
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const searchQuery = params.get("search");
  const categoryQuery = params.get("category");

  const filterOptions = {};
  if (searchQuery) {
    filterOptions.search = searchQuery;
  }
  if (categoryQuery) {
    filterOptions.category = categoryQuery;
  }

  let filteredProducts = app.productManager.applyFilters(filterOptions);

  // If no products match
  if (filteredProducts.length === 0) {
    grid.innerHTML = `<p class="text-center text-muted">No products found.</p>`;
    return;
  }

  grid.innerHTML = ""; // Clear previous content
  // Render filtered products
  filteredProducts.forEach(product => {
    const col = document.createElement("div");
    col.className = "col-lg-3 col-md-4 col-sm-6 mb-4";
    col.innerHTML = `
      <article class="card h-100 border-0 shadow-sm">
        <img src="${product.image}" class="card-img-top" alt="${product.name} - $${product.price.toFixed(2)}"
             style="cursor:pointer; object-fit: cover; height: 250px;" onclick="viewProduct(${product.id})" role="button" tabindex="0" onkeypress="if(event.key==='Enter') viewProduct(${product.id})" loading="lazy">
        <div class="card-body text-center">
          <h3 class="card-title">${product.name}</h3>
          <p class="text-success fw-bold" aria-label="Price">$${product.price.toFixed(2)}</p>
        </div>
      </article>
    `;
    grid.appendChild(col);
  });
});

// Global function so onclick works
function viewProduct(id) {
  window.location.href = `product-details.html?id=${id}`;
}
