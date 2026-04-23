/**
 * Product Manager Module
 * Handles product data and filtering
 */

class ProductManager {
  constructor(products = []) {
    this.products = products;
    this.filters = {};
  }

  /**
   * Get all products
   */
  getAll() {
    return [...this.products];
  }

  /**
   * Get product by ID
   */
  getById(id) {
    return this.products.find(product => product.id === id);
  }

  /**
   * Search products by name and description
   */
  search(query) {
    if (!query) return this.getAll();

    const lowerQuery = query.toLowerCase();
    return this.products.filter(product =>
      product.name.toLowerCase().includes(lowerQuery) ||
      (product.description && product.description.toLowerCase().includes(lowerQuery)) ||
      (product.category && product.category.toLowerCase().includes(lowerQuery))
    );
  }

  /**
   * Filter products by category
   */
  filterByCategory(category) {
    if (!category) return this.getAll();
    return this.products.filter(product => product.category === category);
  }

  /**
   * Filter products by price range
   */
  filterByPrice(minPrice, maxPrice) {
    return this.products.filter(product =>
      product.price >= minPrice && product.price <= maxPrice
    );
  }

  /**
   * Sort products
   */
  sort(sortBy = 'name') {
    const sorted = [...this.products];

    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        sorted.sort((a, b) => (b.id || 0) - (a.id || 0));
        break;
      default:
        break;
    }

    return sorted;
  }

  /**
   * Get unique categories
   */
  getCategories() {
    const categories = new Set(this.products.map(p => p.category).filter(Boolean));
    return Array.from(categories);
  }

  /**
   * Get price range
   */
  getPriceRange() {
    if (this.products.length === 0) {
      return { min: 0, max: 0 };
    }

    const prices = this.products.map(p => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }

  /**
   * Apply multiple filters
   */
  applyFilters(filterOptions) {
    let filtered = this.getAll();

    if (filterOptions.category) {
      filtered = filtered.filter(p => p.category === filterOptions.category);
    }

    if (filterOptions.minPrice !== undefined && filterOptions.maxPrice !== undefined) {
      filtered = filtered.filter(p =>
        p.price >= filterOptions.minPrice && p.price <= filterOptions.maxPrice
      );
    }

    if (filterOptions.search) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(filterOptions.search.toLowerCase())
      );
    }

    if (filterOptions.sortBy) {
      // Manual sort implementation
      switch (filterOptions.sortBy) {
        case 'price-asc':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'name':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
      }
    }

    return filtered;
  }

  /**
   * Add product
   */
  add(product) {
    if (!product.id || !product.name) {
      console.error('Invalid product:', product);
      return false;
    }
    this.products.push(product);
    return true;
  }

  /**
   * Update product
   */
  update(id, updates) {
    const product = this.getById(id);
    if (product) {
      Object.assign(product, updates);
      return true;
    }
    return false;
  }

  /**
   * Remove product
   */
  remove(id) {
    const index = this.products.findIndex(p => p.id === id);
    if (index > -1) {
      this.products.splice(index, 1);
      return true;
    }
    return false;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ProductManager;
}
