export let ordersList = JSON.parse(localStorage.getItem("orders")) || [];

function saveLocalStorage() {
  localStorage.setItem("orders", JSON.stringify(ordersList));
}

export function addOrder(order) {
  if (!order) return;

  ordersList.unshift(order);
  saveLocalStorage();
}

export function deleteProductFromOrder(
  productId,
  orderId,
  productContainer,
  orderContainer
) {
  ordersList = ordersList.map((order) => {
    if (order.id === orderId && order.products.length > 0) {
      return {
        ...order,
        products: order.products.filter(
          (product) => product.productId !== productId
        ),
      };
    }

    return order;
  });

  ordersList = ordersList.filter((order) => order.products.length > 0);

  saveLocalStorage();

  productContainer.remove();

  let orderDetailsContainer = orderContainer.querySelector(
    ".order-details-grid"
  );

  if (orderDetailsContainer.children.length === 0) {
    orderContainer.remove();
    emptyCartMessage();
  }
}

export function emptyCartMessage() {
  let ordersGrid = document.querySelector(".orders-grid");
  let purchaseHTML = "";

  purchaseHTML = `
    <div class="order-container-empty">    
      <div class="no-orders-found">
        <img src="images/icons/no-orders-icon.png">
        <p class="no-orders-found-text-primary">No orders at this time</p>
        <p class="no-orders-found-text-secondary">Click here and place your order</p>   
      </div>
    </div>`;

  ordersGrid.innerHTML = purchaseHTML;

  let returnToProducts = document.querySelector(
    ".no-orders-found-text-secondary"
  );

  returnToProducts.addEventListener("click", () => {
    window.location.href = "amazon.html";
  });
}

export function deleteOrder(orderId, orderContainer) {
  ordersList = ordersList.filter((order) => order.id !== orderId);

  if (ordersList.length === 0) {
    emptyCartMessage();
  }

  saveLocalStorage();
  orderContainer.remove();
}
