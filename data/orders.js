export const ordersList = JSON.parse(localStorage.getItem("orders")) || [];

export function addOrder(order) {
  if (!order) return;

  ordersList.unshift(order);
  saveLocalStorage();
}

function saveLocalStorage() {
  localStorage.setItem("orders", JSON.stringify(ordersList));
}
