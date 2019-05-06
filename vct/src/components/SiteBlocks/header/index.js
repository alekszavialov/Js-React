import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {addToCart, removeFromCart, decreaseInCart} from '../../../data/Store/actions';

import Navigation from './components/Navigation'
import Callback from './components/Callback'
import HeadSearch from './components/HeadSearch'
import ShoppingCart from './components/ShoppingCart'
import ItemsNavigation from './components/ItemsNavigation'
import ModalCart from './components/modalCart'

class Header extends Component {

  static propTypes = {
    cart: PropTypes.array,
    onAddToCart: PropTypes.func,
    onDecreaseInCart: PropTypes.func,
    onRemoveFromCart: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.toggleModalMenu = this.toggleModalMenu.bind(this);
    this.changeQuantityInCart = this.changeQuantityInCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
  }

  toggleModalMenu() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  changeQuantityInCart(item){
    const product = this.findProduct(item.article);
    product.quantity > item.quantity ?
      this.props.onDecreaseInCart(product, item.quantity) :
      this.props.onAddToCart(product, item.quantity);
  }

  findProduct = (article) => this.props.cart.filter(cartItem => cartItem.article === article)[0];

  removeFromCart(item){
    const product = this.findProduct(item.article);
    product && this.props.onRemoveFromCart(product);
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
    console.log(this.state.isOpen);
    return (
      <Fragment>
        {this.state.isOpen ?
          <ModalCart
          items={this.props.cart}
          onChangeQuantity={this.changeQuantityInCart}
          onRemoveFromCart={this.removeFromCart}
          handleClose={this.toggleModalMenu}/> :
          ''
        }
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
                  <a href="index">
                    <img src="https://vct1.com/img/logo.png.pagespeed.ce.dMpD6YjZpM.png"
                         alt="Логотип компании ВКТ Сервис"
                         title="Интернет-магазин ВКТ Сервис"/>
                  </a>
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
                    handleClick={this.toggleModalMenu}
                    value={this.props.cart.reduce((acc, item) => acc+item.quantity,0)}/>
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
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.Store
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddToCart: (item, value) => dispatch(addToCart(item, value)),
    onDecreaseInCart: (item, value) => dispatch(decreaseInCart(item, value)),
    onRemoveFromCart: (item) => dispatch(removeFromCart(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header)
