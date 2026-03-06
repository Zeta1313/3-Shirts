import * as productService from '../services/product.service.js';

export const renderAllProducts = async (req, res) => {
    try {
        const products = await productService.getAll();

        // Extract unique values for filters 
        const sizes = [...new Set(products.map(p => p.Size))].sort();
        const colors = [...new Set(products.map(p => p.Color))].sort();
        const brands = [...new Set(products.map(p => p.Brand))].sort();

        res.render("products", {
            title: "All Products",
            products,
            sizes,   // Pass these to the EJS template
            colors,
            brands
        });
    } catch (err) {
        console.error("Error loading products:", err);
        res.render("products", {
            title: "All Products",
            products: [],
            sizes: [],
            colors: [],
            brands: []
        });
    }
};

export const renderProductById = async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).send("Invalid product ID");

    try {
        const product = await productService.getById(id);
        if (!product) return res.render("error", { title: "404 Not Found" });

        let inStock = "Out of Stock";
        if (product.Stock) {
            inStock = "In Stock";
        }
        res.render("product-detail", { title: product.Name, product, Stock: inStock });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};

export const restApi = async (req, res) => {
    try {
        const products = await productService.filterProducts(req.query);
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Database query failed" });
    }
}

export const registerPage = (req, res) => {
    res.render("register", { title: "Register | Sign Up" });
}

export const loginPage = (req, res) => {
    res.render("login", { title: "Login" });
}


export const HomePage = async (req, res) => {
    if (!req.session.featuredProductId) {
        const products = await productService.getAll();
        req.session.featuredProductId = Math.floor(Math.random() * products.length) + 1;
    }
    const product = await productService.getById(req.session.featuredProductId);
    let inStock = "Out of Stock";
    
    if (product.Stock) {
        inStock = "In Stock";
    }

    res.render("home", {
        product: product,
        Stock: inStock,
        title: "Home | Landing Page"
    });
};