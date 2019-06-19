import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import PropTypes from 'prop-types';
import axios from 'axios';

import { addToCart, removeFromCart, decreaseInCart, removeAllFromCart } from '../../data/Store/actions';
import { clearData, getData } from '../../data/Data/actions';

import HeaderComponent from './components/index';

import './styles.css';

class Header extends Component {

    static propTypes = {
        cart: PropTypes.array,
        data: PropTypes.object,
        search: PropTypes.object,
        cartOrderForm: PropTypes.object,
        onAddToCart: PropTypes.func,
        onDecreaseInCart: PropTypes.func,
        onRemoveFromCart: PropTypes.func,
        onRemoveAllFromCart: PropTypes.func,
        onClearData: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            bucketIsOpen: false,
            alertIsOpen: false,
            alertText: '',
            catalogList: null,
            searchList: null,
            fixedMenu: false,
            mobileListIsOpen: false,
            isMobile: window.innerWidth <= 992
        };

        this.toggleModalMenu = this.toggleModalMenu.bind(this);
        this.toggleModalAlert = this.toggleModalAlert.bind(this);
        this.toggleMobileList = this.toggleMobileList.bind(this);
        this.changeQuantityInCart = this.changeQuantityInCart.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.updateIsMobile = this.updateIsMobile.bind(this);
        this.findProduct = this.findProduct.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.scrollToTop = this.scrollToTop.bind(this);
        this.loadAPI = this.loadAPI.bind(this);
        this.handleChangeSearch = this.handleChangeSearch.bind(this);
    }

    componentDidMount() {
        if (!this.props.data) {
            this.loadAPI('headNavigation', 'http://api.vct1.com/menu/', 'headNavigation');
        }
        window.addEventListener('resize', this.updateIsMobile);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!nextProps.data) {
            return false;
        }
        if (nextProps.data.headNavigation && !nextState.catalogList) {
            this.setState(
                {
                    catalogList: nextProps.data.headNavigation
                }
            );
        }
        if (nextProps.search &&
            nextProps.search.search &&
            nextProps.search.search.length > 0 &&
            (!nextState.searchList || nextState.searchList[0].id !== nextProps.search.search[0].id)) {
            this.setState(
                {
                    searchList: nextProps.search.search
                }
            );
        }
        return true;
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateIsMobile);
    }

    loadAPI(id, url, name, query) {
        this.props.onGetApiData(
            id,
            url,
            name,
            query
        );
    }

    handleSubmit() {
        const query = {
            ...this.props.cartOrderForm,
            bucket: this.props.cart.map(item => `${item.article},${item.quantity}`).join(';')
        };
        let makeQuery = Object.entries(query).map(item => {
            return [item[0], encodeURIComponent(item[1])].join('=');
        }).join('&');
        axios.get(`http://api.vct1.com/order.php?${makeQuery}`)
            .then(res => {
                if (res.data.id) {
                    this.setState({
                        alertText: res.data.id
                    });
                    this.props.onRemoveAllFromCart();
                    this.toggleMobileList(false);
                }
                this.toggleModalAlert();
            });
    }

    handleChangeSearch(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            '\'': '&#039;'
        };
        const correctText = text.replace(/[&<>"']/g, function(m) {
            return map[m];
        });
        this.props.onClearData('search');
        this.loadAPI('search', 'http://api.vct1.com/catalog/', 'search', `?search=${correctText}&onpage=5`);
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

    toggleModalMenu() {
        this.setState({
            bucketIsOpen: !this.state.bucketIsOpen
        });
    }

    toggleModalAlert() {
        this.setState({
            alertIsOpen: !this.state.alertIsOpen
        });
    }

    toggleMobileList(state) {
        this.setState({
            mobileListIsOpen: state
        });
    }

    handleScroll(header) {
        if (this.state.searchList) {
            this.props.onClearData('search');
            this.setState({ searchList: null });
        }
        if (window.scrollY > header.clientHeight && !this.state.fixedMenu) {
            this.setState({ fixedMenu: true, mobileListIsOpen: false });
        }
        if (window.scrollY <= header.clientHeight && this.state.fixedMenu) {
            this.setState({ fixedMenu: false, mobileListIsOpen: false });
        }
    }

    updateIsMobile() {
        this.setState({
            isMobile: window.innerWidth <= 992
        });
    }

    scrollToTop() {
        window.scrollTo(0, 0);
    }

    render() {
        const list = [
            { text: 'Главная', url: '/' },
            { text: 'О нас', url: '/page-2' },
            { text: 'Новости', url: '/news' },
            { text: 'Магазин', url: '/page-4' },
            { text: 'Контакты', url: '/page-1' }
        ];

        const { cart } = this.props;
        const {
            catalogList,
            searchList,
            isMobile,
            bucketIsOpen,
            alertIsOpen,
            alertText,
            fixedMenu,
            mobileListIsOpen
        } = this.state;
        return (
            <HeaderComponent
                navigationList={list}
                itemsCart={cart}
                catalogList={catalogList}
                searchList={searchList}
                isMobile={isMobile}
                bucketIsOpen={bucketIsOpen}
                alertIsOpen={alertIsOpen}
                alertText={alertText}
                fixedMenu={fixedMenu}
                mobileListIsOpen={mobileListIsOpen}
                handleScroll={this.handleScroll}
                toggleModalMenu={this.toggleModalMenu}
                toggleModalAlert={this.toggleModalAlert}
                toggleMobileList={this.toggleMobileList}
                changeQuantityInCart={this.changeQuantityInCart}
                removeFromCart={this.removeFromCart}
                handleSubmit={this.handleSubmit}
                scrollToTop={this.scrollToTop}
                handleChangeSearch={this.handleChangeSearch}
            />
        );
    }

}

const mapStateToProps = (state) => {
    return {
        data: state.Data['headNavigation'],
        search: state.Data['search'],
        cart: state.Store.cart,
        cartOrderForm: getFormValues('submitOrder')(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddToCart: (item, value) => dispatch(addToCart(item, value)),
        onDecreaseInCart: (item, value) => dispatch(decreaseInCart(item, value)),
        onRemoveFromCart: (item) => dispatch(removeFromCart(item)),
        onRemoveAllFromCart: () => dispatch(removeAllFromCart()),
        onGetApiData: (id, url, name, params) => dispatch(getData(id, url, name, params)),
        onClearData: (id) => dispatch(clearData(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
