/**
 * Cart Manager Module
 * Handles all cart-related operations with error handling
 */

class CartManager {
  constructor(storageKey = 'cart') {
    this.storageKey = storageKey;
    this.cart = this.loadCart();
    this.listeners = [];
  }

  /**
   * Load cart from localStorage with error handling
   */
  loadCart() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading cart:', error);
      return [];
    }
  }

  /**
   * Save cart to localStorage with error handling
   */
  saveCart() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
      this.notifyListeners();
      return true;
    } catch (error) {
      console.error('Error saving cart:', error);
      return false;
    }
  }

  /**
   * Add item to cart
   */
  addItem(product, quantity = 1) {
    if (!product || !product.id) {
      console.error('Invalid product:', product);
      return false;
    }

    const existingItem = this.cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({
        ...product,
        quantity: quantity
      });
    }

    this.saveCart();
    return true;
  }

  /**
   * Remove item from cart
   */
  removeItem(productId) {
    const index = this.cart.findIndex(item => item.id === productId);
    if (index > -1) {
      this.cart.splice(index, 1);
      this.saveCart();
      return true;
    }
    return false;
  }

  /**
   * Update item quantity
   */
  updateQuantity(productId, quantity) {
    if (quantity < 1) {
      return this.removeItem(productId);
    }

    const item = this.cart.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity;
      this.saveCart();
      return true;
    }
    return false;
  }

  /**
   * Clear entire cart
   */
  clear() {
    this.cart = [];
    this.saveCart();
  }

  /**
   * Get total items count
   */
  getItemCount() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  /**
   * Get total price
   */
  getTotal() {
    return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  /**
   * Get cart items
   */
  getItems() {
    return [...this.cart];
  }

  /**
   * Get single item
   */
  getItem(productId) {
    return this.cart.find(item => item.id === productId);
  }

  /**
   * Check if cart is empty
   */
  isEmpty() {
    return this.cart.length === 0;
  }

  /**
   * Subscribe to cart changes
   */
  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  /**
   * Notify all listeners of changes
   */
  notifyListeners() {
    this.listeners.forEach(callback => {
      try {
        callback(this.getItems());
      } catch (error) {
        console.error('Error in cart listener:', error);
      }
    });
  }

  /**
   * Export cart data (for analytics, debugging)
   */
  export() {
    return {
      items: this.getItems(),
      total: this.getTotal(),
      itemCount: this.getItemCount(),
      exportDate: new Date().toISOString()
    };
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CartManager;
}
