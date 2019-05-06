import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import './styles.css'
import Catalog from './components/catalog'

export default class ItemsNavigation extends Component{

  static propTypes = {

  }

  constructor(props){
    super(props)
  }

  render(){
    const list = [
      {name: 'Test', items: [{text:'text', url:'url'},{text:'text', url:'url'},{text:'text', url:'url'},
          {text:'text', url:'url'},{text:'text', url:'url'},{text:'text', url:'url'},
          {text:'text', url:'url'},{text:'text', url:'url'},{text:'text', url:'url'},
          {text:'text', url:'url'},{text:'text', url:'url'},{text:'text', url:'url'},
          {text:'text', url:'url'},{text:'text', url:'url'},{text:'text', url:'url'},
          {text:'text', url:'url'},{text:'text', url:'url'},{text:'text', url:'url'},
          {text:'text', url:'url'},{text:'text', url:'url'},
          {text:'text', url:'url'},{text:'text', url:'url'},{text:'text', url:'url'},]},
      {name: 'Test2', items: [{text:'text', url:'url'},{text:'text', url:'url'},{text:'text', url:'url'},{text:'text', url:'url'},{text:'text', url:'url'}]},
      {name: 'Test3', items: [{text:'text', url:'url'},{text:'text', url:'url'},{text:'text', url:'url'},{text:'text', url:'url'},{text:'text', url:'url'}]},
      {name: 'Test4', items: [{text:'text', url:'url'},{text:'text', url:'url'},{text:'text', url:'url'},{text:'text', url:'url'},{text:'text', url:'url'}]},
      {name: 'Test5', items: [{text:'text', url:'url'},{text:'text', url:'url'},{text:'text', url:'url'},{text:'text', url:'url'},{text:'text', url:'url'}]},
      {name: 'Test6', items: [{text:'text', url:'url'},{text:'text', url:'url'},{text:'text', url:'url'},{text:'text', url:'url'},{text:'text', url:'url'}]},
      {name: 'Test7', items: [{text:'text', url:'url'},{text:'text', url:'url'},{text:'text', url:'url'},{text:'text', url:'url'},{text:'text', url:'url'}]},
      {name: 'Test8', items: [{text:'text', url:'url'},{text:'text', url:'url'},{text:'text', url:'url'},{text:'text', url:'url'},{text:'text', url:'url'}]},
    ]
    return (
      <div className="col-md-12 shop-navigation">
        <ul>
          <li key='catalog'><a href="catalog">Каталог</a><Catalog list={list}/></li>
          <li key='actions'><a href="">Акции</a></li>
          <li key='service'><NavLink to='/catalog'>Catalog</NavLink></li>
          <li key='sale'><NavLink to='/product'>Product</NavLink></li>
        </ul>
      </div>
    )
  }

}
