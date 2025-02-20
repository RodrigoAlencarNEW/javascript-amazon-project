import { cart } from "../../../../data/cart.js";
import { addOrder } from "../../../../data/orders.js";

export async function orderPost() {
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

  const order = await response.json();

  addOrder(order);
}
