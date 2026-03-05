# 3-Shirts

## Team Members

- **Adrien Bertrand** — GitHub: `Zeta1313`
- **Allen Resulidze** — GitHub: `allennres`
- **Kabul Totakhil** — GitHub: ` Totakhil21`

---

## 🛍️ Project Description

**3-Shirts** is a full-stack ecommerce web application focused on selling high-quality, stylish shirts for everyday wear. Our platform allows customers to browse products, view detailed descriptions, add items to their cart, and securely complete purchases.

The goal of this project is to demonstrate modern web development practices including structured architecture, clean UI design, and secure backend integration. In addition, it will be using:

- Server-Side Rendering (SSR)
- Express.js
- MVC architecture
- REST-style API endpoints
- Secure session-based state management

---

## 👕 Product Category

The store will specialize in:

- Casual T-Shirts  
- Graphic Tees  
- Premium Cotton Shirts  
- Seasonal & Limited Edition Designs  

This store focuses exclusively on shirts to create a clean, focused, and brand-driven shopping experience.

---

## SSR Routes
"/": Home Page, displays a randomized shirt of the day for each user.
"/login": Login Page, currently vestigial.
"/register": Registration page, currently vestigial.
"/products": Products page, displays all products with filtering availible and links to each product page.
"/products/api": Developer acess, displays all products in plain text.
Queries for "/products" and "/products/api": Size, color, brand, price
"/products/:id": Individual product page, displaying information and stock.
