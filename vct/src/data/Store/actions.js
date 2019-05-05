export function addToCart(item) {
  return {
    type: "ADD_TO_CART",
    item
  }
}

export function decreaseInCart(item) {
  return {
    type: "DECREASE_IN_CART",
    item
  }
}

export function removeFromCart(item) {
  return {
    type: "REMOVE_FROM_CART",
    item
  }
}
