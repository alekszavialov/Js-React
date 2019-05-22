import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ShopItem from './components/shopItem';

import './styles.css';

export default class ItemCatalog extends Component {
    static propTypes = {
        items: PropTypes.array,
        onAddToCart: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.onAddToCart = this.onAddToCart.bind(this);
    }

    onAddToCart(item) {
        this.props.onAddToCart(item);
    }

    render() {
        return (
            <div className="shop-items">
                {this.props.items.map((item, index) =>
                    <ShopItem item={item} key={item.title + index} addToCart={this.onAddToCart}/>
                )}
            </div>

        );
    }
}
