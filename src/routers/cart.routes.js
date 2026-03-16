import { Router } from "express";
import * as cartController from '../controllers/cart.controller.js';
import { requireAuth } from "../controllers/auth.controller.js";

const router = Router();

// protect api cart routes using requireAuth middleware
router.get("/", requireAuth, cartController.allItemsInCart);
router.post("/items", requireAuth, cartController.addItemToCart);
router.delete("/items/:productId", requireAuth, cartController.deleteItemFromCart);
router.post("/clear", requireAuth, cartController.clearCart);

export default router;