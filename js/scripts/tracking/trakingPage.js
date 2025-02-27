import { loadProductsData } from "../../../data/products.js";
import { renderTrackingDetails } from "./components/trackingDetails.js";

loadProductsData(renderTrackingDetails);
