export function addToCart(item, value) {
  return {
    type: "ADD_TO_CART",
    item,
    value
  }
}

export function decreaseInCart(item, value) {
  return {
    type: "DECREASE_IN_CART",
    item,
    value
  }
}

export function removeFromCart(item) {
  return {
    type: "REMOVE_FROM_CART",
    item
  }
}
