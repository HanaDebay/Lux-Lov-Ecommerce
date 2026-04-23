/**
 * index-page-rendering.js
 * Handles dynamic product rendering and pagination for the home page (index.html).
 */

document.addEventListener("DOMContentLoaded", () => {
  // Ensure the global 'app' instance is initialized.
  if (typeof app === 'undefined' || !app.initialized) {
    console.error("App is not initialized. Ensure products-data.js and app.js are loaded before index-page-rendering.js and app.initialize(products) is called.");
    const productList = document.getElementById("product-list");
    if (productList) {
      productList.innerHTML = `<p class="text-center text-danger">Error: Application not initialized. Please try again later.</p>`;
    }
    return;
  }

  const productListContainer = document.getElementById("product-list");
  const paginationContainer = document.getElementById("pagination-controls");
  const productsPerPage = 8; // Display 8 products per page (2 rows of 4 items)
  let currentPage = 1;
  let allProducts = app.productManager.getAll(); // Get all products from ProductManager

  if (!productListContainer) {
    console.error("Could not find product-list container on index.html");
    return;
  }

  function renderProducts(page) {
    productListContainer.innerHTML = ''; // Clear previous products
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToDisplay = allProducts.slice(startIndex, endIndex);

    if (productsToDisplay.length === 0) {
      productListContainer.innerHTML = '<p class="text-center text-muted">No products to display.</p>';
