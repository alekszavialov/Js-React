import React, {Component} from 'react'
import PropTypes from 'prop-types'

import './styles.css'
import CatalogItem from './components/catalogItem'

export default class Catalog extends Component {

  static propTypes = {
    list: PropTypes.array
  };

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ul className="toggle-menu">
        {this.props.list.map(item => {
          return <CatalogItem item={item} key={item.name + this.props.list.length}/>
        })}
      </ul>
    )
  }

}
