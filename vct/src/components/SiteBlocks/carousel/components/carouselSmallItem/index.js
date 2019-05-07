import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import PropTypes from 'prop-types';


export default class CarouselSmallItem extends Component {

  static propTypes = {
    item: PropTypes.object,
    onAddToCart: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      name: this.props.item.name,
      description: this.props.item.description,
      src: this.props.item.src,
      price: this.props.item.price,
      article: this.props.item.article
    };

    this.addToCart = this.addToCart.bind(this)
  }

  addToCart() {
    this.props.onAddToCart(this.state);
  }

  render() {
    return (
      <div className="accompanying-product-item" key={Math.random()}>
        <div className="accompanying-product-item-img-wrapper"><img src={this.state.src} alt=""/></div>
        <NavLink to={this.props.item.href}>{this.state.name}</NavLink>
        <div className="accompanying-product-item-bottom">
          <div className="accompanying-product-item-price">
            {this.state.price}
            <p> грн</p>
          </div>
          <div className="shop-block-buy"
               onClick={this.addToCart}
          />
        </div>
      </div>
    )
  }

}
