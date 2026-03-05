import { Router } from "express";
import * as productController from '../controllers/product.controller.js';

const router = Router();

// Home and auth pages
router.get("/", productController.productOftheDay);
router.get("/login", (req, res) => {
    res.render("login", { title: "Login" });
});
router.get("/register", (req, res) => {
    res.render("register", { title: "Register | Sign Up" });
});

// Products page
router.get("/products", productController.renderAllProducts);
router.get("/products/:id", productController.renderProductById);

export default router;