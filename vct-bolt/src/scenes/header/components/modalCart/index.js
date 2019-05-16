import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CartOrderForm from './components/cartOrderForm';
import CartList from './components/cartList';

import './styles.css';

export default class ShoppingCartModal extends Component {

    static propTypes = {
        items: PropTypes.array,
        onChangeQuantity: PropTypes.func,
        onRemoveFromCart: PropTypes.func,
        handleClose: PropTypes.func,
        handleSubmit: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.closeCart = this.closeCart.bind(this);
        this.changeQuantityInCart = this.changeQuantityInCart.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    closeCart(e) {
        if (!e.target.className.includes('closeCard')) {
            return;
        }
        this.props.handleClose();
    }

    changeQuantityInCart(item) {
        this.props.onChangeQuantity(item);
    }

    removeFromCart(item) {
        this.props.onRemoveFromCart(item);
    }

    handleSubmit() {
        this.props.handleSubmit();
    }

    render() {
        const { items } = this.props;
        const totalPrice = this.props.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        return (
            <div className="modal-cart-bg closeCard" onClick={this.closeCart}>
                <div className="modal-cart">
                    <CartOrderForm
                        handleSubmit={this.handleSubmit}
                    />
                    <CartList
                        cartItems={items}
                        totalPrice={totalPrice}
                        handleCloseCart={this.closeCart}
                        onChangeQuantity={this.changeQuantityInCart}
                        onRemoveFromCart={this.removeFromCart}
                    />
                </div>
            </div>
        );
    }

}
