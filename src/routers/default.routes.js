import { Router } from "express";
import * as productController from '../controllers/product.controller.js';
import authController, { isLoggedIn, logout, requireAuth } from "../controllers/auth.controller.js";

const router = Router();

// Home and auth pages
router.get("/", productController.HomePage);

router.get("/login", authController.loginPage);
router.post("/login", authController.login);

router.get("/register", authController.registerPage);
router.post("/register", authController.register);

// Products page
router.get("/products", isLoggedIn, productController.renderAllProducts);
router.get("/products/:id", isLoggedIn, productController.renderProductById);
router.get("/api/products", requireAuth, productController.restApi);

router.get("/recent", isLoggedIn, productController.RecentPage);

router.get("/logout", logout);

export default router;