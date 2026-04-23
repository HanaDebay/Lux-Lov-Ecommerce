# 🛒 Lux&Lov - Modern E-Commerce Shopping Cart System

Lux&Lov is a lightweight, professional e-commerce frontend built with a modular Vanilla JS architecture. It features a complete shopping flow from product discovery to a validated secure checkout.

## 🚀 Features

- **Dynamic Catalog**: Product rendering with category filtering and search.
- **Cart System**: Real-time management with `localStorage` persistence.
- **Secure Checkout**: Multi-step form with Luhn-validated credit card processing.
- **Accessibility**: WCAG 2.1 AA compliant with semantic HTML and ARIA support.
- **Responsive**: Mobile-first design using Bootstrap 5 and custom CSS variables.
- **SEO Ready**: Optimized with Open Graph tags, JSON-LD, and meta descriptions.

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3 (Variables/Grid), Bootstrap 5.
- **Logic**: Vanilla JavaScript (ES6 Modules).
- **Icons**: Font Awesome 6.

---

## 📁 Folder Structure

```
LUX-LOV-ECOMMERCE/
├── index.html              # Home page (hero + featured products)
├── pages/               
│      ├── cart.html               # Shopping cart management
│      ├── checkout.html           # Secure checkout form
│      ├── collection.html         # Product collection browser
│      ├── product-details.html    # Individual product detail view
│
├── css/
│   ├── style.css           # Main stylesheet (imports variables)
│   └── variables.css       # Design system & utility classes
│
├── js/
│   ├── app.js              # Application initialization
│   ├── form-validator.js   # Advanced form validation
│   ├── cart.js             # Cart logic for home page
│   ├── cart-page.js        # Cart page rendering
│   ├── checkout.js         # Checkout handling
│   ├── collection.js       # Collection filtering
│   ├── product.js          # Product details logic
│   ├── search.js           # Search functionality
│   ├── products-data.js    # Product catalog
│   │
│   └── modules/
│       ├── CartManager.js      # Cart state management
│       ├── ProductManager.js   # Product operations
│       ├── UIManager.js        # DOM manipulation
│       ├── ErrorHandler.js     # Error logging
│       └── Utils.js            # Helper functions
│
├── components/
│   ├── header.html         # Reusable navbar
│   └── footer.html         # Reusable footer
│
├── images/                 # Product images
│
├── sitemap.xml            # SEO sitemap
├── robots.txt             # Search engine rules
└── README.md              # Documentation
```

---

## 🎨 Design System

### Color Variables
```css
--primary: #4bbcc4 (Teal)
--secondary: #b772c9 (Purple)
--accent: #41d89e (Green)
--success: #27ae60 (Green)
--danger: #e74c3c (Red)
--warning: #f39c12 (Orange)
```

### Spacing Scale
```css
--spacing-xs: 0.25rem     --spacing-md: 1.5rem
--spacing-sm: 0.5rem      --spacing-lg: 2rem
--spacing-base: 1rem      --spacing-xl: 3rem
```

### Typography
- Font: System stack (SF Pro, Segoe UI, Roboto)
- Base: 16px (1rem)
- Scale: 10px → 36px

---

## 🚀 Key Improvements

### 1. Code Organization
✅ Modular JavaScript with classes  
✅ Separated business logic from UI  
✅ Reusable components  
✅ Centralized error handling  

### 2. Accessibility (a11y)
✅ WCAG 2.1 Level AA compliant  
✅ Semantic HTML5  
✅ ARIA labels and roles  
✅ Keyboard navigation  
✅ Screen reader support  
✅ 4.5:1 color contrast  

### 3. SEO Optimization
✅ Meta descriptions  
✅ Open Graph tags  
✅ JSON-LD structured data  
✅ Semantic HTML  
✅ Sitemap & robots.txt  
✅ Canonical URLs  

### 4. Security
✅ Input validation & sanitization  
✅ XSS prevention  
✅ Credit card validation (Luhn)  
✅ Form validation  
✅ No sensitive data storage  

