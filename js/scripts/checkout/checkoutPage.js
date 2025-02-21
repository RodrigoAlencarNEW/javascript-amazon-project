import { loadProductsData } from "../../../data/products.js";
import { renderOrderSummary } from "./components/orderSummary.js";
import { renderPaymentSummary } from "./components/paymentSummary.js";

loadProductsData(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
