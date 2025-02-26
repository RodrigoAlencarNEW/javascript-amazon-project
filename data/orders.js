class Orders {
  ordersList;
  localStorageKey;

  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.loadLocalStorage();
  }

  loadLocalStorage() {
    this.ordersList = JSON.parse(localStorage.getItem(this.localStorageKey));

    if (!this.ordersList) this.ordersList = [];
  }

  saveLocalStorage() {
    localStorage.setItem("orders", JSON.stringify(this.ordersList));
  }

  addOrder(order) {
    if (!order) return;

    this.ordersList.push(order);
    this.saveLocalStorage();
  }

  deleteProductFromOrder(productId, orderId, productContainer, orderContainer) {
    this.ordersList = this.ordersList.map((order) => {
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

    this.ordersList = this.ordersList.filter(
      (order) => order.products.length > 0
    );

    this.saveLocalStorage();

    productContainer.remove();

    let orderDetailsContainer = orderContainer.querySelector(
      ".order-details-grid"
    );

    if (orderDetailsContainer.children.length === 0) {
      orderContainer.remove();
      this.emptyCartMessage();
    }
  }

  emptyCartMessage() {
    let ordersGrid = document.querySelector(".orders-grid");
    let purchaseHTML = "";

    if (ordersGrid.children.length === 0) {
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
  }

  deleteOrder(orderId, orderContainer) {
    this.ordersList = this.ordersList.filter((order) => order.id !== orderId);
    this.saveLocalStorage();
    orderContainer.remove();

    if (this.ordersList.length === 0) {
      this.emptyCartMessage();
    }
  }
}

export const orders = new Orders("orders");
