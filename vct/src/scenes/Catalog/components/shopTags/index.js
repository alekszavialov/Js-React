import React, {Component} from 'react'
import PropTypes from 'prop-types'

import './styles.css'

export default class ShopTags extends Component {

  static propTypes = {
    items: PropTypes.array
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="shop-tags">
        {this.props.items.map(item =>
          <a href={item.href} key={item.name}>{item.name}</a>
        )}
      </div>
    )
  }

}
