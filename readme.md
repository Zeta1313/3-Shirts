# 3-Shirts

## Team Members

- **Adrien Bertrand** — GitHub: `Zeta1313`
- **Allen Resulidze** — GitHub: `allennres`
- **Kabul Totakhil** — GitHub: ` Totakhil21`

---

## 🛍️ Project Description

**3-Shirts** is a full-stack ecommerce web application focused on selling high-quality, stylish shirts for everyday wear. Our platform allows customers to browse products, view detailed descriptions, add items to their cart, and securely complete purchases. In addition, we select a featured product for every new session to display to users visiting the home page.

The goal of this project is to demonstrate modern web development practices including structured architecture, clean UI design, and secure backend integration. In addition, it will be using:

- Server-Side Rendering (SSR)
- Express.js
- MVC architecture
- REST-style API endpoints
- Secure session-based state management
- Session management

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

| Route | Description |
|------|-------------|
| `/` | Home page displaying a randomized "shirt of the day" for each user session |
| `/login` | Login page |
| `/register` | Registration page |
| `/products` | Displays all products with filtering options |
| `/products/:id` | Displays an individual product page with product details and stock information |

Example: `/products/5`

Displays the product with ID `5`.

---

## API Endpoint

| Endpoint | Description |
|---------|-------------|
| `/api/products` | Returns all products in JSON format |
| `/api/`         | Returns all products in the Cart in JSON format |
| `/api/items`    | Adds an item to the cart within the session |
| `/api/items/:productid` | Deletes an item with the specified Id from the cart within the session |
| `/api/clear`    | Clears the session cart |

Example: `GET /api/products`

This endpoint can also accept query parameters for filtering.

---

## Supported Query Parameters

The `/products` page and `/api/products` endpoint support filtering using URL query parameters.

| Parameter | Description |
|----------|-------------|
| `size` | Filter products by size |
| `color` | Filter products by color |
| `brand` | Filter products by brand |
| `sort` | Sort products by price |

Examples:
`/products?size=M`
`/products?color=Black`
`/products?brand=Nike`
`/products?sort=price_asc`


Sorting options:

- `price_asc` — lowest to highest
- `price_desc` — highest to lowest

---

## Filtering Logic

Filtering is handled in the **product service layer**. The server builds a SQL query dynamically depending on which query parameters are provided.

For example: `/products?size=M&color=Black&sort=price_asc`

Produces a query similar to:

```sql
SELECT * FROM products
WHERE Size = 'M'
AND Color = 'Black'
ORDER BY Price ASC;
```

Filters are only applied when parameters are present, allowing flexible product searching.

## Session-based Cart

A sidebar is present on each page that tracks the users cart. This cart is stored in the session and can be added to, deleted from, and cleared. Checkout is currently vestigial due to the lack of actual product to sell.

## Recent page

A page that displays each product page the user has viewed, where the information is stored in the session. Duplicate of the products page with a narrowed field to only ID's that are stored in the session.