import { messageAddedToCart } from "../js/Utils/addedToCard.js";
import {
  saveLocalStorage,
  loadLocalStorage,
} from "../js/Utils/dinamicLocalStorage.js";
import { updateCart } from "../js/Utils/updateCart.js";

export let cart = loadLocalStorage("cart") || [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantitySelected: 1,
    deliveryOptionId: "1",
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantitySelected: 1,
    deliveryOptionId: "2",
  },
];

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

  updateCart(cart);

  saveLocalStorage("cart", cart);
}

export function deleteItem(productId, itemContainer) {
  const newItemList = [];

  cart.forEach((item) => {
    if (item.productId !== productId) {
      newItemList.push(item);
    }
  });

  cart = newItemList;
  itemContainer.remove();
  saveLocalStorage("cart", cart);
  updateCart(cart);
}

export const updateItem = (productId, button) => {
  const input = document.createElement("input");
  input.classList.add("quantity-input");
  input.style.width = "30px";
  input.placeholder = "0";

  const span = document.createElement("span");
  span.classList.add("save-quantity-link", "link-primary");
  span.textContent = "Save";

  button.insertAdjacentElement("afterend", span);
  button.insertAdjacentElement("afterend", input);
  button.classList.add("hidden");

  span.addEventListener("click", () => {
    const quantity = input.value;

    if (isNaN(quantity)) return;

    button.classList.add("hidden");

    cart.forEach((item) => {
      if (item.productId === productId) {
        item.quantitySelected = Number(quantity);

        const quantityLabel = document.querySelector(
          `.quantity-label[data-product-id="${productId}"]`
        );

        quantityLabel.textContent = item.quantitySelected;
      }
    });

    saveLocalStorage("cart", cart);
    button.classList.remove("hidden");
    span.remove();
    input.remove();
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      span.click();
    }
  });
};
