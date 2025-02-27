import { orders } from "../../../../data/orders.js";
import { products } from "../../../../data/products.js";
import { convertDate } from "../../../Utils/convertDate.js";

let trackingContainer = document.querySelector(".order-tracking");
let trackingHTML = "";

const trackingURL = new URL(window.location.href);
const orderIdTracking = trackingURL.searchParams.get("orderId");
const productIdTracking = trackingURL.searchParams.get("productId");

export function renderTrackingDetails() {
  orders.ordersList.forEach((order) => {
    if (order.id === orderIdTracking) {
      const productDetails = products.find(
        (product) => product.id === productIdTracking
      );

      const orderDetails = order.products.find(
        (product) => product.productId === productIdTracking
      );

      trackingHTML += `<a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          ${convertDate(orderDetails.estimatedDeliveryTime)}
        </div>

        <div class="product-order-container">

            <img class="product-image" src="${productDetails.image}">

            <div class='all-orders-title'> 
                <div class="product-info">
                    <div class="products-container-details">
                        <p class="product-info-label">Name:</p>
                        <p class='product-info-content'>${
                          productDetails.name
                        }</p>
                    </div>
                </div>

                <div class="product-info">
                    <div class="products-container-details">
                        <p class="product-info-label">Quantity:</p>
                        <p class='product-info-content'>${
                          orderDetails.quantity
                        }</p>
                    </div>
                </div>
            </div>
            
        </div>

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>`;

      trackingContainer.innerHTML = trackingHTML;
    }
  });
}
