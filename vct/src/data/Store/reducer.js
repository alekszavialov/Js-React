const cartWithoutItem = (cart, item) => cart.filter(cartItem => cartItem.article !== item.article);
const itemInCart = (cart, item) => cart.filter(cartItem => cartItem.article === item.article)[0];

const addToCart = (cart, item) => {
  const cartItem = itemInCart(cart, item);
  return cartItem === undefined
    ? [ ...cart, { ...item, quantity: 1 }]
    : [ ...cartWithoutItem(cart, item), { ...cartItem, quantity: cartItem.quantity + 1 }]
};

const decreaseInCart = (cart, item) => {
  return item.quantity === 1
    ? [ ...cartWithoutItem(cart, item) ]
    : [ ...cartWithoutItem(cart, item), { ...item, quantity: item.quantity - 1 } ]
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
      return sortCart(addToCart(state, action.item));
    case "REMOVE_FROM_CART":
      return sortCart(removeFromCart(state, action.item));
    case "DECREASE_IN_CART":
      return sortCart(decreaseInCart(state, action.item));
    default:
      return state;
  }
}
