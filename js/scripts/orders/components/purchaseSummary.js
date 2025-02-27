import { cart } from "../../../../data/cart.js";
import { orders } from "../../../../data/orders.js";
import { products } from "../../../../data/products.js";
import { convertCentsToDollars } from "../../../Utils/convertCentsToDollars.js";
import { convertDate } from "../../../Utils/convertDate.js";

cart.updateCartItems();

export function renderPurchaseSummary() {
  let ordersGrid = document.querySelector(".orders-grid");
  let purchaseHTML = "";

  orders.ordersList.forEach((order) => {
    purchaseHTML = `<div class="order-container order-container-${order.id}">

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

          <div class="order-header-middle-section">
            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
            
            <span data-order-id="${
              order.id
            }" class='delete-order-button'>X</span>
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
              <div class="order-item-container container-product-${
                product.id
              }"> 
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
                      <button class="remove-order-button button-primary" data-product-id="${
                        product.id
                      }" data-order-id="${order.id}">
                          <img class="buy-again-icon" src="images/icons/delete-icon.png">
                          <span class="remove-product-message">Remove product</span>
                      </button>
                    </div>
                </div>

                <div class="product-actions">
                    <a href="tracking.html?orderId=${order.id}&productId=${
                product.id
              }">
                        <button class="track-package-button button-secondary">
                            Track package
                        </button>
                    </a>
                </div>
              </div>
          `;
            }
          })
          .join("")}          
        </div>`;
    ordersGrid.innerHTML += purchaseHTML;
  });

  orders.emptyCartMessage();

  let removeProductFromOrderButton = document.querySelectorAll(
    ".remove-order-button"
  );

  removeProductFromOrderButton.forEach((product) => {
    product.addEventListener("click", () => {
      const { productId, orderId } = product.dataset;

      const productContainer = document.querySelector(
        `.container-product-${productId}`
      );
      const orderContainer = document.querySelector(
        `.order-container-${orderId}`
      );

      orders.deleteProductFromOrder(
        productId,
        orderId,
        productContainer,
        orderContainer
      );
    });
  });

  let removeOrderButton = document.querySelectorAll(".delete-order-button");

  removeOrderButton.forEach((order) => {
    order.addEventListener("click", () => {
      const { orderId } = order.dataset;
      const orderContainer = document.querySelector(
        `.order-container-${orderId}`
      );

      orders.deleteOrder(orderId, orderContainer);
    });
  });
}
