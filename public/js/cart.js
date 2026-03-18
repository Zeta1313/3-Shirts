async function loadCart() {
  const res = await fetch("/api/cart");
  const data = await res.json();

  // SHOPPING CART UI HERE - UPDATE
  const cart = document.getElementById("cart-items");
  cart.innerHTML = "";

  data.cart.forEach(item => {
    const li = document.createElement("li");
    li.className = "cart-item";

    li.innerHTML = `
      <button class="remove-item-btn" data-id="${item.ID}" type="button">&times;</button>

      <div class="cart-item-image">
        <img src="/${item.Image}" alt="${item.Name}">
      </div>

      <div class="cart-item-details">
        <h4>${item.Name}</h4>
        <p>Qty: 1</p>
      </div>

      <div class="cart-item-price">
        $${Number(item.Price).toFixed(2)}
      </div>
    `;

    cart.appendChild(li);
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

document.addEventListener("DOMContentLoaded", () => {
  loadCart();

  document.querySelectorAll(".add-to-cart-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      addToCart(btn.dataset.id);
    });
  });
});