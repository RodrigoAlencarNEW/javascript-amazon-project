class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  getRating() {
    return `src="images/ratings/rating-${this.rating.stars * 10}.png"`;
  }

  getPrice() {
    return (Math.round(this.priceCents) / 100).toFixed(2);
  }
}

export let products = [];

export function loadProductsData(functionToRun) {
  new Promise(() => {
    fetch("https://supersimplebackend.dev/products")
      .then((response) => {
        return response.json();
      })
      .then((productsList) => {
        products = productsList.map((productDetails) => {
          return new Product(productDetails);
        });
      })
      .then(() => {
        functionToRun();
      });
  });
}
