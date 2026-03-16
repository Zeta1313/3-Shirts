export const allItemsInCart = async (req, res) => {
    try {
        const cart = req.session.cart;
        const display = [];
        for (let i = 0; i < cart.length; i++) {
            if (!display.length == 0) display[req.session.cart.length+1] = await productService.getById(cart[i]);
            else display[0] = await productService.getById(cart[i]);
        }
        res.render("cart", {
            title: "cart",
            display
        });
    } catch (err) {
        return res.status(401).json({});
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
        req.session.cart[req.session.cart.length+1] = item;
    }
};

export const clearCart = async (req, res) => {
    try {
        return res.status(200).json({});
    } catch (err) {
        return res.status(401).json({});
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
