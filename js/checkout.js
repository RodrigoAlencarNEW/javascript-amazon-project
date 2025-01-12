import { cart, deleteItem, updateItem } from "../data/cart.js";
import { products } from "../data/products.js";
import { convertCentsToDollars } from "../js/Utils/convertCentsToDollars.js";
import { updateCart } from "./Utils/updateCart.js";

updateCart(cart);

let containerItens = document.querySelector(".order-summary");
let items = "";

cart.forEach((item) => {
  const product = products.find((product) => product.id === item.productId);

  items += `<div class="cart-item-container" data-product-id="${product.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
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
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${product.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${product.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${product.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
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
      `[data-product-id="${productId}"]`
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
