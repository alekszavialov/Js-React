import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

import {addToCart, removeFromCart, decreaseInCart} from '../../../data/Store/actions';

import Navigation from './components/Navigation'
import HeadSearch from './components/HeadSearch'
import ShoppingCart from './components/ShoppingCart'
import Catalog from './components/ItemsNavigation'
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
      catalogList: null,
      catalogListFixed: false,
      mobileListIsOpen: false,
      isMobile: window.innerWidth <= 992
    };

    this.toggleModalMenu = this.toggleModalMenu.bind(this);
    this.toggleMobileList = this.toggleMobileList.bind(this);
    this.changeQuantityInCart = this.changeQuantityInCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.updateIsMobile = this.updateIsMobile.bind(this);
  }

  toggleModalMenu() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  toggleMobileList() {
    this.setState({
      mobileListIsOpen: !this.state.mobileListIsOpen
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
        <header ref={elem => this.header = elem}>
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
          <div className="bg-normal head-line-block">
            <div className="head-line-default" ref={elem => this.headLine = elem}>
              <div className="container">
                <div className="row">
                  <div className="col-md-3 head-logo">
                    <NavLink to='/'>
                      <img src="https://vct1.com/img/logo.png.pagespeed.ce.dMpD6YjZpM.png"
                           alt="Логотип компании ВКТ Сервис"
                           title="Интернет-магазин ВКТ Сервис"/>
                    </NavLink>
                  </div>
                  <div className="col-md-3 col-md-push-4 col-sm-7 col-xs-7 head-telephones">
                    <p>Наши телефоны</p>
                    <a href="tel:0522320575">0522 32 05 75</a>
                    <a href="tel:0997017001">099 70 17 001</a>
                  </div>
                  <div className="col-md-2 col-md-push-4  col-sm-5 col-xs-5 head-bucket">
                    <ShoppingCart
                      handleClick={this.toggleModalMenu}
                      value={this.props.cart.reduce((acc, item) => acc + item.quantity, 0)}/>
                  </div>
                  <div className="col-md-4 col-md-pull-5 col-sm-12 col-xs-12 head-search">
                    <HeadSearch/>
                    {this.state.catalogListFixed && this.state.catalogList !== null ? (
                      <div className="shop-navigation-mobile">
                        <ul className={this.state.mobileListIsOpen ? "shop-navigation-mobile-open" : null}>
                          <li onClick={this.toggleMobileList}>
                            Каталог
                          </li>
                          <Catalog list={this.state.catalogList} mobileList={true}/>
                        </ul>
                      </div>
                    ) : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-shop">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="product-card-tabs">
                    <div className="shop-navigation">
                      <ul>
                        {!this.state.isMobile ?
                          (
                            <li key='catalog'><NavLink to='/catalog'>Каталог</NavLink>
                              {!this.state.catalogListFixed && this.state.catalogList !== null ? (
                                <Catalog list={this.state.catalogList}/>
                              ) : ""}
                            </li>
                          ) :
                          null}
                        <li key='actions'><NavLink to='/page/actions'>Акции</NavLink></li>
                        <li key='service'><NavLink to='/page/service'>Сервис</NavLink></li>
                        <li key='sale'><NavLink to='/page/sale'>Распродажа</NavLink></li>
                      </ul>
                    </div>
                    {this.state.isMobile && this.state.catalogList !== null ?
                      (
                        <div className="shop-navigation-mobile">
                          <ul className={this.state.mobileListIsOpen ? "shop-navigation-mobile-open" : null}>
                            <li onClick={this.toggleMobileList}>
                              Каталог
                            </li>
                            <Catalog list={this.state.catalogList} mobileList={true}/>
                          </ul>
                        </div>
                      )
                      :
                      null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </Fragment>
    )
  }

  updateIsMobile() {
    this.setState({
      isMobile: window.innerWidth <= 992
    });
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.updateIsMobile);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.updateIsMobile);
  }

  handleScroll() {
    if (window.scrollY > this.header.clientHeight && this.headLine.className.includes("head-line-default")) {
      new Promise((resolve) => {
        this.headLine.classList.remove("fade-visible");
        this.headLine.classList.add("fade-hidden");
        setTimeout(() => {
          resolve();
        }, 200);
      })
        .then(() => {
          this.setState({catalogListFixed: true, mobileListIsOpen: false});
          this.header.style.height = this.header.clientHeight + "px";
          this.headLine.classList.add("head-line-fixed");
          this.headLine.classList.remove("head-line-default");
        }).then(() => {
        this.headLine.classList.remove("fade-hidden");
        this.headLine.classList.add("fade-visible");
      });
    } else if (window.scrollY <= this.header.clientHeight &&
      this.headLine.className.includes("head-line-fixed")) {
      new Promise((resolve) => {
        this.headLine.classList.remove("fade-visible");
        this.headLine.classList.add("fade-hidden");
        setTimeout(() => {
          resolve();
        }, 200);
      })
        .then(() => {
          this.headLine.classList.add("head-line-default");
          this.headLine.classList.remove("head-line-fixed");
          this.header.style.height = "auto";
          this.setState({catalogListFixed: false, mobileListIsOpen: false});
        }).then(() => {
        this.headLine.classList.remove("fade-hidden");
        this.headLine.classList.add("fade-visible");
      });
    }
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
