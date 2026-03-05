import { Router } from "express";
import * as productController from '../controllers/product.controller.js';

const router = Router();

// Home and auth pages
router.get("/", productController.productOftheDay);
router.get("/login", productController.loginPage);
router.get("/register", productController.registerPage);

// Products page
router.get("/products", productController.renderAllProducts);
router.get("/products/:id", productController.renderProductById);
router.get('/api/products', productController.restApi);

export default router;