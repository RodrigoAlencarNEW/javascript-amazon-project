import { products } from "../../../../data/products.js";
import { deliveryOptions } from "../../../../data/deliveryOptions.js";
import { convertCentsToDollars } from "../../../Utils/convertCentsToDollars.js";
import { cart } from "../../../../data/cart.js";

let paymentProducts;
let paymentDelivery;
let paymentTotal;
let paymentTax;
let paymentTotalWithTax;

export function updatePayment() {
  paymentProducts = document.querySelector("#payment-products");
  paymentDelivery = document.querySelector("#payment-delivery");
  paymentTotal = document.querySelector("#payment-total");
  paymentTax = document.querySelector("#payment-tax");
  paymentTotalWithTax = document.querySelector("#payment-total-with-tax");

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

  paymentProducts.textContent = `$${convertCentsToDollars(productsTotalValue)}`;

  paymentDelivery.textContent = `$${convertCentsToDollars(deliveryValue)}`;

  paymentTotal.textContent = `$${convertCentsToDollars(totalValue)}`;

  paymentTax.textContent = `$${convertCentsToDollars(tax)}`;

  paymentTotalWithTax.textContent = `$${convertCentsToDollars(
    totalValueWithTax
  )}`;
}
