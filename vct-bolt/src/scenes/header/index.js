import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import PropTypes from 'prop-types';

import { addToCart, removeFromCart, decreaseInCart } from '../../data/Store/actions';
import { getData } from '../../data/Data/actions';

import HeaderComponent from './components/index';

import './styles.css';

class Header extends Component {

    static propTypes = {
        cart: PropTypes.array,
        data: PropTypes.object,
        cartOrderForm: PropTypes.object,
        onAddToCart: PropTypes.func,
        onDecreaseInCart: PropTypes.func,
        onRemoveFromCart: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            bucketIsOpen: false,
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
        // this.loadCatalogList = this.loadCatalogList.bind(this);
        this.findProduct = this.findProduct.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        // this.loadCatalogList();
        (this.props.data && this.props.data.headNavigation) ||
        this.props.onGetApiData('headNavigation', 'http://api.vct1.com/menu/', 'headNavigation');
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateIsMobile);
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.data.headNavigation && !nextState.catalogList) {
            this.setState(
                {
                    catalogList: nextProps.data.headNavigation
                }
            );
        }
    }


    componentWillUnmount() {
        window.removeEventListener('resize', this.updateIsMobile);
    }

    handleSubmit() {
        console.log(JSON.stringify(this.props.cartOrderForm));
    }

    findProduct(article) {
        const { cart } = this.props;
        return cart.filter(cartItem => cartItem.article === article)[0];
    };

    changeQuantityInCart(item) {
        const product = this.findProduct(item.article);
        product.quantity > item.quantity ?
            this.props.onDecreaseInCart(product, item.quantity) :
            this.props.onAddToCart(product, item.quantity);
    }

    removeFromCart(item) {
        const product = this.findProduct(item.article);
        product && this.props.onRemoveFromCart(product);
    }

    // loadCatalogList() {
    //     // fetchApi('/fakeAPI/headerItemNavigationItems.json')
    //     //     .then(result => this.setState({
    //     //             catalogList: result
    //     //         }
    //     //     ));
    //
    //     this.setState({
    //         catalogList: require('../../fakeAPI/headerItemNavigationItems.json')
    //     }
    //     );
    // };

    toggleModalMenu() {
        this.setState({
            bucketIsOpen: !this.state.bucketIsOpen
        });
    }

    toggleMobileList() {
        this.setState({
            mobileListIsOpen: !this.state.mobileListIsOpen
        });
    }

    handleScroll(header, headLine) {
        if (window.scrollY > header.clientHeight && headLine.className.includes('head-line-default')) {
            new Promise((resolve) => {
                headLine.classList.remove('fade-visible');
                headLine.classList.add('fade-hidden');
                setTimeout(() => {
                    resolve();
                }, 200);
            })
                .then(() => {
                    this.setState({ catalogListFixed: true, mobileListIsOpen: false });
                    header.style.height = `${header.clientHeight  }px`;
                    headLine.classList.add('head-line-fixed');
                    headLine.classList.remove('head-line-default');
                }).then(() => {
                headLine.classList.remove('fade-hidden');
                headLine.classList.add('fade-visible');
            });
        } else if (window.scrollY <= header.clientHeight &&
            headLine.className.includes('head-line-fixed')) {
            new Promise((resolve) => {
                headLine.classList.remove('fade-visible');
                headLine.classList.add('fade-hidden');
                setTimeout(() => {
                    resolve();
                }, 200);
            })
                .then(() => {
                    headLine.classList.add('head-line-default');
                    headLine.classList.remove('head-line-fixed');
                    header.style.height = 'auto';
                    this.setState({ catalogListFixed: false, mobileListIsOpen: false });
                }).then(() => {
                headLine.classList.remove('fade-hidden');
                headLine.classList.add('fade-visible');
            });
        }
    }

    updateIsMobile() {
        this.setState({
            isMobile: window.innerWidth <= 992
        });
    }

    render() {
        const list = [
            { text: 'Главная', url: '/' },
            { text: 'О нас', url: '/' },
            { text: 'Новости', url: '/' },
            { text: 'Магазин', url: '/' },
            {
                text: 'Сервисный центр', url: {
                    pathname: '/catalog'
                }
            },
            {
                text: 'Контакты', url: {
                    pathname: '/product-30632-komplekt_zapravki_pantum_(tn-210)',
                    param1: 'Par1'
                }
            },
            {
                text: 'Вход', url: {
                    pathname: '/product-38220-skaniruyush\'ii_modul_epson_l605_(1704031)',
                    param1: 'Par1'
                }
            }
        ];

        const { cart } = this.props;
        const { catalogList } = this.state;
        const { isMobile } = this.state;
        const { bucketIsOpen } = this.state;
        const { catalogListFixed } = this.state;
        const { mobileListIsOpen } = this.state;
        console.log(cart, 'cart!!!!');
        return (
            <HeaderComponent
                navigationList={list}
                itemsCart={cart}
                catalogList={catalogList}
                isMobile={isMobile}
                bucketIsOpen={bucketIsOpen}
                catalogListFixed={catalogListFixed}
                mobileListIsOpen={mobileListIsOpen}
                handleScroll={this.handleScroll}
                toggleModalMenu={this.toggleModalMenu}
                toggleMobileList={this.toggleMobileList}
                changeQuantityInCart={this.changeQuantityInCart}
                removeFromCart={this.removeFromCart}
                handleSubmit={this.handleSubmit}
            />
        );
    }

}

const mapStateToProps = (state) => {
    return {
        data: state.Data['headNavigation'],
        cart: state.Store.cart,
        cartOrderForm: getFormValues('submitOrder')(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddToCart: (item, value) => dispatch(addToCart(item, value)),
        onDecreaseInCart: (item, value) => dispatch(decreaseInCart(item, value)),
        onRemoveFromCart: (item) => dispatch(removeFromCart(item)),
        onGetApiData: (id, url, name) => dispatch(getData(id, url, name))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
