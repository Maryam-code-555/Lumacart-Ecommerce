
const productsData = [
    {
        id: 1,
        name: "Minimal Leather Backpack",
        category: "Accessories",
        price: 89,
        rating: 5,
        badge: "BESTSELLER",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
        description: "Crafted from full-grain vegetable-tanned leather, this minimalist backpack features a dedicated laptop sleeve and durable brass hardware built for everyday urban commuting."
    },
    {
        id: 2,
        name: "Classic Everyday Sneakers",
        category: "Fashion",
        price: 74,
        rating: 4,
        badge: "NEW",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80",
        description: "Sleek, lightweight, and engineered for all-day comfort. Made with sustainable canvas and recycled rubber outsoles for the modern minimalist."
    },
    {
        id: 3,
        name: "Essential Smart Watch",
        category: "Tech",
        price: 129,
        rating: 5,
        badge: "BESTSELLER",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
        description: "Seamlessly track your fitness, heart rate, and notifications with an ultra-crisp AMOLED display and premium titanium finish casing."
    },
    {
        id: 4,
        name: "Premium Wireless Headphones",
        category: "Tech",
        price: 149,
        rating: 5,
        badge: "NEW",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
        description: "Immersive active noise cancellation paired with studio-quality acoustic drivers. Designed with plush memory foam ear cushions for extended listening."
    },
    {
        id: 5,
        name: "Everyday Canvas Tote",
        category: "Lifestyle",
        price: 45,
        rating: 4,
        badge: "",
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
        description: "A sturdy, spacious everyday canvas bag designed for weekend markets, library runs, or quick daily getaways."
    },
    {
        id: 6,
        name: "Minimalist Wallet",
        category: "Accessories",
        price: 39,
        rating: 4,
        badge: "",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80",
        description: "RFID-blocking slim leather cardholder designed to fit comfortably in your front pocket without bulk."
    },
    {
        id: 7,
        name: "Urban Travel Bottle",
        category: "Lifestyle",
        price: 32,
        rating: 5,
        badge: "",
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",
        description: "Double-wall vacuum insulated stainless steel water bottle keeps your beverages ice-cold for 24 hours or piping hot for 12 hours."
    },
    {
        id: 8,
        name: "Classic Sunglasses",
        category: "Fashion",
        price: 59,
        rating: 4,
        badge: "NEW",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
        description: "Timeless frame geometry equipped with 100% UV-protected polarized lenses for glare-free clarity."
    }
];

// Application State
let cart = [];
let wishlist = [];

// DOM Elements
const hamburger = document.getElementById('hamburger');
const navbar = document.getElementById('navbar');
const searchToggleBtn = document.getElementById('searchToggleBtn');
const searchOverlay = document.getElementById('searchOverlay');
const closeSearch = document.getElementById('closeSearch');
const searchInput = document.getElementById('searchInput');
const searchResultsContainer = document.getElementById('searchResultsContainer');

const cartToggleBtn = document.getElementById('cartToggleBtn');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartFooter = document.getElementById('cartFooter');
const cartCount = document.getElementById('cartCount');
const cartDrawerCount = document.getElementById('cartDrawerCount');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartTotal = document.getElementById('cartTotal');

const wishlistBtn = document.getElementById('wishlistBtn');
const wishlistCount = document.getElementById('wishlistCount');

const productsGrid = document.getElementById('productsGrid');
const newArrivalsGrid = document.getElementById('newArrivalsGrid');
const productCount = document.getElementById('productCount');
const filterBtns = document.querySelectorAll('.filter-btn');

const productModal = document.getElementById('productModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const closeModal = document.getElementById('closeModal');
const modalGrid = document.getElementById('modalGrid');

const backToTopBtn = document.getElementById('backToTopBtn');
const newsletterForm = document.getElementById('newsletterForm');
const newsletterSuccess = document.getElementById('newsletterSuccess');
const contactForm = document.getElementById('contactForm');
const contactSuccess = document.getElementById('contactSuccess');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(productsData, productsGrid);
    renderNewArrivals();
    setupEventListeners();
});

// Setup All Event Listeners
function setupEventListeners() {
    // 1. Mobile Hamburger Menu
    hamburger.addEventListener('click', () => {
        navbar.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // 2. Search Functionality Overlay
    searchToggleBtn.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        searchInput.focus();
    });

    closeSearch.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
    });

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query === '') {
            searchResultsContainer.innerHTML = '<p class="search-placeholder-text">Type something to search our catalog...</p>';
            return;
        }
        const filtered = productsData.filter(p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));
        renderSearchResults(filtered);
    });

    // 3. Shopping Cart Drawer
    cartToggleBtn.addEventListener('click', () => {
        cartDrawer.classList.add('active');
        cartOverlay.classList.add('active');
    });

    closeCart.addEventListener('click', closeCartDrawer);
    cartOverlay.addEventListener('click', closeCartDrawer);

    // 4. Category Filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            const category = e.target.getAttribute('data-filter');
            if (category === 'all') {
                renderProducts(productsData, productsGrid);
                productCount.textContent = productsData.length;
            } else {
                const filtered = productsData.filter(p => p.category === category);
                renderProducts(filtered, productsGrid);
                productCount.textContent = filtered.length;
            }
        });
    });

    // Category Cards Click from Home section
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const cat = card.getAttribute('data-category');
            filterBtns.forEach(b => {
                if(b.getAttribute('data-filter') === cat) {
                    b.click();
                }
            });
            document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // 5. Modal Close Handlers
    modalBackdrop.addEventListener('click', closeModalFn);
    closeModal.addEventListener('click', closeModalFn);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModalFn();
            searchOverlay.classList.remove('active');
            closeCartDrawer();
        }
    });

    // 6. Back to Top Button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 7. Newsletter Form Validation
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('newsletterEmail');
        if (emailInput.value.trim() !== '') {
            newsletterSuccess.style.display = 'block';
            newsletterForm.reset();
            setTimeout(() => {
                newsletterSuccess.style.display = 'none';
            }, 4000);
        }
    });

    // 8. Contact Form Validation
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const subject = document.getElementById('contactSubject').value.trim();
        const message = document.getElementById('contactMessage').value.trim();

        if (name && email && subject && message) {
            contactSuccess.style.display = 'block';
            contactForm.reset();
            setTimeout(() => {
                contactSuccess.style.display = 'none';
            }, 4000);
        }
    });
}

