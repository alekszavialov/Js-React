import React, {Component} from 'react'
import {NavLink} from "react-router-dom";
import PropTypes from 'prop-types'

import './styles.css'

export default class ShopItem extends Component {
  static propTypes = {
    item: PropTypes.object,
    addToCart: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      name: this.props.item.name,
      description: this.props.item.description,
      src: this.props.item.src,
      price: this.props.item.price,
      article: this.props.item.article,
    };

    this.addToCart = this.addToCart.bind(this);
  }

  addToCart(){
    this.props.addToCart(this.state)
  }

  createItemBlock = () => {
    return (
      <div className="shop-block">
        <div className="shop-block-container">
          <img src={this.props.item.src} alt="123"/>
          <NavLink className="shop-block-name" to={this.props.item.href}>{this.props.item.name}</NavLink>
          <p className="shop-block-descr">{this.props.item.description}</p>
          <div className="shop-block-price">
            {this.props.item.price}
            <p>грн</p>
          </div>
          <div className="shop-block-buy not-selected-text" onClick={this.addToCart}>
            <span>Купить</span>
          </div>
        </div>
      </div>
    )
  };

  createItemBanner = () => {
    return (
      <div className="shop-block">
        <div className="shop-block-container shop-banner">
          <a href={this.props.item.href}>
            <img src={this.props.item.src} alt=""/>
          </a>
        </div>
      </div>
    )
  };

  render() {
    return (
      this.props.item.banner ? this.createItemBanner() : this.createItemBlock()
    )
  }
}
