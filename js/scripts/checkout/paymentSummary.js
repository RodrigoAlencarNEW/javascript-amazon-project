import { cart } from "../../../data/cart.js";
import { deliveryOptions } from "../../../data/deliveryOptions.js";
import { products } from "../../../data/products.js";
import { convertCentsToDollars } from "../../Utils/convertCentsToDollars.js";

let containerPayment = document.querySelector(".payment-summary");
let paymentHTML = "";

export function renderPaymentSummary() {
  let productsTotalValue = 0;
  let deliveryValue = 0;

  cart.Items.forEach((item) => {
    const product = products.find((product) => product.id === item.productId);
    const deliveryOption = deliveryOptions.find(
      (delivery) => delivery.id === item.deliveryOptionId
    );

    productsTotalValue += product.priceCents * item.quantitySelected;

    deliveryValue += deliveryOption.cost;
  });

  const totalValue = productsTotalValue + deliveryValue;
  const tax = totalValue * 0.1;
  const totalValueWithTax = totalValue + tax;

  paymentHTML += `
          <div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div class="payment-summary-label">Items (${
              cart.Items.length
            }):</div>
            <div class="payment-summary-money" id="payment-products">$${convertCentsToDollars(
              productsTotalValue
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money" id="payment-delivery">$${convertCentsToDollars(
              deliveryValue
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money"  id="payment-total">$${convertCentsToDollars(
              totalValue
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money" id="payment-tax">$${convertCentsToDollars(
              tax
            )}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money" id="payment-total-with-tax">$${convertCentsToDollars(
              totalValueWithTax
            )}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
  `;

  containerPayment.innerHTML = paymentHTML;
}
