/**
 * UI Manager Module
 * Handles UI updates and DOM manipulations
 */

class UIManager {
  constructor() {
    this.cartCountElement = document.getElementById('cart-count');
    this.notificationContainer = null;
  }

  /**
   * Update cart count display
   */
  updateCartCount(count) {
    if (this.cartCountElement) {
      this.cartCountElement.textContent = count;
      this.cartCountElement.style.display = count > 0 ? 'block' : 'none';
    }
  }

  /**
   * Show notification toast
   */
  showNotification(message, type = 'info', duration = 5000) {
    const alertClass = `alert-${type === 'error' ? 'danger' : type}`;
    const notification = document.createElement('div');
    notification.className = `alert ${alertClass} alert-dismissible fade show position-fixed`;
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.role = 'alert';
    notification.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    document.body.appendChild(notification);

    if (duration > 0) {
      setTimeout(() => {
        notification.remove();
      }, duration);
    }

    return notification;
  }

  /**
   * Show loading spinner
   */
  showLoading(element) {
    if (!element) return;
    const spinner = document.createElement('div');
    spinner.className = 'spinner-border spinner-border-sm me-2 loading';
    spinner.role = 'status';
    element.appendChild(spinner);
  }

  /**
   * Hide loading spinner
   */
  hideLoading(element) {
    if (!element) return;
    const spinner = element.querySelector('.loading');
    if (spinner) spinner.remove();
  }

  /**
   * Render product card
   */
  createProductCard(product, onAddToCart) {
    const article = document.createElement('article');
    article.className = 'col-lg-3 col-md-4 col-sm-6 mb-4';
    article.innerHTML = `
      <div class="card h-100 border-0 shadow-sm hover-lift">
        <img src="${this.escapeHtml(product.image)}" 
             class="card-img-top" 
             alt="${this.escapeHtml(product.name)} - $${product.price.toFixed(2)}"
             loading="lazy"
             style="object-fit: cover; height: 250px;">
        <div class="card-body d-flex flex-column">
          <h3 class="card-title">${this.escapeHtml(product.name)}</h3>
          <p class="card-text fw-bold text-primary" aria-label="Price">$${product.price.toFixed(2)}</p>
          <div class="mt-auto">
            <button class="btn btn-primary w-100 mb-2" 
                    onclick="onAddToCart && onAddToCart(${product.id})"
                    aria-label="Add ${this.escapeHtml(product.name)} to shopping cart">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
    return article;
  }

  /**
   * Render cart item row
   */
  createCartRow(item, onUpdateQuantity, onRemove) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${this.escapeHtml(item.image)}" 
               alt="${this.escapeHtml(item.name)} product image" 
               width="60" style="object-fit: cover;"></td>
      <td>${this.escapeHtml(item.name)}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>
        <label for="qty-${item.id}" class="visually-hidden">Quantity for ${this.escapeHtml(item.name)}</label>
        <input type="number" 
               id="qty-${item.id}" 
               min="1" 
               value="${item.quantity}" 
               class="form-control w-50" 
               onchange="onUpdateQuantity && onUpdateQuantity(${item.id}, this.value)"
               aria-label="Change quantity for ${this.escapeHtml(item.name)}">
      </td>
      <td>$${(item.price * item.quantity).toFixed(2)}</td>
      <td>
        <button class="btn btn-danger btn-sm" 
                onclick="onRemove && onRemove(${item.id})"
                aria-label="Remove ${this.escapeHtml(item.name)} from cart">
          Remove
        </button>
      </td>
    `;
    return row;
  }

  /**
   * Escape HTML special characters (XSS prevention)
   */
  escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, char => map[char]);
  }

  /**
   * Show/hide element
   */
  toggleElement(element, show) {
    if (!element) return;
    if (show) {
      element.style.display = '';
      element.classList.remove('d-none');
    } else {
      element.classList.add('d-none');
    }
  }

  /**
   * Clear element content
   */
  clear(element) {
    if (element) {
      element.innerHTML = '';
    }
  }

  /**
   * Add class to element
   */
  addClass(element, className) {
    if (element && className) {
      element.classList.add(className);
    }
  }

  /**
   * Remove class from element
   */
  removeClass(element, className) {
    if (element && className) {
      element.classList.remove(className);
    }
  }

  /**
   * Animate element
   */
  animate(element, animationClass = 'fade-in') {
    if (!element) return;
    element.classList.add(animationClass);
    setTimeout(() => {
      element.classList.remove(animationClass);
    }, 500);
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = UIManager;
}
