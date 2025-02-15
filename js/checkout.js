import { loadProductsData } from "../data/products.js";
import { renderOrderSummary } from "./scripts/checkout/orderSummary.js";
import { renderPaymentSummary } from "./scripts/checkout/paymentSummary.js";

loadProductsData(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
