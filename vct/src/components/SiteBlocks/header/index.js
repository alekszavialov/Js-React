import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types';

import {addToCart, removeFromCart, decreaseInCart} from '../../../data/Store/actions';

import Navigation from './components/Navigation'
import HeadSearch from './components/HeadSearch'
import ShoppingCart from './components/ShoppingCart'
import ItemsNavigation from './components/ItemsNavigation'
import ModalCart from './components/modalCart'

import fetchApi from '../../../modules/fetch-api'

import './styles.css'

class Header extends Component {

  static propTypes = {
    cart: PropTypes.array,
    onAddToCart: PropTypes.func,
    onDecreaseInCart: PropTypes.func,
    onRemoveFromCart: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      catalogList: null
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

  changeQuantityInCart(item) {
    const product = this.findProduct(item.article);
    product.quantity > item.quantity ?
      this.props.onDecreaseInCart(product, item.quantity) :
      this.props.onAddToCart(product, item.quantity);
  }

  findProduct = (article) => this.props.cart.filter(cartItem => cartItem.article === article)[0];

  removeFromCart(item) {
    const product = this.findProduct(item.article);
    product && this.props.onRemoveFromCart(product);
  }

  loadCatalogList = () => {
    fetchApi('../../fakeAPI/headerItemNavigationItems.json')
      .then(result => this.setState({
          catalogList: result
        }
      ));
  };

  componentWillMount() {
    this.loadCatalogList();
  }

  render() {
    const list = [
      {text: 'Главная', url: 'main-page'},
      {text: 'О нас', url: 'contacts'},
      {text: 'Новости', url: 'contacts'},
      {text: 'Магазин', url: 'contacts'},
      {text: 'Сервисный центр', url: 'contacts'},
      {text: 'Контакты', url: 'contacts'},
      {text: 'Вход', url: '/product'},
    ];
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
                  <p>Напиши Нам : </p>
                  <a href="#">Обратная связь</a>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-normal">
            <div className="container">
              <div className="row">
                <div className="col-md-3 head-logo">
                  <NavLink to='/'>
                    <img src="https://vct1.com/img/logo.png.pagespeed.ce.dMpD6YjZpM.png"
                         alt="Логотип компании ВКТ Сервис"
                         title="Интернет-магазин ВКТ Сервис"/>
                  </NavLink>
                </div>
                <div className="col-md-4 head-search">
                  <HeadSearch/>
                </div>
                <div className="col-md-3 head-telephones">
                  <p>Наши телефоны</p>
                  <a href="tel:0522320575">0522 32 05 75</a>
                  <a href="tel:0997017001">099 70 17 001</a>
                </div>
                <div className="col-md-2 head-bucket">
                  <ShoppingCart
                    handleClick={this.toggleModalMenu}
                    value={this.props.cart.reduce((acc, item) => acc + item.quantity, 0)}/>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-shop">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  {this.state.catalogList !== null ? (
                    <div className="product-card-tabs">
                      <ItemsNavigation list={this.state.catalogList}/>
                    </div>
                  ) : ""}
                </div>
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
