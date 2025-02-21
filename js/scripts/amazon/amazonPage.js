import { renderProductList } from "./components/productList.js";
import { loadProductsData } from "../../../data/products.js";

loadProductsData(renderProductList);
