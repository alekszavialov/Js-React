import React, {Component} from 'react'
import PropTypes from 'prop-types';

import Navigation from './components/Navigation'
import Callback from './components/Callback'
import Logo from './components/Logo'
import HeadSearch from './components/HeadSearch'
import ShoppingCart from './components/ShoppingCart'
import ItemsNavigation from './components/ItemsNavigation'

export default class Header extends Component {
  static propTypes = {}

  constructor(props) {
    super(props)
  }

  render() {
    const list = [
      {text: 'Главная', url: 'main-page'},
      {text: 'О нас', url: 'contacts'},
      {text: 'Новости', url: 'contacts'},
      {text: 'Магазин', url: 'contacts'},
      {text: 'Сервисный центр', url: 'contacts'},
      {text: 'Контакты', url: 'contacts'},
      {text: 'Вход', url: 'main-page'},
    ]
    return (
      <header>
        <div className="bg-dark">
          <div className="container">
            <div className="row">
              <div className="col-md-8 top-nav">
                <Navigation navList={list}/>
              </div>
              <div className="col-md-4 callback-block">
                <Callback/>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-normal">
          <div className="container">
            <div className="row">
              <div className="col-md-3 head-logo">
                <Logo
                  src="https://vct1.com/img/logo.png.pagespeed.ce.dMpD6YjZpM.png"
                  title="Интернет-магазин ВКТ Сервис"
                  alt="Логотип компании ВКТ Сервис"/>
              </div>
              <div className="col-md-4 head-search">
                <HeadSearch/>
              </div>
              <div className="col-md-3 head-telephones">
                <p>Наши телефоны</p>
                <a href="">0522 32 05 75</a>
                <a href="">099 70 17 001</a>
              </div>
              <div className="col-md-2 head-bucket">
                <ShoppingCart
                  src="https://vct1.com/img/bucket.gif.pagespeed.ce.bEDFj2GcQE.gif"
                  alt="ВКТ"
                  title="ВКТ"
                  value={0}/>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-shop">
          <div className="container">
            <div className="row">
              <ItemsNavigation/>
            </div>
          </div>
        </div>
      </header>

    )
  }

}
