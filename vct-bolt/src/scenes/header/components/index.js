import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Navigation from './Navigation/index';
import HeadSearch from './HeadSearch/index';
import Catalog from './ItemsNavigation/index';
import ModalCart from './modalCart/index';
import BurgerMenu from './burgerMenu';

export default class HeaderComponent extends Component {

    static propTypes = {
        navigationList: PropTypes.array,
        itemsCart: PropTypes.array,
        catalogList: PropTypes.array,
        isMobile: PropTypes.bool,
        bucketIsOpen: PropTypes.bool,
        fixedMenu: PropTypes.bool,

        mobileListIsOpen: PropTypes.bool,
        handleScroll: PropTypes.func,
        toggleModalMenu: PropTypes.func,
        toggleMobileList: PropTypes.func,

        changeQuantityInCart: PropTypes.func,
        removeFromCart: PropTypes.func,
        handleSubmit: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.handleScroll = this.handleScroll.bind(this);
        this.toggleModalMenu = this.toggleModalMenu.bind(this);
        this.toggleMobileList = this.toggleMobileList.bind(this);
        this.changeQuantityInCart = this.changeQuantityInCart.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        this.props.handleScroll(this.header, this.headLine);
    }

    toggleModalMenu() {
        this.props.toggleModalMenu();
    }

    toggleMobileList(state) {
        this.props.toggleMobileList(state);
    }

    changeQuantityInCart(item) {
        this.props.changeQuantityInCart(item);
    }

    removeFromCart(item) {
        this.props.removeFromCart(item);
    }

    handleSubmit() {
        this.props.handleSubmit();
    }

    render() {
        const {
            bucketIsOpen,
            itemsCart,
            navigationList,
            fixedMenu,
            catalogList,
            isMobile,
            mobileListIsOpen
        } = this.props;
        const hamburgerOpen = mobileListIsOpen ? 'open-list' : "";
        return (
            <Fragment>
                {
                    bucketIsOpen &&
                    <ModalCart
                        items={itemsCart}
                        onChangeQuantity={this.changeQuantityInCart}
                        onRemoveFromCart={this.removeFromCart}
                        handleClose={this.toggleModalMenu}
                        handleSubmit={this.handleSubmit}
                    />
                }
                {
                    catalogList &&
                        <BurgerMenu
                            list={catalogList}
                            isOpen={mobileListIsOpen}
                            toggleMobileList={this.toggleMobileList}
                        />
                }
                {
                    fixedMenu &&
                    <div className="fixed-menu">
                        <div className={`open-fixed-menu ${hamburgerOpen}`} onClick={this.toggleMobileList}>
                            <div className={`head-catalog-hamburger`}>
                                <div/>
                                <div/>
                                <div/>
                            </div>
                            <span>Каталог</span>
                        </div>
                        <div className="head-search">
                            <HeadSearch/>
                        </div>
                        <div className="head-bucket">
                            <img
                                src="https://vct1.com/img/bucket.gif.pagespeed.ce.bEDFj2GcQE.gif"
                                alt="ВКТ"
                                title="ВКТ"
                                onClick={this.toggleModalMenu}
                            />
                            <span>{itemsCart.reduce((acc, item) => acc + item.quantity, 0)} шт.</span>
                        </div>
                    </div>
                }
                <header ref={elem => this.header = elem}>
                    <div className="bg-dark">
                        <div className="container-fluid max-container-width">
                            <div className="row">
                                <div className="col-md-8 top-nav">
                                    <Navigation navList={navigationList}/>
                                </div>
                                <div className="col-md-4 callback-block">
                                    <p>Напиши Нам : </p>
                                    <a href="">Обратная связь</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-normal head-line-block">
                        <div className="head-line-default">
                            <div className="container-fluid max-container-width">
                                <div className="row">
                                    <div className="col-md-3 col-sm-4 col-xs-6 head-logo">
                                        <NavLink to='/'>
                                            <img
                                                src="https://vct1.com/img/logo.png.pagespeed.ce.dMpD6YjZpM.png"
                                                alt="Логотип компании ВКТ Сервис"
                                                title="Интернет-магазин ВКТ Сервис"
                                            />
                                        </NavLink>
                                    </div>
                                    <div className="col-md-3 col-md-push-4 col-sm-4 col-xs-6 head-telephones">
                                        <p>Наши телефоны</p>
                                        <a href="tel:0522320575">0522 32 05 75</a>
                                        <a href="tel:0997017001">099 70 17 001</a>
                                    </div>
                                    <div className="col-md-2 col-md-push-4  col-sm-4 col-xs-4 hidden-xs head-bucket">
                                        <img
                                            src="https://vct1.com/img/bucket.gif.pagespeed.ce.bEDFj2GcQE.gif"
                                            alt="ВКТ"
                                            title="ВКТ"
                                            onClick={this.toggleModalMenu}
                                        />
                                        <span>{itemsCart.reduce((acc, item) => acc + item.quantity, 0)} шт.</span>
                                    </div>
                                    <div className="col-md-4 col-md-pull-5 col-sm-12 col-xs-12 head-search">
                                        {
                                            isMobile &&
                                            <li key='catalog' className="head-catalog">
                                                <div className="head-catalog-hamburger">
                                                    <div/>
                                                    <div/>
                                                    <div/>
                                                </div>
                                                <span>Каталог</span>
                                            </li>
                                        }
                                        <HeadSearch/>
                                        {
                                            isMobile &&
                                            <div className="hidden-sm head-bucket">
                                                <img
                                                    src="https://vct1.com/img/bucket.gif.pagespeed.ce.bEDFj2GcQE.gif"
                                                    alt="ВКТ"
                                                    title="ВКТ"
                                                    onClick={this.toggleModalMenu}
                                                />
                                                <span>{itemsCart.reduce((acc, item) => acc + item.quantity, 0)} шт.</span>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-shop">
                        <div className="container-fluid max-container-width">
                            <div className="row">
                                {
                                    !isMobile &&
                                    <div className="col-md-12">
                                        <div className="product-card-tabs">
                                            <div className="shop-navigation">
                                                <ul>
                                                    <li key='catalog' className="head-catalog">
                                                        <div className="head-catalog-hamburger">
                                                            <div/>
                                                            <div/>
                                                            <div/>
                                                        </div>
                                                        <span>Каталог</span>
                                                        {catalogList !== null && (
                                                            <Catalog list={catalogList}/>
                                                        )}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </header>
            </Fragment>
        );
    }
}



