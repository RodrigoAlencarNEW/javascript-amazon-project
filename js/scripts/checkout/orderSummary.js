import { cart } from "../../../data/cart.js";
import { deliveryOptions } from "../../../data/deliveryOptions.js";
import { products } from "../../../data/products.js";
import { convertCentsToDollars } from "../../Utils/convertCentsToDollars.js";
import { updateDeliveryDate } from "./utils/updateDeliveryDate.js";

cart.updateCartItems();

let containerItens = document.querySelector(".order-summary");
let itemsHTML = "";

export function renderOrderSummary() {
  cart.Items.forEach((item) => {
    const product = products.find((product) => product.id === item.productId);
    const deliveryOption = deliveryOptions.find(
      (delivery) => delivery.id === item.deliveryOptionId
    );

    itemsHTML += `<div class="cart-item-container-${product.id}">
            <div class="delivery-date" id="delivery-date-${product.id}">
              Delivery date: ${updateDeliveryDate(deliveryOption)}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${product.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${product.name}
                </div>
                <div class="product-price product-price-${product.id}">
                  $${convertCentsToDollars(
                    product.priceCents * item.quantitySelected
                  )}
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

    containerItens.innerHTML = itemsHTML;
  });

  let deleteLink = document.querySelectorAll(".delete-quantity-link");

  deleteLink.forEach((button) => {
    button.addEventListener("click", () => {
      const { productId } = button.dataset;
      const itemContainer = document.querySelector(
        `.cart-item-container-${productId}`
      );

      cart.deleteItem(productId, itemContainer);

      const quantityPaymentItems = document.querySelector(
        ".payment-summary-label"
      );

      quantityPaymentItems.textContent = `Items (${cart.Items.length}):`;
    });
  });

  let updateLink = document.querySelectorAll(".update-quantity-link");

  updateLink.forEach((button) => {
    button.addEventListener("click", () => {
      const { productId } = button.dataset;

      cart.updateItem(productId, button);
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
      <div class="delivery-option" 
      data-delivery-option-id="${delivery.id}" 
      data-product-id="${product.id}"
      >
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
      cart.updateDeliveryOption(productId, deliveryOptionId, input);
    });
  });
}
