const grid = document.querySelector('.products-grid');
const productsCount = document.querySelector("#productCount");
const filters = ['sizeSelect', 'colorSelect', 'brandSelect', 'sortSelect'];

const updateProducts = async () => {
    // Build Query String
    const params = new URLSearchParams({
        size: document.getElementById('sizeSelect').value,
        color: document.getElementById('colorSelect').value,
        brand: document.getElementById('brandSelect').value,
        sort: document.getElementById('sortSelect').value
    });

    // Fetch JSON
    const response = await fetch(`/api/products?${params.toString()}`);
    const products = await response.json();

    grid.innerHTML = ''; // Clear current products
    
    if (products.length === 0) {
        grid.innerHTML = '<div class="empty-state"><h4>No products found matching those filters.</h4></div>';
        productsCount.innerHTML = 'No products to show';
        return;
    }

    products.forEach(product => {
        const card = `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.Image || '/images/PlainShirt.png'}" alt="${product.Name}">
                </div>
                <h3 class="product-title">${product.Name}</h3>
                <p class="product-price">$${Number(product.Price).toFixed(2)}</p>
                <p class="product-desc">${product.Description}</p>
                <div class="product-meta">
                    <span class="pill">${product.Brand}</span>
                    <span class="pill">${product.Size}</span>
                    <span class="pill">${product.Color}</span>
                </div>
                <div class="product-actions">
                    <a class="view-btn" href="/products/${product.ID}">View product</a>
                    <a class="add-to-cart-btn" data-id="${product.ID}">Add to cart</a>
                </div>
            </div>`;
        grid.insertAdjacentHTML('beforeend', card);
    });
    
    document.getElementById('productCount').innerHTML = `Showing <strong>${products.length}</strong> products`;
    document.querySelectorAll(".add-to-cart-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            addToCart(btn.dataset.id);
        });
    });
};

// Attach listeners
filters.forEach(id => {
    document.getElementById(id).addEventListener('change', updateProducts);
});

document.getElementById('clearFilters').addEventListener('click', () => {
    filters.forEach(id => document.getElementById(id).value = id === 'sortSelect' ? 'price_asc' : 'All');
    updateProducts();
});