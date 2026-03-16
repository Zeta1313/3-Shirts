import * as productService from '../services/product.service.js';

export const allItemsInCart = async (req, res) => {
    try {
        const cart = req.session.cart || [];
        const display = [];

        for (let i = 0; i < cart.length; i++) {
            display.push(await productService.getById(cart[i]));
        }

        return res.status(200).json({
            success: true,
            cart: display
        });

    } catch (err) {
        console.error("Error loading cart", err);

        return res.status(500).json({
            success: false,
            message: "Error loading cart"
        });
    }
};

export const addItemToCart = async (req, res) => {
    try {
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "productId required"
            });
        }

        if (!req.session.cart) {
            req.session.cart = [];
        }

        req.session.cart.push(Number(productId));

        return res.status(200).json({
            success: true,
            message: "Item added to cart",
            cart: req.session.cart
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Error adding item"
        });
    }
};

export const clearCart = async (req, res) => {
    try {
        req.session.cart = [];

        return res.status(200).json({
            success: true,
            message: "Cart cleared"
        });

    } catch (err) {
        console.error("Error clearing cart", err);

        return res.status(500).json({
            success: false,
            message: "Error clearing cart"
        });
    }
};

export const deleteItemFromCart = async (req, res) => {
    try {
        const id = Number(req.params.productId);

        if (!req.session.cart) {
            return res.status(400).json({
                success: false,
                message: "Cart not found"
            });
        }

        const index = req.session.cart.indexOf(id);

        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: "Product not in cart"
            });
        }

        req.session.cart.splice(index, 1);

        return res.status(200).json({
            success: true,
            message: "Item removed",
            cart: req.session.cart
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error removing item"
        });
    }
};