import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import './styles.css';

export default class ShopItem extends Component {
    static propTypes = {
        item: PropTypes.object,
        addToCart: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            name: this.props.item.title,
            description: this.props.item.description,
            src: this.props.item.img,
            price: this.props.item.price,
            article: this.props.item.id
        };

        this.addToCart = this.addToCart.bind(this);
        this.createItemBlock = this.createItemBlock.bind(this);
        this.createItemBanner = this.createItemBanner.bind(this);
    }

    addToCart() {
        this.props.addToCart(this.state);
    }

    createItemBlock() {
        const {name, description, src, price} = this.state;
        const {url} = this.props.item;
        return (
            <div className="shop-block">
                <div className="shop-block-container" itemScope itemType="http://schema.org/Product">
                    <NavLink className="shop-block-image-wrapper" to={url}>
                        <img
                            itemProp="image"
                            src={src}
                            alt={name}
                        />
                    </NavLink>
                    <NavLink className="shop-block-name" to={url}>{name}</NavLink>
                    <p itemProp="description" className="shop-block-descr">{description}</p>
                    <div className="shop-block-price" itemProp="offers" itemScope itemType="http://schema.org/Offer">
                        <div itemProp="price" content={price}>{price}</div>
                        <p itemProp="priceCurrency" content="UAH">грн</p>
                    </div>
                    <div className="shop-block-buy not-selected-text" onClick={this.addToCart}>
                        <span>Купить</span>
                    </div>
                </div>
            </div>
        );
    };

    createItemBanner() {
        return (
            <div className="shop-block">
                <div className="shop-block-container shop-banner">
                    <a href={this.props.item.href}>
                        <img src={this.props.item.src} alt=""/>
                    </a>
                </div>
            </div>
        );
    };

    render() {
        return (
            this.props.item.banner ? this.createItemBanner() : this.createItemBlock()
        );
    }
}
