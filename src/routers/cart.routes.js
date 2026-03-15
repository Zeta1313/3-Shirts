import { Router } from "express";
import * as cartController from '../controllers/cart.controller.js';
import { requireAuth } from "../controllers/auth.controller.js";

const router = Router();

// protect api cart routes using isLoggedIn middleware
router.get("/api/cart", requireAuth, cartController.allItemsInCart);
router.post("/api/cart/items", requireAuth, cartController.addItemToCart);
router.delete("/api/cart/items/:productId", requireAuth, cartController.deleteItemFromCart);
router.post("/api/cart/clear", requireAuth, cartController.clearCart);

export default router;