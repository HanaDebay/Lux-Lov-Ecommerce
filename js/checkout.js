// Load cart items for summary
function loadOrderSummary() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const summaryList = document.getElementById("order-summary");
    let total = 0;

    if (cart.length === 0) {
        summaryList.innerHTML = '<li class="list-group-item text-muted">Your cart is empty</li>';
        document.getElementById("summary-total").textContent = "0.00";
        return;
    }

    summaryList.innerHTML = "";

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.innerHTML = `
            <span>${item.name} <small class="text-muted">x${item.quantity}</small></span>
            <span class="badge bg-primary rounded-pill">$${subtotal.toFixed(2)}</span>
        `;
        summaryList.appendChild(listItem);
    });

    // Add shipping (static for demo)
    const shippingCost = 5.00;
    const shippingItem = document.createElement('li');
    shippingItem.className = 'list-group-item d-flex justify-content-between align-items-center';
    shippingItem.innerHTML = `
        <span>Shipping</span>
        <span class="badge bg-secondary rounded-pill">$${shippingCost.toFixed(2)}</span>
    `;
    summaryList.appendChild(shippingItem);

    total += shippingCost;
    document.getElementById("summary-total").textContent = total.toFixed(2);
}

// Initialize form validator when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadOrderSummary();
    updateCartCount();

    // Initialize form validator with custom submission handler
    const validator = new FormValidator('checkout-form');
    
    validator.onFormSubmit = function() {
        handleCheckoutSubmission(validator);
    };
});

// Handle checkout submission
function handleCheckoutSubmission(validator) {
    try {
        const formData = validator.getData();
        
        // Simulate API call
        console.log('Processing order:', formData);
        
        // Clear cart
        localStorage.removeItem("cart");
        
        // Show success message and redirect
        showNotification('Order placed successfully! Redirecting to home page...', 'success');
        
        setTimeout(() => {
            window.location.href = "index.html";
        }, 3000);
        
    } catch (error) {
        console.error('Checkout error:', error);
        showNotification('An error occurred. Please try again.', 'error');
    }
}

// Show notification toast
function showNotification(message, type = 'info') {
    const alertClass = `alert-${type}`;
    const notification = document.createElement('div');
    notification.className = `alert ${alertClass} alert-dismissible fade show position-fixed`;
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}
