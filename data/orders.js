export let ordersList = JSON.parse(localStorage.getItem("orders")) || [];

export function addOrder(order) {
  if (!order) return;

  if (ordersList) ordersList = [];

  ordersList.unshift(order);
  saveLocalStorage();
}

function saveLocalStorage() {
  localStorage.setItem("orders", JSON.stringify(ordersList));
}
