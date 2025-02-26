import { cart } from "../../../../data/cart.js";
import { orders } from "../../../../data/orders.js";

export async function orderPost() {
  try {
    const methodFetch = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart: cart.cartItems,
      }),
    };

    const response = await fetch(
      "https://supersimplebackend.dev/orders",
      methodFetch
    );

    if (!response.ok) throw new Error(response.statusText);

    const order = await response.json();

    orders.addOrder(order);
    cart.clearCart();
    window.location.href = "orders.html";
  } catch (error) {
    console.log(error.message);
  }
}
