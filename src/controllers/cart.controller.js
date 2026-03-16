export const allItemsInCart = async (req, res) => {
    try {
        const cart = req.session.cart || [];
        const display = [];
        for (let i = 0; i < cart.length; i++) {
            display.push(await productService.getById(cart[i]));
        }
        res.render("cart", {
            title: "cart",
            display
        });
    } catch (err) {
        console.error("Error loading cart", err);
        res.render("products", {
            title: "cart",
            display: []
        });
    }
};

export const addItemToCart = async (req, res) => {
    const item = req.params.id;
    if (!req.session.cart) {
        const cart = [];
        cart[0] = item;
        req.session.cart = cart;
    }
    else {
        req.session.cart.push(item);
    }
    res.status(200);
};

export const clearCart = async (req, res) => {
    try {
        req.session.cart = [];
        res.status(200);
    } catch (err) {
        console.error("Error clearing cart", err);
        res.render("Error clearing cart");
    }
};

export const deleteItemFromCart = async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).send("Invalid product ID");

    try {
        return res.status(200).json({});
    } catch (err) {
        return res.status(401).json({});
    }
};
