/**
 * Error Handler Module
 * Centralized error handling, logging, and recovery
 */

class ErrorHandler {
  static instance = null;
  
  constructor() {
    this.errors = [];
    this.maxErrors = 50;
    this.isDevelopment = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    this.setupGlobalErrorHandlers();
  }

  /**
   * Get singleton instance
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new ErrorHandler();
    }
    return this.instance;
  }

  /**
   * Setup global error handlers
   */
  setupGlobalErrorHandlers() {
    // Handle uncaught errors
    window.addEventListener('error', (event) => {
      this.logError(event.error, 'Uncaught Error');
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.logError(event.reason, 'Unhandled Promise Rejection');
    });
  }

  /**
   * Log error with context
   */
  logError(error, context = 'Error', severity = 'error') {
    try {
      const errorRecord = {
        timestamp: new Date().toISOString(),
        message: error?.message || String(error),
        stack: error?.stack || '',
        context: context,
        severity: severity,
        url: window.location.href,
        userAgent: navigator.userAgent,
        customData: null
      };

      this.errors.push(errorRecord);

      // Keep only recent errors
      if (this.errors.length > this.maxErrors) {
        this.errors.shift();
      }

      // Log to console in development
      if (this.isDevelopment) {
        console[severity](`[${context}]`, error);
      }

      // Send to server (example implementation)
      if (!this.isDevelopment && severity === 'error') {
        this.sendToServer(errorRecord);
      }

      return errorRecord;

    } catch (e) {
      console.error('Error logging failed:', e);
    }
  }

  /**
   * Log warning
   */
  logWarning(message, context = 'Warning') {
    return this.logError(new Error(message), context, 'warn');
  }

  /**
   * Log info
   */
  logInfo(message, context = 'Info') {
    return this.logError(new Error(message), context, 'info');
  }

  /**
   * Send error to server (for production monitoring)
   */
  sendToServer(errorRecord) {
    // This would send to an error tracking service like Sentry, LogRocket, etc.
    // Example implementation:
    /*
    fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorRecord)
    }).catch(err => console.error('Failed to send error to server:', err));
    */
  }

  /**
   * Get all recorded errors
   */
  getErrors() {
    return [...this.errors];
  }

  /**
   * Clear error logs
   */
  clearErrors() {
    this.errors = [];
  }

  /**
   * Export errors for debugging
   */
  exportErrors() {
    return {
      errors: this.getErrors(),
      exportDate: new Date().toISOString(),
      url: window.location.href
    };
  }

  /**
   * Download error log
   */
  downloadErrorLog() {
    const data = this.exportErrors();
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `error-log-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /**
   * Create safe error handler for callbacks
   */
  safeExecute(callback, context = 'Callback') {
    return (...args) => {
      try {
        return callback(...args);
      } catch (error) {
        this.logError(error, context);
        throw error;
      }
    };
  }

  /**
   * Create safe async error handler
   */
  safeAsync(asyncFn, context = 'Async Operation') {
    return async (...args) => {
      try {
        return await asyncFn(...args);
      } catch (error) {
        this.logError(error, context);
        throw error;
      }
    };
  }

  /**
   * Validate required fields
   */
  validateRequired(data, requiredFields) {
    const missing = [];
    
    requiredFields.forEach(field => {
      if (!data[field]) {
        missing.push(field);
      }
    });

    if (missing.length > 0) {
      const error = new Error(`Missing required fields: ${missing.join(', ')}`);
      this.logError(error, 'Validation Error');
      return false;
    }

    return true;
  }

  /**
   * Validate data types
   */
  validateTypes(data, schema) {
    const errors = [];

    for (const [field, expectedType] of Object.entries(schema)) {
      const value = data[field];
      const actualType = typeof value;

      if (actualType !== expectedType) {
        errors.push(`Field "${field}" should be ${expectedType} but got ${actualType}`);
      }
    }

    if (errors.length > 0) {
      const error = new Error(errors.join('; '));
      this.logError(error, 'Type Validation Error');
      return false;
    }

    return true;
  }

  /**
   * Create retry handler
   */
  createRetryHandler(fn, options = {}) {
    const {
      maxRetries = 3,
      delay = 1000,
      backoff = 2,
      context = 'Retry Operation'
    } = options;

    return async (...args) => {
      let lastError;
      let currentDelay = delay;

      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          return await fn(...args);
        } catch (error) {
          lastError = error;
          this.logWarning(
            `Attempt ${attempt}/${maxRetries} failed: ${error.message}`,
            context
          );

          if (attempt < maxRetries) {
            await new Promise(resolve => setTimeout(resolve, currentDelay));
            currentDelay *= backoff;
          }
        }
      }

      this.logError(
        lastError,
        `${context} - All retries exhausted`,
        'error'
      );
      throw lastError;
    };
  }
}

// Initialize global error handler
const errorHandler = ErrorHandler.getInstance();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ErrorHandler;
}
