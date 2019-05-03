import React, {Component} from 'react'
import PropTypes from 'prop-types'

import './styles.css'

const maxElementsValue = 24;

export default class CatalogItem extends Component {

  static propTypes = {
    item: PropTypes.object
  }

  constructor(props) {
    super(props)
  }

  fillEmptySpace = () => {

    let newList = this.props.item.items.map((item, index) => {
      return <a href="#" key={item.text + index}>{item.text}</a>
    });
    while (newList.length < maxElementsValue) {
      newList.push(<a href="#" key={newList.length} className="disabled"></a>)
    }
    return newList;
  }

  render() {
    return (
      <li>
        <a href="#">{this.props.item.name}</a>
        <ul>
          {this.fillEmptySpace()}
        </ul>
      </li>
    )
  }
}
