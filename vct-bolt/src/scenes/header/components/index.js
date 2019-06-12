import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Navigation from './Navigation/index';
import HeadSearch from './HeadSearch/index';
import Catalog from './ItemsNavigation/index';
import ModalCart from './modalCart/index';

export default class HeaderComponent extends Component {

    static propTypes = {
        navigationList: PropTypes.array,
        itemsCart: PropTypes.array,
        catalogList: PropTypes.array,
        isMobile: PropTypes.bool,
        bucketIsOpen: PropTypes.bool,
        catalogListFixed: PropTypes.bool,
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

    toggleMobileList() {
        this.props.toggleMobileList();
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
            catalogListFixed,
            catalogList,
            isMobile,
            mobileListIsOpen
        } = this.props;
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
                        <div className="head-line-default" ref={elem => this.headLine = elem}>
                            <div className="container-fluid max-container-width">
                                <div className="row">
                                    <div className="col-md-3 head-logo">
                                        <NavLink to='/'>
                                            <img
                                                src="https://vct1.com/img/logo.png.pagespeed.ce.dMpD6YjZpM.png"
                                                alt="Логотип компании ВКТ Сервис"
                                                title="Интернет-магазин ВКТ Сервис"
                                            />
                                        </NavLink>
                                    </div>
                                    <div className="col-md-3 col-md-push-4 col-sm-7 col-xs-7 head-telephones">
                                        <p>Наши телефоны</p>
                                        <a href="tel:0522320575">0522 32 05 75</a>
                                        <a href="tel:0997017001">099 70 17 001</a>
                                    </div>
                                    <div className="col-md-2 col-md-push-4  col-sm-5 col-xs-5 head-bucket">
                                        <img
                                            src="https://vct1.com/img/bucket.gif.pagespeed.ce.bEDFj2GcQE.gif"
                                            alt="ВКТ"
                                            title="ВКТ"
                                            onClick={this.toggleModalMenu}
                                        />
                                        <span>{itemsCart.reduce((acc, item) => acc + item.quantity, 0)} шт.</span>
                                    </div>
                                    <div className="col-md-4 col-md-pull-5 col-sm-12 col-xs-12 head-search">
                                        <HeadSearch/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-shop">
                        <div className="container-fluid max-container-width">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="product-card-tabs">
                                        <div className="shop-navigation">
                                            <ul>
                                                {!isMobile &&
                                                (
                                                    <li key='catalog' className="head-catalog"><span>Каталог</span>
                                                        {(!catalogListFixed && catalogList !== null) && (
                                                            <Catalog list={catalogList}/>
                                                        )}
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </Fragment>
        );
    }
}



