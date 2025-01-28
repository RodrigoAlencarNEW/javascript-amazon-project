let cartItems = document.querySelector("#js-cart-quantity");
let checkoutItems = document.querySelector(".checkout-header-subtext");

export function updateCart(cart) {
  if (cartItems) cartItems.innerHTML = cart.length;
  if (checkoutItems) {
    cart.length === 1
      ? (checkoutItems.innerHTML = `${cart.length} item`)
      : (checkoutItems.innerHTML = `${cart.length} items`);
  }
}