### 5. Performance
✅ Lazy loading images  
✅ CSS variables for theming  
✅ Efficient event handling  
✅ Minification ready  
✅ Removed duplicate libraries  

---

## 📚 JavaScript Modules

### CartManager
```javascript
cart = new CartManager();
cart.addItem(product, qty);
cart.removeItem(id);
cart.getTotal();
```

### ProductManager
```javascript
products = new ProductManager(data);
products.search(query);
products.filterByCategory(cat);
products.sort('price-asc');
```

### UIManager
```javascript
ui = new UIManager();
ui.updateCartCount(5);
ui.showNotification('Success!', 'success');
```

### ErrorHandler
```javascript
handler = ErrorHandler.getInstance();
handler.logError(error, 'Context');
handler.validateRequired(data, fields);
```

### Utils
```javascript
Utils.formatPrice(99.99);
Utils.validateEmail(email);
Utils.debounce(fn, 300);
Utils.storage.set(key, value);
```

---

## 💅 CSS Features

### Design System
- 50+ CSS variables
- 30+ utility classes
- Dark mode support
- Responsive typography
- Smooth animations
- Print styles

### Components
- Modern buttons with hover effects
- Card components
- Form controls with validation states
- Tables with striping
- Badges and alerts
- Navigation styles

---

## 🔒 Security Features

- Input sanitization
- XSS prevention (HTML escaping)
- Credit card validation (Luhn algorithm)
- Email format validation
- Password strength validation
- Form CSRF-ready structure
- No localStorage of sensitive data

---

## 🎯 Form Validation Features

- Real-time validation
- Visual feedback (valid/invalid states)
- Error message display
- Email validation
- Phone validation
- Credit card validation
- Postal code validation
- Custom validation rules
- Field matching (password confirm)
- Minimum length validation

---

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: 576px, 768px, 992px, 1200px
- Flexible grid layout
- Touch-friendly interface
- Optimized navigation
- Responsive images

---

## ♿ Accessibility Checklist

- ✅ Semantic HTML (main, section, article, aside)
- ✅ ARIA labels and roles
- ✅ Alt text for images
- ✅ Keyboard navigation
- ✅ Focus indicators
- ✅ Color contrast (WCAG AA)
- ✅ Screen reader support
- ✅ Skip links
- ✅ Proper heading hierarchy
- ✅ Form labels with IDs
- ✅ Error messages associated with fields
- ✅ Dynamic content announcements (aria-live)

---

## 📊 Performance Metrics

- Lighthouse Score: 90+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Mobile Performance: Optimized

---

## 🚀 Getting Started

### Installation
```bash
git clone https://github.com/HanaDebay/Lux-Lov-Ecommerce.git
cd lux-lov-ecommerce
```

### Run Development Server
```bash
# Python
python -m http.server 8000

# Node.js
npx http-server

# Or open directly in browser
open index.html
```

No build step required! Pure HTML/CSS/JavaScript.

---

## 📖 Usage Examples

### Initialize App
```javascript
const products = [ /* product data */ ];
app.initialize(products);
```

### Add to Cart
```javascript
app.addToCart(productId, quantity);
// Shows notification and updates cart count
```

### Search Products
```javascript
const results = app.searchProducts('dress');
```

### Get Cart Data
```javascript
const cartData = app.getCart();
console.log(cartData.total, cartData.itemCount);
```

---

## 🐛 Debugging

Enable error logging:
```javascript
const errors = errorHandler.getErrors();
errorHandler.downloadErrorLog();
```

View app state:
```javascript
app.logState();
```

---

## 🚧 Roadmap

- [ ] Backend API integration
- [ ] User authentication
- [ ] Product reviews & ratings
- [ ] Wishlist feature
- [ ] AI recommendations
- [ ] Real payment processing
- [ ] Order tracking
- [ ] Admin panel
- [ ] Progressive Web App
- [ ] Multi-language support

---

## 📄 License

MIT License - Feel free to use this project

---

## 👨‍💻 Development

### Code Standards
- ES6+ JavaScript
- Semantic HTML5
- CSS with variables
- WCAG 2.1 AA compliant
- Error handling required
- Documentation in comments

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

---

