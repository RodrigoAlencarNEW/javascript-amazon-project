import {
  cart,
  deleteItem,
  updateDeliveryOption,
  updateItem,
} from "../data/cart.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import { products } from "../data/products.js";
import { convertCentsToDollars } from "../js/Utils/convertCentsToDollars.js";
import { updateCart } from "./Utils/updateCart.js";

updateCart(cart);

let containerItens = document.querySelector(".order-summary");
let items = "";

cart.forEach((item) => {
  const product = products.find((product) => product.id === item.productId);
  const deliveryOption = deliveryOptions.find(
    (delivery) => delivery.id === item.deliveryOptionId
  );

  if (!product || !deliveryOption) return;

  const deliveryDate = dayjs().add(deliveryOption.days, "day").format("dddd, MMMM D");

  items += `<div class="cart-item-container-${product.id}">
            <div class="delivery-date" id="delivery-date-${product.id}">
              Delivery date: ${deliveryDate}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${product.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${product.name}
                </div>
                <div class="product-price">
                  $${convertCentsToDollars(product.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label" data-product-id="${
                      product.id
                    }">${item.quantitySelected}</span>
                  </span>
                  <span class="update-quantity-link link-primary" data-product-id="${
                    product.id
                  }">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary" data-product-id="${
                    product.id
                  }">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                
                ${deliveryTimeUpdate(product, item)}
                   
                
              </div>
            </div>
          </div>`;

  containerItens.innerHTML = items;
});

let deleteLink = document.querySelectorAll(".delete-quantity-link");

deleteLink.forEach((button) => {
  button.addEventListener("click", () => {
    const { productId } = button.dataset;
    const itemContainer = document.querySelector(
      `.cart-item-container-${productId}`
    );

    deleteItem(productId, itemContainer);
  });
});

let updateLink = document.querySelectorAll(".update-quantity-link");

updateLink.forEach((button) => {
  button.addEventListener("click", () => {
    const { productId } = button.dataset;

    updateItem(productId, button);
  });
});

function deliveryTimeUpdate(product, item) {
  let html = "";

  deliveryOptions.forEach((delivery) => {
    const deliveryDate = dayjs()
      .add(delivery.days, "day")
      .format("dddd, MMMM D");

    const isChecked = delivery.id === item.deliveryOptionId;

    html += `
      <div class="delivery-option" data-delivery-option-id="${
        delivery.id
      }" data-product-id="${product.id}">
        <input type="radio"
          ${isChecked ? "checked" : ""}
          class="delivery-option-input"
          name="delivery-option-${product.id}">
        <div>
          <div class="delivery-option-date">
            ${deliveryDate}
          </div>
          <div class="delivery-option-price">
            ${
              delivery.cost === 0
                ? "FREE Shipping"
                : `$${convertCentsToDollars(delivery.cost)}`
            }
          </div>
        </div>
      </div>
    `;
  });
  return html;
}

let deliveryOptionInput = document.querySelectorAll(".delivery-option");

deliveryOptionInput.forEach((input) => {
  input.addEventListener("click", () => {
    const { productId, deliveryOptionId } = input.dataset;
    updateDeliveryOption(productId, deliveryOptionId);
  });
});
