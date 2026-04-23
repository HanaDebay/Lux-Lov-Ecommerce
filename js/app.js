/**
 * App Initialization Module
 * Main application initialization and global state management
 */

class App {
  constructor() {
    this.cart = null;
    this.productManager = null;
    this.ui = null;
    this.initialized = false;
  }

  /**
   * Initialize the application
   */
  initialize(products = []) {
    try {
      // Create instances of managers
      this.cart = new CartManager();
      this.productManager = new ProductManager(products);
      this.ui = new UIManager();

      // Update cart count on page load
      this.updateCartDisplay();

      // Subscribe to cart changes
      this.cart.subscribe(() => {
        this.updateCartDisplay();
      });

      this.initialized = true;
      console.log('App initialized successfully');
      return true;

    } catch (error) {
      console.error('App initialization error:', error);
      return false;
    }
  }

  /**
   * Update cart display across all pages
   */
  updateCartDisplay() {
    if (this.ui && this.cart) {
      this.ui.updateCartCount(this.cart.getItemCount());
    }
  }

  /**
   * Add item to cart (public method)
   */
  addToCart(productId, quantity = 1) {
    try {
      const product = this.productManager.getById(productId);
      if (!product) {
        console.error('Product not found:', productId);
        this.ui?.showNotification('Product not found', 'error');
        return false;
      }

      const success = this.cart.addItem(product, quantity);
      if (success) {
        this.ui?.showNotification(`${product.name} added to cart!`, 'success');
      }
      return success;

    } catch (error) {
      console.error('Error adding to cart:', error);
      this.ui?.showNotification('Error adding to cart', 'error');
      return false;
    }
  }

  /**
   * Remove item from cart (public method)
   */
  removeFromCart(productId) {
    try {
      const success = this.cart.removeItem(productId);
      if (success) {
        this.ui?.showNotification('Item removed from cart', 'success');
      }
      return success;

    } catch (error) {
      console.error('Error removing from cart:', error);
      this.ui?.showNotification('Error removing from cart', 'error');
      return false;
    }
  }

  /**
   * Get cart data
   */
  getCart() {
    return this.cart ? this.cart.export() : null;
  }

  /**
   * Clear cart
   */
  clearCart() {
    if (this.cart) {
      this.cart.clear();
      this.ui?.showNotification('Cart cleared', 'success');
    }
  }

  /**
   * Search products
   */
  searchProducts(query) {
    try {
      return this.productManager.search(query);
    } catch (error) {
      console.error('Search error:', error);
      return [];
    }
  }

  /**
   * Get products by category
   */
  getProductsByCategory(category) {
    try {
      return this.productManager.filterByCategory(category);
    } catch (error) {
      console.error('Filter error:', error);
      return [];
    }
  }

  /**
   * Get all products
   */
  getAllProducts() {
    return this.productManager.getAll();
  }

  /**
   * Log application state (for debugging)
   */
  logState() {
    console.log({
      cart: this.cart?.export(),
      products: this.productManager?.getAll(),
      initialized: this.initialized
    });
  }
}

// Create global app instance
const app = new App();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = App;
}
