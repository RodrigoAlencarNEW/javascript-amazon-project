import { renderProductList } from "./scripts/amazon/productList.js";
import { loadProductsData } from "../data/products.js";

loadProductsData(renderProductList);
