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
    if (!Number.isInteger(id)) return res.render("error");

    try {
        const product = await productService.getById(id);
        if (!product) return res.render("error");

        res.render("product-detail", { title: product.Name, product });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};