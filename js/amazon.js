let productGrid = document.querySelector(".products-grid");
let cartItems = document.querySelector("#js-cart-quantity");

let productsHTML = "";

let timeoutReset;

const messageAddedToCart = (feedbackElement) => {
  if (timeoutReset) clearTimeout(timeoutReset);

  feedbackElement.style.opacity = 1;

  timeoutReset = setTimeout(() => {
    feedbackElement.style.opacity = 0;
  }, 2000);
};

products.forEach((product) => {
  productsHTML += `<div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines ">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="images/ratings/rating-${
            product.rating.stars * 10
          }.png">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${product.priceCents / 100}
        </div>

        <div class="product-quantity-container">
          <select class="">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary" data-product-id="${
          product.id
        }">
          Add to Cart
        </button>
      </div>`;

  productGrid.innerHTML = productsHTML;
});

let addToCartButton = document.querySelectorAll(".add-to-cart-button");

addToCartButton.forEach((button) => {
  button.addEventListener("click", () => {
    const { productId } = button.dataset;

    const selectedItem = button.parentElement.querySelector("select");
    const quantitySelected = Number(selectedItem.value);
    selectedItem.classList.add(`js-selected-${productId}`);

    const addedToCart = button.parentElement.querySelector(".added-to-cart");
    messageAddedToCart(addedToCart);

    let inCart;

    cart.forEach((item) => {
      if (productId === item.productId) inCart = item;
    });

    if (inCart) inCart.quantitySelected += quantitySelected;

    if (!inCart) {
      cart.push({ productId, quantitySelected });
    }

    cartItems.innerHTML = cart.length;
  });
});
