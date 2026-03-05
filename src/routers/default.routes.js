import { Router } from "express";
import * as productController from '../controllers/product.controller.js';

const router = Router();

// Home and auth pages
router.get("/", (req, res) => {
    res.render("home", { title: "Home | Landing Page" });
});
router.get("/login", (req, res) => {
    res.render("login", { title: "Login" });
});
router.get("/register", (req, res) => {
    res.render("register", { title: "Register | Sign Up" });
});

// Products page
router.get("/products", productController.renderAllProducts);
router.get("/products/:id", productController.renderProductById);
router.get('/api/products', productController.restApi);

export default router;