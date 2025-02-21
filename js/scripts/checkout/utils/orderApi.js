import { cart } from "../../../../data/cart.js";
import { addOrder } from "../../../../data/orders.js";

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

    if (!response.ok) {
      throw new Error(`Erro ao criar pedido: ${response.statusText}`);
    }

    const order = await response.json();

    addOrder(order);
    window.location.href = "orders.html";
  } catch (error) {
    alert(
      error.message +
        " " +
        "Houve um problema ao realizar o pedido. Tente novamente mais tarde."
    );
  }
}
