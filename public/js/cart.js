async function loadCart() {
  const res = await fetch("/api/cart");
  const data = await res.json();

  // SHOPPING CART UI HERE - UPDATE
  const cart = document.getElementById("cart-items");
  cart.innerHTML = "";

  data.cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.Name} - $${item.Price}`;
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