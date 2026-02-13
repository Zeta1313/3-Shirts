import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.render("home", {
        title: "Landing Page",
    });
});
router.get("/login", (req, res) => {
    res.render("login", {
        title: "Landing Page",
    });
});
router.get("/register", (req, res) => {
    res.render("register", {
        title: "Landing Page",
    });
});
router.get("/products", (req, res) => {
    res.render("products", {
        title: "Landing Page",
    });
});

export default router;