import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'

import './styles.css'

const maxElementsValue = 24;

export default class CatalogItem extends Component {

  static propTypes = {
    item: PropTypes.object
  };

  constructor(props) {
    super(props)
  }

  fillEmptySpace = () => {
    let newList = this.props.item.items.map((item, index) =>
      <NavLink key={item.text + index} to={item.url}>{item.text}</NavLink>
    );
    while (newList.length < maxElementsValue) {
      newList.push(<a key={newList.length} className="disabled"/>)
    }
    return newList;
  };

  render() {
    return (
      <li>
        {this.props.item.name}
        <ul>
          {this.fillEmptySpace()}
        </ul>
      </li>
    )
  }
}
