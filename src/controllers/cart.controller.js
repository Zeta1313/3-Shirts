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
    return res.status(200).send("Item added");
};

export const clearCart = async (req, res) => {
    try {
        req.session.cart = [];
        return res.status(200).send("cart cleared");
    } catch (err) {
        console.error("Error clearing cart", err);
        return res.status(500).send("Error clearing cart");
    }
};

export const deleteItemFromCart = async (req, res) => {
    const id = Number(req.params.id);
    if (!req.session.cart) return res.status(400).send("Cart not found");
    if (!Number.isInteger(id)) return res.status(400).send("Invalid product ID");
    let check = 0;
    for (let i = 0; i < req.session.cart.length; i++) {
        if (req.session.cart[i] == id) check = 1;
    }
    if (check !== 1) return res.status(400).send("ID not present in cart");
    try {
        for (let i = 0; i < req.session.cart.length; i++) {
            if (req.session.cart[i] == id) {
                req.session.cart.splice(i, 1);
                return res.status(200).send("Item Removed");
            }
        }
        return res.status(404).send("Error removing product");
    } catch (err) {
        return res.status(404).send("Error removing product", err);
    }
};
