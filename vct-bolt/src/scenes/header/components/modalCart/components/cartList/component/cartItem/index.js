import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class CartItem extends Component {

    static propTypes = {
        item: PropTypes.object,
        onChangeQuantity: PropTypes.func,
        onRemoveFromCart: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            article: this.props.item.article,
            value: this.props.item.quantity
        };

        this.changeQuantityInCart = this.changeQuantityInCart.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
    }

    changeQuantityInCart(e) {
        const value = Number(e.target.value);
        this.setState({value});
        this.props.onChangeQuantity({article: this.state.article, quantity: value});
    }

    removeFromCart() {
        this.props.onRemoveFromCart({article: this.state.article});
    }

    render() {
        return (
            <div className="modal-cart-items-shopped-item">
                <div className="modal-cart-items-shopped-item-img">
                    <NavLink to={`product/${this.props.item.name}`}>
                        <img
                            src={this.props.item.src}
                            alt={`image of ${this.props.item.name}`}
                        />
                    </NavLink>
                </div>
                <div className="modal-cart-items-shopped-item-info">
                    <NavLink to={`product/${this.props.item.name}`}>{this.props.item.name}</NavLink>
                    <p>{this.props.item.article}</p>
                    <div className="modal-cart-items-shopped-item-info-price">
                        {this.props.item.price}<p>грн</p>
                    </div>
                    <div className="modal-cart-items-shopped-item-info-count">
                        <p>Количество(шт.)</p>
                        <input
                            value={this.state.value}
                            min="1"
                            max="99"
                            id={this.state.article}
                            onChange={this.changeQuantityInCart}
                            type="number"
                        />
                        <div
                            className="modal-cart-items-shopped-item-remove"
                            onClick={this.removeFromCart}
                        >+</div>
                    </div>
                </div>
            </div>
        );
    }
}
