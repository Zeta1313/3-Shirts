import * as productService from '../services/product.service.js';

export const allItemsInCart = async (req, res) => {
    try {
        const cart = req.session.cart || [];
        const display = [];

        for (let i = 0; i < cart.length; i++) {
            const product = await productService.getById(cart[i].productId);

            if (product) {
                display.push({
                    ...product,
                    Quantity: cart[i].quantity
                });
            }
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

        const cart = req.session.cart;
        const existingItem = cart.find(item => item.productId === Number(productId));

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                productId: Number(productId),
                quantity: 1
            });
        }

        return res.status(200).json({
            success: true,
            message: "Item added to cart",
            cart
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

        const cart = req.session.cart;
        const item = cart.find(i => i.productId === id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Product not in cart"
            });
        }

        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            req.session.cart = cart.filter(i => i.productId !== id);
        }

        return res.status(200).json({
            success: true,
            message: "Item updated",
            cart: req.session.cart
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error removing item"
        });
    }
};