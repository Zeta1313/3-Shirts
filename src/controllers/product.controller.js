import * as productService from '../services/product.service.js';

export const renderAllProducts = async (req, res) => {
    try {
        const products = await productService.getAll();
        res.render("products", {
            title: "All Products",
            products
        });
    } catch (err) {
        console.error("Error loading products:", err);
        res.render("products", {
            title: "All Products",
            products: []
        });
    }
};

export const renderProductById = async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).send("Invalid product ID");

    try {
        const product = await productService.getById(id);
        if (!product) return res.render("error", {title: "404 Not Found"});

        res.render("product-detail", { title: product.Name, product });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};