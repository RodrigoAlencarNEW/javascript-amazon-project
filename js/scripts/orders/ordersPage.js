import { loadProductsData } from "../../../data/products.js";
import { renderPurchaseSummary } from "./components/purchaseSummary.js";

loadProductsData(renderPurchaseSummary);
