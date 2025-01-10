let timeoutReset;
let itemId;

export function messageAddedToCart(feedbackElement) {
  if (timeoutReset && itemId === feedbackElement.id) {
    clearTimeout(timeoutReset);
  }

  feedbackElement.style.opacity = 1;

  timeoutReset = setTimeout(() => {
    feedbackElement.style.opacity = 0;
  }, 2000);

  itemId = feedbackElement.id;
}
