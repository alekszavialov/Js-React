const cartWithoutItem = (cart, item) => cart.filter(cartItem => cartItem.article !== item.article);
const itemInCart = (cart, item) => cart.filter(cartItem => cartItem.article === item.article)[0];

const addToCart = (cart, item, value) => {
  const cartItem = itemInCart(cart, item);
  return cartItem === undefined
    ? [ ...cart, { ...item, quantity: 1 }]
    : [ ...cartWithoutItem(cart, item), { ...cartItem, quantity: value ? value : (cartItem.quantity + 1) }]
};

const decreaseInCart = (cart, item, value) => {
  return item.quantity === 1
    ? [ ...cartWithoutItem(cart, item) ]
    : [ ...cartWithoutItem(cart, item), { ...item, quantity: value ? value : (item.quantity - 1) } ]
};

const removeFromCart = (cart, item) => {
  return [ ...cartWithoutItem(cart, item) ]
};

const sortCart = (cart) => {
  return cart.sort((a, b) => a.article - b.article)
}

const initialState = [];

export default function Store(state = initialState, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return sortCart(addToCart(state, action.item, action.value));
    case "REMOVE_FROM_CART":
      return sortCart(removeFromCart(state, action.item));
    case "DECREASE_IN_CART":
      return sortCart(decreaseInCart(state, action.item, action.value));
    default:
      return state;
  }
}
