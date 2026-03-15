import { createUser, findUserByUsername, validatePassword } from "../services/user.service.js";


const loginPage = (req, res) => {
    res.render("login", {
        title: "Login",
        errors: req.query.errors || null
    });
};

const registerPage = (req, res) => {
    res.render("register", {
        title: "Register",
        errors: req.query.errors || null
    });
};

const register = async (req, res) => {
    const { username, password, confirm } = req.body;

    if (!username || !password || !confirm) {
        return res.redirect("/register?errors=All fields required.");
    }

    if (password !== confirm) {
        return res.redirect("/register?errors=Passwords do not match.");
    }

    await createUser(username, password);
    return res.redirect("/login");
};

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.redirect("/login?errors=All fields required.");
    }

    const user = await findUserByUsername(username);
    if (!user) {
        return res.redirect("/login?errors=Invalid credentials.");
    }

    const isValid = await validatePassword(password, user.password);
    if (!isValid) {
        return res.redirect("/login?errors=Invalid credentials.");
    }

    req.session.user = {
        userId: user.userId,
        username: user.username,
    };

    return res.redirect("/products");
};

export const isLoggedIn = (req, res, next) => {
    if (!req.user) {
        return res.redirect("/login?errors=Please log in first.");
    }
    next();
}

export const requireAuth = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({message: "401 Unauthorized"});
    }
    next();
}


export const logout = (req, res) => {
    req.session.destroy(() => {
        return res.redirect("/login");
    });
}

export default { loginPage, registerPage, register, login };