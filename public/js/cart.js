async function loadCart() {
  const res = await fetch("/api/cart");
  const data = await res.json();

  const cart = document.getElementById("cart-items");
  const emptyCart = document.getElementById("empty-cart");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  cart.innerHTML = "";

  let total = 0;

  if (!data.cart || data.cart.length === 0) {
    emptyCart.style.display = "block";
    cartCount.textContent = "0";
    cartTotal.textContent = "$0.00";
    return;
  }

  emptyCart.style.display = "none";

  data.cart.forEach(item => {
    const li = document.createElement("li");
    li.className = "cart-item";

    total += Number(item.Price) * Number(item.Quantity);

    li.innerHTML = `
      <button class="remove-item-btn" data-id="${item.ID}" type="button">&times;</button>

      <div class="cart-item-image">
        <img src="/${item.Image}" alt="${item.Name}">
      </div>

      <div class="cart-item-details">
        <h4>${item.Name}</h4>
        <p>Qty: ${item.Quantity}</p>
      </div>

      <div class="cart-item-price">
        $${Number(item.Price).toFixed(2)}
      </div>
    `;

    cart.appendChild(li);
  });

  // update UI
  cartCount.textContent = data.cart.length;
  cartTotal.textContent = `$${total.toFixed(2)}`;

  // attach remove listeners
  document.querySelectorAll(".remove-item-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      await removeFromCart(btn.dataset.id);
    });
  });
}

async function addToCart(productId) {
  const res = await fetch("/api/cart/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ productId })
  });

  if (res.ok) loadCart();
}

async function removeFromCart(productId) {
  const res = await fetch(`/api/cart/items/${productId}`, {
    method: "DELETE"
  });

  if (res.ok) loadCart();
}

document.addEventListener("DOMContentLoaded", () => {
  loadCart();

  document.getElementById("clear-cart-btn").addEventListener("click", async () => {
    const res = await fetch("/api/cart/clear", {
      method: "POST"
    });

    if (res.ok) loadCart();
  });

  document.querySelectorAll(".add-to-cart-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      addToCart(btn.dataset.id);
    });
  });
});