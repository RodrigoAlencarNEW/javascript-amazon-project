import { products } from "../../../../data/products.js";
let timeoutTimer;

export function searchFunction(event) {
  clearTimeout(timeoutTimer);

  timeoutTimer = setTimeout(() => {
    let searchValue = event.target.value.toLowerCase();

    let filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchValue)
    );

    let productGrid = document.querySelector(".products-grid");

    let productsHTML = "";

    if (filteredProducts) {
      productGrid.style = "";

      filteredProducts.forEach((product) => {
        productsHTML += `<div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines ">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" ${product.getRating()}>
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${product.getPrice()}
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

        <div class="added-to-cart" id="${product.id}">
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
    }

    if (!filteredProducts.length) {
      productGrid.style = "";
      productGrid.style = "width: 100%";
      productGrid.style.display = "grid";
      productGrid.style.gridTemplateColumns = "1fr";
      productGrid.style.width = "100%";

      productsHTML += `<div class='no-results-container'>
          
              <div class='no-results-details'>               
                <div class='no-results-icon'>
                  <img src='../../../images/icons/no-results.png'>
                </div>

                <div class='no-results-title'>
                    No results found
                </div>    

                <div class='no-results-subtitle'>
                    Try searching for something else
                </div>
              </div>

          </div>`;

      productGrid.innerHTML = productsHTML;
    }
  }, 500);
}
