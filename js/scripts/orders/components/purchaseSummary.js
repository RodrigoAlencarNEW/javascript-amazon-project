import { cart } from "../../../../data/cart.js";
import { ordersList } from "../../../../data/orders.js";
import { products } from "../../../../data/products.js";
import { convertCentsToDollars } from "../../../Utils/convertCentsToDollars.js";
import { convertDate } from "../utils/convertDate.js";

cart.updateCartItems();

export function renderPurchaseSummary() {
  let ordersGrid = document.querySelector(".orders-grid");
  let purchaseHTML = "";

  ordersList.forEach((order) => {
    purchaseHTML = `<div class="order-container">

        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${convertDate(order.orderTime)}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${convertCentsToDollars(order.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid">

        ${order.products
          .map((item) => {
            const product = products.find(
              (product) => product.id === item.productId
            );

            if (product) {
              return `
          
            <div class="product-image-container">
                <img src="${product.image}">
            </div>

            <div class="product-details">
            
                <div class="product-name">
                    ${product.name}
                </div>
                    
                <div class="product-delivery-date">
                    Arriving on: ${convertDate(item.estimatedDeliveryTime)}
                </div>

                <div class="product-quantity">
                    Quantity: ${item.quantity}
                </div>
                
                <div class='buttons-itens-order-container'> 
                  <button class="buy-again-button button-primary">
                      <img class="buy-again-icon" src="images/icons/buy-again.png">
                      <span class="buy-again-message">Buy it again</span>
                  </button>
                  <button class="remove-order-button button-primary">
                      <img class="buy-again-icon" src="images/icons/delete-icon.png">
                      <span class="buy-again-message">Remove order</span>
                  </button>
                
                </div>


            </div>

            <div class="product-actions">
                <a href="tracking.html">
                    <button class="track-package-button button-secondary">
                        Track package
                    </button>
                </a>
            </div>
          `;
            }
          })
          .join("")}          
        </div>`;

    ordersGrid.innerHTML += purchaseHTML;
  });
}
