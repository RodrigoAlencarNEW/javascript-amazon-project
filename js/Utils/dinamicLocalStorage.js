export function saveLocalStorage(value) {
  return localStorage.setItem("cart", JSON.stringify(value));
}

export function loadLocalStorage() {
  return JSON.parse(localStorage.getItem("cart"));
}
