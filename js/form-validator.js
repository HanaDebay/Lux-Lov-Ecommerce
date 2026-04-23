/**
 * Form Validation Module
 * Provides real-time validation with user feedback
 */

class FormValidator {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.errors = {};
    
    if (this.form) {
      this.setupValidation();
    }
  }

  setupValidation() {
    // Real-time validation on input
    const inputs = this.form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('change', () => this.validateField(input));
      
      // Validate on input for better UX
      if (input.type !== 'checkbox' && input.type !== 'radio') {
        input.addEventListener('input', () => this.validateField(input));
      }
    });

    // Form submission
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name || field.id;
    let isValid = true;
    let errorMessage = '';

    // Check required
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = `${this.getFieldLabel(field)} is required`;
    }
    // Email validation
    else if (field.type === 'email' && value) {
      if (!this.validateEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    }
    // Phone validation
    else if (field.type === 'tel' && value) {
      if (!this.validatePhone(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
      }
    }
    // Password validation
    else if (field.type === 'password' && value) {
      const passwordValidation = this.validatePassword(value);
      if (!passwordValidation.isValid) {
        isValid = false;
        errorMessage = passwordValidation.message;
      }
    }
    // Credit card validation
    else if (field.id === 'card' && value) {
      if (!this.validateCreditCard(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid credit card number';
      }
    }
    // Postal code validation
    else if (field.id === 'postal' && value) {
      if (!this.validatePostalCode(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid postal code';
      }
    }
    // Minimum length
    else if (field.minLength && value.length > 0 && value.length < field.minLength) {
      isValid = false;
      errorMessage = `Minimum ${field.minLength} characters required`;
    }
    // Custom validation rules
    else if (field.dataset.validate) {
      const customValidation = this.customValidate(field, value);
      if (!customValidation.isValid) {
        isValid = false;
        errorMessage = customValidation.message;
      }
    }

    // Update UI
    this.updateFieldUI(field, isValid, errorMessage);
    
    // Store error
    if (isValid) {
      delete this.errors[fieldName];
    } else {
      this.errors[fieldName] = errorMessage;
    }

    return isValid;
  }

  updateFieldUI(field, isValid, errorMessage) {
    const wrapper = field.closest('.form-group') || field.parentElement;
    
    // Remove old error message if exists
    const oldError = wrapper.querySelector('.invalid-feedback');
    if (oldError) oldError.remove();

    if (isValid) {
      field.classList.remove('is-invalid');
      field.classList.add('is-valid');
    } else {
      field.classList.remove('is-valid');
      field.classList.add('is-invalid');
      
      // Add error message
      const errorElement = document.createElement('div');
      errorElement.className = 'invalid-feedback';
      errorElement.style.display = 'block';
      errorElement.textContent = errorMessage;
      wrapper.appendChild(errorElement);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.errors = {};

    // Validate all fields
    const inputs = this.form.querySelectorAll('input, textarea, select');
    let isFormValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isFormValid = false;
      }
    });

    if (isFormValid) {
      this.onSuccess();
    } else {
      this.showErrorSummary();
    }
  }

  showErrorSummary() {
    // Remove old summary if exists
    const oldSummary = this.form.querySelector('.error-summary');
    if (oldSummary) oldSummary.remove();

    const summary = document.createElement('div');
    summary.className = 'alert alert-danger error-summary fade-in';
    summary.innerHTML = `
      <strong>Please fix the following errors:</strong>
      <ul style="margin-bottom: 0; margin-top: 10px;">
        ${Object.values(this.errors).map(error => `<li>${error}</li>`).join('')}
      </ul>
    `;
    this.form.insertBefore(summary, this.form.firstChild);
    
    // Scroll to summary
    summary.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  onSuccess() {
    // Remove error summary
    const oldSummary = this.form.querySelector('.error-summary');
    if (oldSummary) oldSummary.remove();

    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'alert alert-success fade-in';
    successMessage.innerHTML = '<strong>Success!</strong> Form submitted successfully.';
    this.form.insertBefore(successMessage, this.form.firstChild);

    // Trigger custom callback or form submission
    if (this.onFormSubmit) {
      this.onFormSubmit();
    } else {
      // Auto-submit after 2 seconds
      setTimeout(() => {
        this.form.submit();
      }, 2000);
    }
  }

  // Validation methods
  validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  validatePhone(phone) {
    const regex = /^[\d\s\-\+\(\)]{7,}$/;
    return regex.test(phone.replace(/\s/g, ''));
  }

  validatePassword(password) {
    if (password.length < 8) {
      return { isValid: false, message: 'Password must be at least 8 characters' };
    }
    if (!/[A-Z]/.test(password)) {
      return { isValid: false, message: 'Password must contain an uppercase letter' };
    }
    if (!/[a-z]/.test(password)) {
      return { isValid: false, message: 'Password must contain a lowercase letter' };
    }
    if (!/[0-9]/.test(password)) {
      return { isValid: false, message: 'Password must contain a number' };
    }
    return { isValid: true };
  }

  validateCreditCard(cardNumber) {
    // Remove spaces and dashes
    const digits = cardNumber.replace(/\D/g, '');
    
    // Check length (typically 13-19 digits)
    if (digits.length < 13 || digits.length > 19) {
      return false;
    }

    // Luhn algorithm
    let sum = 0;
    let isEven = false;
    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits[i], 10);
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
      isEven = !isEven;
    }
    return sum % 10 === 0;
  }

  validatePostalCode(code) {
    // Support multiple formats: US (12345), Canada (A1A 1A1), UK (SW1A 1AA), etc.
    const regex = /^[\d\w\s\-]{3,10}$/;
    return regex.test(code);
  }

  customValidate(field, value) {
    const rule = field.dataset.validate;
    
    switch (rule) {
      case 'match':
        const matchFieldId = field.dataset.validateMatch;
        const matchField = document.getElementById(matchFieldId);
        if (matchField && value !== matchField.value) {
          return { isValid: false, message: 'Values do not match' };
        }
        break;
      case 'address':
        if (value.length < 5) {
          return { isValid: false, message: 'Please enter a valid address' };
        }
        break;
    }
    
    return { isValid: true };
  }

  getFieldLabel(field) {
    const label = document.querySelector(`label[for="${field.id}"]`);
    return label ? label.textContent : field.name || field.id;
  }

  // Public methods
  isValid() {
    return Object.keys(this.errors).length === 0;
  }

  getData() {
    const formData = new FormData(this.form);
    return Object.fromEntries(formData);
  }

  clearErrors() {
    this.errors = {};
    this.form.querySelectorAll('.is-invalid, .is-valid').forEach(field => {
      field.classList.remove('is-invalid', 'is-valid');
    });
  }

  reset() {
    this.form.reset();
    this.clearErrors();
  }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FormValidator;
}
