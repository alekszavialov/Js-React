export function addToCart(item, value) {
    return {
        type: 'ADD_TO_CART',
        item,
        value
    };
}

export function addToRecently(item) {
    return {
        type: 'ADD_TO_RECENTLY',
        item
    };
}

export function decreaseInCart(item, value) {
    return {
        type: 'DECREASE_IN_CART',
        item,
        value
    };
}

export function removeFromCart(item) {
    return {
        type: 'REMOVE_FROM_CART',
        item
    };
}

export function removeAllFromCart() {
    return {
        type: 'REMOVE_ALL_FROM_CART'
    };
}
