import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import './styles.css'
import Catalog from './components/catalog'

export default class ItemsNavigation extends Component{

  static propTypes = {
    list: PropTypes.array
  };

  constructor(props){
    super(props)
  }

  render(){
    return (
      <div className="col-md-12 shop-navigation">
        <ul>
          <li key='catalog'><NavLink to='/catalog'>Каталог</NavLink><Catalog list={this.props.list}/></li>
          <li key='actions'><NavLink to='/page/actions'>Акции</NavLink></li>
          <li key='service'><NavLink to='/page/service'>Сервис</NavLink></li>
          <li key='sale'><NavLink to='/page/sale'>Распродажа</NavLink></li>
        </ul>
      </div>
    )
  }

}
