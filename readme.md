# 3-Shirts

## Team Members

- **Adrien Bertrand** — GitHub: `Zeta1313`
- **Allen Resulidze** — GitHub: `allennres`
- **Kabul Totakhil** — GitHub: `Totakhil21`

---

## 🛍️ Project Description

**3-Shirts** is a full-stack ecommerce web application focused on selling high-quality, stylish shirts. Users can browse products, view details, manage a cart, and interact with a session-based shopping experience.

This project demonstrates:

- Server-Side Rendering (SSR)
- Express.js backend architecture
- MVC design pattern
- REST-style API endpoints
- Session-based authentication
- Session-based cart management

---

## 👕 Product Category

- Casual T-Shirts  
- Graphic Tees  
- Premium Cotton Shirts  
- Seasonal & Limited Edition Designs  

---

## Authentication Flow

The application uses session-based authentication.

### Register
- User submits the form at `/register`
- Server validates input and creates a user
- A session is created automatically after registration

### Login
- User submits credentials at `/login`
- Server verifies credentials
- On success:
  - `req.session.userId` is stored
- User is redirected to `/`

### Logout
- Session is destroyed using:
  req.session.destroy()
- User is redirected to `/login`

---

## Route Access

### Public Routes
- `/`
- `/login`
- `/register`

### Protected Routes
- `/products`
- `/products/:id`
- `/recent`

### Protected API Routes
- `/api/cart`
- `/api/cart/items`
- `/api/cart/items/:productId`
- `/api/cart/clear`

---

## SSR Routes

| Route | Description |
|------|-------------|
| `/` | Home page with session-based featured product |
| `/login` | Login page |
| `/register` | Registration page |
| `/products` | Product listing page |
| `/products/:id` | Individual product page |
| `/recent` | Recently viewed products (session-based) |

---

## API Endpoints

### Product API

| Endpoint | Description |
|---------|-------------|
| `/api/products` | Returns all products (supports filtering) |

---

### Cart API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get cart contents |
| POST | `/api/cart/items` | Add item to cart |
| DELETE | `/api/cart/items/:productId` | Remove item |
| POST | `/api/cart/clear` | Clear cart |

---

## Supported Query Parameters

Used in `/products` and `/api/products`:

| Parameter | Description |
|----------|-------------|
| `size` | Filter by size |
| `color` | Filter by color |
| `brand` | Filter by brand |
| `sort` | Sort by price |

### Examples

- `/products?size=M`
- `/products?color=Black`
- `/products?brand=Nike`
- `/products?sort=price_asc`

### Sorting Options

- `price_asc` — lowest to highest  
- `price_desc` — highest to lowest  

---

## Filtering Logic

Filtering is handled in the service layer using dynamic SQL queries.

Example:

`/products?size=M&color=Black&sort=price_asc`

Produces:

SELECT * FROM products  
WHERE size = 'M'  
AND color = 'Black'  
ORDER BY price ASC;

---

## Session-Based Cart Model

The cart is stored on the server using:

req.session.cart

### Example Structure

[
  { productId: 1, quantity: 2 },
  { productId: 5, quantity: 1 }
]

### Behavior

- Cart is initialized when session starts
- Adding items:
  - If item exists → increase quantity
  - Else → add new item
- Removing items:
  - Deletes from session
- Clearing cart:
  - req.session.cart = []

Each user has an isolated cart tied to their session.

---

## 🧠 Recent Page

Tracks recently viewed products using:

req.session.memory

- Stores product IDs viewed by the user
- Displays a filtered product list
- Avoids duplicates

---

## ⚙️ Setup Instructions

### 1. Install dependencies

npm install

---

### 2. Set up the database

Run:

- schema.sql  
- seed.sql  

---

### 3. Create `.env` file

PORT=8080  
DB_HOST=localhost  
DB_PORT=3306  
DB_USER=your_user  
DB_PASSWORD=your_password  
DB_NAME=your_database  

SESSION_SECRET=your_secret  

---

### 4. Run the application

npm run dev

---

### 5. Open in browser

http://localhost:8080