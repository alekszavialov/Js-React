import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CartItem from './component/cartItem';

export default class CartList extends Component {

    static propTypes = {
        cartItems: PropTypes.array,
        totalPrice: PropTypes.number,
        handleCloseCart: PropTypes.func,
        onChangeQuantity: PropTypes.func,
        onRemoveFromCart: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.closeCart = this.closeCart.bind(this);
        this.changeQuantityInCart = this.changeQuantityInCart.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.loadCart = this.loadCart.bind(this);
    }

    closeCart(e) {
        this.props.handleCloseCart(e);
    }

    changeQuantityInCart(item) {
        this.props.onChangeQuantity(item);
    }

    removeFromCart(item) {
        this.props.onRemoveFromCart(item);
    }

    loadCart(){
        return this.props.cartItems.map(item =>
            <CartItem
                key={item.article}
                item={item}
                onChangeQuantity={this.changeQuantityInCart}
                onRemoveFromCart={this.removeFromCart}
            />
        );
    };

    render() {
        const {totalPrice} = this.props;
        return (
            <div className="modal-cart-items">
                <div className="modal-cart-items-shopped">
                    {this.loadCart()}
                </div>
                <div className="modal-cart-items-pay">
                    <span>К оплате</span>
                    <div className="modal-cart-items-shopped-item-info-price">
                        {totalPrice}
                        <p>грн</p>
                    </div>
                </div>
                <div className="continue-shopping">
                    <img
                        className="closeCard"
                        onClick={this.closeCart}
                        src="https://vct1.com/img/continue_shop.png"
                        alt=""
                    />
                </div>
            </div>
        );
    }

}
