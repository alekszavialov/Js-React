import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Navigation from './Navigation/index';
import HeadSearch from './HeadSearch/index';
import Catalog from './ItemsNavigation/index';
import ModalCart from './modalCart/index';
import ModalAlert from './modalAlert/index';
import BurgerMenu from './burgerMenu';

export default class HeaderComponent extends Component {

    static propTypes = {
        navigationList: PropTypes.array,
        itemsCart: PropTypes.array,
        catalogList: PropTypes.array,
        searchList: PropTypes.array,
        isMobile: PropTypes.bool,
        bucketIsOpen: PropTypes.bool,
        fixedMenu: PropTypes.bool,

        mobileListIsOpen: PropTypes.bool,
        alertIsOpen: PropTypes.bool,
        alertText: PropTypes.string,
        handleScroll: PropTypes.func,
        toggleModalMenu: PropTypes.func,
        toggleModalAlert: PropTypes.func,
        toggleMobileList: PropTypes.func,

        changeQuantityInCart: PropTypes.func,
        removeFromCart: PropTypes.func,
        handleSubmit: PropTypes.func,
        scrollToTop: PropTypes.func,
        handleChangeSearch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.handleScroll = this.handleScroll.bind(this);
        this.toggleModalMenu = this.toggleModalMenu.bind(this);
        this.toggleAlert = this.toggleAlert.bind(this);
        this.toggleMobileList = this.toggleMobileList.bind(this);
        this.changeQuantityInCart = this.changeQuantityInCart.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.scrollToTop = this.scrollToTop.bind(this);
        this.handleChangeSearch = this.handleChangeSearch.bind(this);
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

    toggleAlert() {
        this.props.toggleModalAlert();
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

    scrollToTop() {
        this.props.scrollToTop();
    }

    handleChangeSearch(text) {
        this.props.handleChangeSearch(text);
    }

    render() {
        const {
            bucketIsOpen,
            alertIsOpen,
            alertText,
            itemsCart,
            navigationList,
            fixedMenu,
            catalogList,
            searchList,
            isMobile,
            mobileListIsOpen
        } = this.props;
        const hamburgerOpen = mobileListIsOpen ? 'open-list' : '';
        return (
            <Fragment>
                <div itemScope="" itemType="http://schema.org/Organization">
                    <span itemProp="name" content="ВКТ Сервис"/>
                    <span itemProp="url" content="http://vct1.com"/>
                    <span itemProp="logo" content="http://vct1.com/img/logo.png"/>
                    <div itemProp="address" itemScope="" itemType="http://schema.org/PostalAddress">
                        <span itemProp="addressLocality" content="Ukraine, Kropivnickij"/>
                        <span itemProp="streetAddress" content="Kievskaya 3"/>
                        <span itemProp="postalCode" content="25002"/>
                        <span itemProp="telephone" content="+30522320575"/>
                        <span itemProp="telephone" content="+3099701700"/>
                    </div>
                    <div itemProp="location" itemScope="" itemType="http://schema.org/Place">
                        <div itemProp="geo" itemScope="" itemType="http://schema.org/GeoCoordinates">
                            <meta itemProp="latitude" content="48.5186603"/>
                            <meta itemProp="longitude" content="32.2606395"/>
                        </div>
                    </div>
                </div>
                {
                    alertIsOpen &&
                    <ModalAlert
                        text={alertText}
                        onClose={this.toggleAlert}
                    />
                }
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
                            <HeadSearch
                                list={searchList}
                                handleChangeSearch={this.handleChangeSearch}
                            />
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
                {
                    fixedMenu &&
                    <div className="up-button">
                        <button onClick={this.scrollToTop}>{`>`}</button>
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
                                    <div className="col-md-2 col-md-push-4  col-sm-4 col-xs-12 head-bucket">
                                        <img
                                            src="https://vct1.com/img/bucket.gif.pagespeed.ce.bEDFj2GcQE.gif"
                                            alt="ВКТ"
                                            title="ВКТ"
                                            onClick={this.toggleModalMenu}
                                        />
                                        <span>{itemsCart.reduce((acc, item) => acc + item.quantity, 0)} шт.</span>
                                    </div>
                                    <div className="col-md-4 col-md-pull-5 col-sm-12 col-xs-12 head-search">
                                        <HeadSearch
                                            list={searchList}
                                            handleChangeSearch={this.handleChangeSearch}
                                        />
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
                                {
                                    isMobile &&
                                    <div className={`top-menu open-fixed-menu ${hamburgerOpen}`}
                                         onClick={this.toggleMobileList}>
                                        <div className={`head-catalog-hamburger`}>
                                            <div/>
                                            <div/>
                                            <div/>
                                        </div>
                                        <span>Каталог</span>
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



