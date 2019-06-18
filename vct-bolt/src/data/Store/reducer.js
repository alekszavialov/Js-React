import { REHYDRATE } from 'redux-persist';

const cartWithoutItem = (cart, item) => cart.filter(cartItem => cartItem.article !== item.article);
const itemInCart = (cart, item) => cart.filter(cartItem => cartItem.article === item.article)[0];

const addToCart = (cart, item, value) => {
    const cartItem = itemInCart(cart, item);
    return cartItem === undefined
        ? [...cart, { ...item, quantity: 1 }]
        : [...cartWithoutItem(cart, item), { ...cartItem, quantity: value || (cartItem.quantity + 1) }];
};

const decreaseInCart = (cart, item, value) => {
    return item.quantity === 1
        ? [...cartWithoutItem(cart, item)]
        : [...cartWithoutItem(cart, item), { ...item, quantity: value || (item.quantity - 1) }];
};

const removeFromCart = (cart, item) => {
    return [...cartWithoutItem(cart, item)];
};

const sortCart = (cart) => {
    return cart.sort((a, b) => a.article - b.article);
};

const initialState = {
    recently: [],
    cart: []
};

export default function Store(state = initialState, action) {
    switch (action.type) {
        case REHYDRATE:
            return state;
        case 'ADD_TO_CART':
            return {
                ...state,
                cart: sortCart(addToCart(state.cart, action.item, action.value))
            };
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: sortCart(removeFromCart(state.cart, action.item))
            };
        case 'DECREASE_IN_CART':
            return {
                ...state,
                cart: sortCart(decreaseInCart(state.cart, action.item, action.value))
            };
        case 'ADD_TO_RECENTLY':
            return {
                ...state,
                recently: [...state.recently, action.item]
            };
        case 'REMOVE_ALL_FROM_CART':
            return {
                ...state,
                cart: initialState.cart
            };
        default:
            return state;
    }
}
