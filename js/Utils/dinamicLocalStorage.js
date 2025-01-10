export function saveLocalStorage(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}

export function loadLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
