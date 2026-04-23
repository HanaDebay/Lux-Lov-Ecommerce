// Get product id from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get("id"));

// Find product in products array in product-data.js
const product = products.find(p => p.id === productId);

if (!product) {
  document.body.innerHTML = "<div class='container my-5'><h2>Product not found</h2></div>";
} else {
  // Display main product info in product-detail.html page 
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-price").textContent = `$${product.price.toFixed(2)}`;
  document.getElementById("product-description").textContent = product.description || "This is a great product you’ll love!";

  // Set main image
  const mainImage = document.getElementById("main-image");
  mainImage.src = product.image;
  mainImage.alt = product.name;

  // Thumbnails (if multiple images exist, otherwise show the same one)
  const thumbnailsDiv = document.getElementById("thumbnails");
  thumbnailsDiv.innerHTML = "";
  if (product.images && product.images.length > 0) {
    product.images.forEach(img => {
      const thumb = document.createElement("img");
      thumb.src = img;
      thumb.alt = product.name;
      thumb.className = "img-thumbnail me-2";
      thumb.style.width = "80px";
      thumb.style.cursor = "pointer";
      thumb.addEventListener("click", () => {
        mainImage.src = img;
      });
      thumbnailsDiv.appendChild(thumb);
    });
  } else {
    // fallback if only one image
    const thumb = document.createElement("img");
    thumb.src = product.image;
    thumb.alt = product.name;
    thumb.className = "img-thumbnail me-2";
    thumb.style.width = "80px";
    thumbnailsDiv.appendChild(thumb);
  }

  // Populate color select
  const colorSelect = document.getElementById("color-select");
  if (product.colors) {
    product.colors.forEach(color => {
      const opt = document.createElement("option");
      opt.value = color;
      opt.textContent = color;
      colorSelect.appendChild(opt);
    });
  }

  // Populate size select
  const sizeSelect = document.getElementById("size-select");
  if (product.sizes) {
    product.sizes.forEach(size => {
      const opt = document.createElement("option");
      opt.value = size;
      opt.textContent = size;
      sizeSelect.appendChild(opt);
    });
  }

  // Add to cart button
  document.getElementById("add-to-cart").addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: colorSelect.value,
      size: sizeSelect.value,
      qty: 1
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  });
}