// Close Cart Helper
function closeCartDrawer() {
    cartDrawer.classList.remove('active');
    cartOverlay.classList.remove('active');
}

// Render Products Grid
function renderProducts(products, container) {
    if (products.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--secondary);">No products found.</p>';
        return;
    }

    container.innerHTML = products.map(product => {
        const isWishlisted = wishlist.some(item => item.id === product.id);
        return `
            <div class="product-card">
                ${product.badge ? `<span class="product-badge ${product.badge === 'BESTSELLER' ? 'bestseller' : ''}">${product.badge}</span>` : ''}
                <button class="wishlist-icon-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist(${product.id})" aria-label="Wishlist">
                    <i class="${isWishlisted ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}"></i>
                </button>
                <div class="product-img-box" onclick="openProductModal(${product.id})">
                    <img src="${product.image}" alt="${product.name}">
                    <button class="quick-view-trigger">Quick View</button>
                </div>
                <div class="product-details">
                    <span class="product-category-text">${product.category}</span>
                    <h3 class="product-title" onclick="openProductModal(${product.id})">${product.name}</h3>
                    <div class="product-rating">
                        ${getStarRatingHTML(product.rating)}
                    </div>
                    <div class="product-bottom-row">
                        <span class="product-price">$${product.price}</span>
                        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Render New Arrivals (Just In - 4 products)
function renderNewArrivals() {
    const newItems = productsData.filter(p => p.badge === 'NEW').slice(0, 4);
    renderProducts(newItems, newArrivalsGrid);
}

// Star Rating Helper
function getStarRatingHTML(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fa-solid fa-star"></i>';
        } else {
            stars += '<i class="fa-regular fa-star"></i>';
        }
    }
    return stars;
}

// Search Results Renderer
function renderSearchResults(results) {
    if (results.length === 0) {
        searchResultsContainer.innerHTML = '<p class="search-placeholder-text">No products found.</p>';
        return;
    }

    searchResultsContainer.innerHTML = results.map(product => `
        <div class="cart-item-card" style="cursor: pointer;" onclick="openProductModal(${product.id}); searchOverlay.classList.remove('active');">
            <img src="${product.image}" alt="${product.name}" class="cart-item-img">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${product.name}</h4>
                <p class="cart-item-price">$${product.price} • ${product.category}</p>
            </div>
        </div>
    `).join('');
}

// Wishlist Toggle
function toggleWishlist(productId) {
    const product = productsData.find(p => p.id === productId);
    const index = wishlist.findIndex(item => item.id === productId);

    if (index > -1) {
        wishlist.splice(index, 1);
    } else {
        wishlist.push(product);
    }

    wishlistCount.textContent = wishlist.length;
    renderProducts(productsData, productsGrid);
    renderNewArrivals();
}

// Add to Cart
function addToCart(productId, quantity = 1) {
    const product = productsData.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity: quantity });
    }

    updateCartUI();
    cartDrawer.classList.add('active');
    cartOverlay.classList.add('active');
}

// Update Cart UI & Totals
function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartDrawerCount.textContent = totalItems;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Your cart is currently empty.</div>';
        cartFooter.style.display = 'none';
        return;
    }

    cartFooter.style.display = 'block';
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item-card">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">$${item.price}</p>
                <div class="cart-item-controls">
                    <div class="quantity-selector">
                        <button onclick="changeQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQuantity(${item.id}, 1)">+</button>
                    </div>
                    <button class="remove-cart-item" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        </div>
    `).join('');

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    cartTotal.textContent = `$${subtotal.toFixed(2)}`;
}

// Change Quantity in Cart
function changeQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Product Quick View Modal
function openProductModal(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;

    modalGrid.innerHTML = `
        <div class="modal-img-box">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="modal-details">
            <span class="product-category-text">${product.category}</span>
            <h2>${product.name}</h2>
            <div class="product-rating" style="margin-bottom: 16px;">
                ${getStarRatingHTML(product.rating)}
            </div>
            <div class="modal-price">$${product.price}</div>
            <p class="modal-desc">${product.description}</p>
            <div class="modal-actions">
                <div class="quantity-selector" style="height: 48px;">
                    <button onclick="adjustModalQty(-1)">-</button>
                    <span id="modalQty" style="padding: 0 16px; font-size: 1rem;">1</span>
                    <button onclick="adjustModalQty(1)">+</button>
                </div>
                <button class="btn btn-primary" onclick="addModalToCart(${product.id})" style="flex-grow: 1; padding: 14px 20px;">Add to Cart</button>
            </div>
        </div>
    `;

    productModal.classList.add('active');
}

let modalCurrentQty = 1;
function adjustModalQty(delta) {
    modalCurrentQty += delta;
    if (modalCurrentQty < 1) modalCurrentQty = 1;
    const qtySpan = document.getElementById('modalQty');
    if (qtySpan) qtySpan.textContent = modalCurrentQty;
}

function addModalToCart(productId) {
    addToCart(productId, modalCurrentQty);
    closeModalFn();
    modalCurrentQty = 1;
}

function closeModalFn() {
    productModal.classList.remove('active');
    modalCurrentQty = 1;
}