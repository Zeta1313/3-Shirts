import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.render("home", {
        title: "Home | Landing Page",
    });
});
router.get("/login", (req, res) => {
    res.render("login", {
        title: "Login",
    });
});
router.get("/register", (req, res) => {
    res.render("register", {
        title: "Register | Sign Up",
    });
});
router.get("/products", (req, res) => {
    res.render("products", {
        title: "All Products",
        products: []
    });
});

export default router;