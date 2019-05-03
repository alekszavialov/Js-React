import React, {Component} from 'react'
import PropTypes from 'prop-types'

import ShopItem from './components/shopItem'

import './styles.css'

export default class ItemCatalog extends Component {
  static propTypes = {
    items: PropTypes.array
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="shop-items">
        {this.props.items.map(item =>
          <ShopItem item={item} key={item.name + Math.random()}/>
        )}
      </div>

    )
  }
}
