import React, {Component} from 'react'
import PropTypes from 'prop-types'

import './styles.css'

export default class ShopItem extends Component {
  static propTypes = {
    item: PropTypes.object
  }

  constructor(props) {
    super(props)
  }

  createItemBlock = () => {
    return (
      <div className="shop-block">
        <div className="shop-block-container">
          <img src={this.props.item.src} alt="123"/>
          < a className="shop-block-name" href={this.props.item.href}>{this.props.item.name}</a>
          <p className="shop-block-descr">{this.props.item.description}</p>
          <div className="shop-block-price">
            {this.props.item.price}
            <p>грн</p>
          </div>
          <a href="#" className="shop-block-buy">
            <span>Купить</span>
          </a>
        </div>
      </div>
    )
  }

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
  }

  render() {
    return (
      this.props.item.banner ? this.createItemBanner() : this.createItemBlock()
    )
  }
}
