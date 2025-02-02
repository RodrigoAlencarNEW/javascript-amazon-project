import { messageAddedToCart } from "../js/Utils/addedToCard.js";
import {
  saveLocalStorage,
  loadLocalStorage,
} from "../js/Utils/dinamicLocalStorage.js";
import { updateCart } from "../js/Utils/updateCart.js";
import { updateDeliveryInput } from "../js/Utils/updateDeliveryInput.js";
import { deliveryOptions } from "./deliveryOptions.js";
import { products } from "./products.js";
import { convertCentsToDollars } from "../js/Utils/convertCentsToDollars.js";
import { updatePayment } from "../js/Utils/updatePayment.js";

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

  if (inCart) {
    inCart.quantitySelected += quantitySelected;
  }

  if (!inCart) {
    cart.push({ productId, quantitySelected, deliveryOptionId: "1" });
  }

  saveLocalStorage("cart", cart);
  updateCart(cart);
}

export function deleteItem(productId, itemContainer) {
  const newItemList = [];

  cart.forEach((item) => {
    if (item.productId !== productId) {
      newItemList.push(item);
    }
  });

  cart = newItemList;
  updatePayment(cart);
  itemContainer.remove();
  saveLocalStorage("cart", cart);
  updateCart(cart);
}

export function updateItem(productId, button) {
  const input = document.createElement("input");
  input.classList.add("quantity-input");
  input.style.width = "30px";
  input.placeholder = "1";

  const span = document.createElement("span");
  span.classList.add("save-quantity-link", "link-primary");
  span.textContent = "Save";

  button.insertAdjacentElement("afterend", span);
  button.insertAdjacentElement("afterend", input);
  button.classList.add("hidden");

  span.addEventListener("click", () => {
    const quantity = input.value;

    if (isNaN(quantity) || quantity < 1) return;

    button.classList.add("hidden");

    cart.forEach((item) => {
      if (item.productId === productId) {
        item.quantitySelected = Number(quantity);

        const quantityLabel = document.querySelector(
          `.quantity-label[data-product-id="${productId}"]`
        );

        item.priceCents = products.find(
          (product) => product.id === item.productId
        ).priceCents;

        const contentPriceUpdate = document.querySelector(
          `.product-price-${item.productId}`
        );

        contentPriceUpdate.textContent = `$${convertCentsToDollars(
          item.priceCents * item.quantitySelected
        )}`;

        quantityLabel.textContent = item.quantitySelected;
      }
    });

    updatePayment(cart);
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
}

export function updateDeliveryOption(productId, deliveryOptionId, content) {
  let cartItem = cart.find((item) => item.productId === productId);

  cartItem.deliveryOptionId = deliveryOptionId;

  let deliveryOption = deliveryOptions.find(
    (delivery) => delivery.id === cartItem.deliveryOptionId
  );

  const deliveryDate = dayjs()
    .add(deliveryOption.days, "day")
    .format("dddd, MMMM D");

  const container = document.querySelectorAll(`#delivery-date-${productId}`)[0];
  container.textContent = `Delivery date: ${deliveryDate}`;

  updateDeliveryInput(content);
  updatePayment(cart);
  saveLocalStorage("cart", cart);
  updateCart(cart);
}
