import { messageAddedToCart } from "../js/Utils/addedToCard.js";
export const cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantitySelected: 3,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantitySelected: 1,
  },
];

let cartItems = document.querySelector("#js-cart-quantity");

export function addCart(productId, button) {
  const selectedItem = button.parentElement.querySelector("select");
  const quantitySelected = Number(selectedItem.value);
  selectedItem.classList.add(`js-selected-${productId}`);

  const addedToCart = button.parentElement.querySelector(".added-to-cart");

  messageAddedToCart(addedToCart);

  let inCart;

  cart.forEach((item) => {
    if (productId === item.productId) inCart = item;
  });

  if (inCart) inCart.quantitySelected += quantitySelected;

  if (!inCart) {
    cart.push({ productId, quantitySelected });
  }

  cartItems.innerHTML = cart.length;
}
