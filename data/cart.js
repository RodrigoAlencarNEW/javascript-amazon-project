import { messageAddedToCart } from "../js/scripts/amazon/Utils/addedToCard.js";
import { updateDeliveryInput } from "../js/scripts/checkout/utils/updateDeliveryInput.js";
import { deliveryOptions } from "./deliveryOptions.js";
import { products } from "./products.js";
import { convertCentsToDollars } from "../js/Utils/convertCentsToDollars.js";
import { updatePayment } from "../js/scripts/checkout/utils/updatePayment.js";

class Cart {
  cartItems;
  localStorageKey;

  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.loadLocalStorage();
  }

  saveLocalStorage() {
    return localStorage.setItem(
      this.localStorageKey,
      JSON.stringify(this.cartItems)
    );
  }

  loadLocalStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));

    if (!this.cartItems) {
      this.cartItems = [
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
    }
  }

  addCart(productId, button) {
    const selectedItem = button.parentElement.querySelector("select");
    const quantitySelected = Number(selectedItem.value);
    selectedItem.classList.add(`js-selected-${productId}`);

    const addedToCart = button.parentElement.querySelector(".added-to-cart");

    messageAddedToCart(addedToCart);

    let inCart;

    this.cartItems.forEach((item) => {
      if (productId === item.productId) inCart = item;
    });

    if (inCart) {
      inCart.quantitySelected += quantitySelected;
    }

    if (!inCart) {
      this.cartItems.push({
        productId,
        quantitySelected,
        deliveryOptionId: "1",
      });
    }

    this.saveLocalStorage();
    this.updateCartItems();
  }

  deleteItem(productId, itemContainer) {
    const newItemList = [];

    this.cartItems.forEach((item) => {
      if (item.productId !== productId) {
        newItemList.push(item);
      }
    });

    this.cartItems = newItemList;
    itemContainer.remove();
    this.saveLocalStorage();
    updatePayment();
    this.updateCartItems();
  }

  updateItem(productId, button) {
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

      this.cartItems.forEach((item) => {
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

      updatePayment();
      this.saveLocalStorage();
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

  updateDeliveryOption(productId, deliveryOptionId, content) {
    let cartItem = this.cartItems.find((item) => item.productId === productId);

    cartItem.deliveryOptionId = deliveryOptionId;

    let deliveryOption = deliveryOptions.find(
      (delivery) => delivery.id === cartItem.deliveryOptionId
    );

    const deliveryDate = dayjs()
      .add(deliveryOption.days, "day")
      .format("dddd, MMMM D");

    const container = document.querySelectorAll(
      `#delivery-date-${productId}`
    )[0];
    container.textContent = `Delivery date: ${deliveryDate}`;

    updateDeliveryInput(content);
    updatePayment();
    this.saveLocalStorage();
  }

  updateCartItems() {
    let cartItems = document.querySelector("#js-cart-quantity");
    let checkoutItems = document.querySelector(".checkout-header-subtext");
    let paymentItems = document.querySelector(".payment-summary-label");

    if (cartItems) cartItems.innerHTML = this.cartItems.length;

    if (paymentItems) paymentItems.innerHTML = this.cartItems.length;

    if (checkoutItems) {
      this.cartItems.length === 1
        ? (checkoutItems.innerHTML = `${this.cartItems.length} item`)
        : (checkoutItems.innerHTML = `${this.cartItems.length} items`);
    }
  }
}

export const cart = new Cart("cart");
