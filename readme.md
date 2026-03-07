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

| Route | Description |
|------|-------------|
| `/` | Home page displaying a randomized "shirt of the day" for each user session |
| `/login` | Login page (currently vestigial) |
| `/register` | Registration page (currently vestigial) |
| `/products` | Displays all products with filtering options |
| `/products/:id` | Displays an individual product page with product details and stock information |

Example: `/products/5`

Displays the product with ID `5`.

---

## API Endpoint

| Endpoint | Description |
|---------|-------------|
| `/api/products` | Returns all products in JSON format |

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