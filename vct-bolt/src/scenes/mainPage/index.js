import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MainPageComponent from './components';

import { addToCart } from '../../data/Store/actions';
import { getData } from '../../data/Data/actions';

import './styles.css';

class MainPage extends Component {

    static propTypes = {
        data: PropTypes.object,
        getData: PropTypes.func,
        onGetData: PropTypes.func,
        onAddToCart: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            dataNames: {
                productItems: 'mainPageProductItems',
                adSliderItems: 'mainPageAdSlider',
                newProducts: 'newProducts'
            },
            productItems: null,
            adSliderItems: null,
            newProductsItems: null,

            carouselProductsData: null,
            popularItemsData: null,
            catalogItems: null,
            tabItems: null
        };

        this.setStateProductItems = this.setStateProductItems.bind(this);
        this.setStateCarouselAd = this.setStateCarouselAd.bind(this);
        this.setStateCarouselProducts = this.setStateCarouselProducts.bind(this);
        this.loadDataAPI = this.loadDataAPI.bind(this);

        this.addToCart = this.addToCart.bind(this);
    }

    componentDidMount() {
        const { data } = this.props;
        if (!data) {
            this.loadDataAPI();
            return;
        }
        const { productItems, adSliderItems } = this.state;
        if (data[this.state.dataNames.productItems] && !productItems) {
            this.setStateProductItems(data[this.state.dataNames.productItems]);
        }
        if (data[this.state.dataNames.adSliderItems] && !adSliderItems) {
            this.setStateCarouselAd(data[this.state.dataNames.adSliderItems]);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!nextProps.data) {
            return false;
        }
        const { productItems, adSliderItems, newProductsItems } = nextState;
        if (nextProps.data[this.state.dataNames.productItems] && !productItems) {
            this.setStateProductItems(nextProps.data[this.state.dataNames.productItems]);
        }
        if (nextProps.data[this.state.dataNames.adSliderItems] && !adSliderItems) {
            this.setStateCarouselAd(nextProps.data[this.state.dataNames.adSliderItems]);
        }
        if (nextProps.data[this.state.dataNames.newProducts] && !newProductsItems) {
            this.setStateCarouselProducts(nextProps.data[this.state.dataNames.newProducts]);
        }
        return true;
    }

    setStateProductItems(data) {
        this.setState({
            productItems: data
        });
    }

    setStateCarouselAd(data) {
        const stateData = {
            'params': {
                'dots': true,
                'arrows': false,
                'infinite': true,
                'autoplay': true,
                'autoplaySpeed': 6000,
                'speed': 500,
                'slidesToShow': 1,
                'slidesToScroll': 1,
                'pauseOnHover': true
            },
            'items': data

        };
        this.setState({
            adSliderItems: stateData
        });
    }

    setStateCarouselProducts(data) {
        this.setState({
            newProductsItems: {
                'params': {
                    'dots': false,
                    'infinite': true,
                    'speed': 500,
                    'autoplay': true,
                    'autoplaySpeed': 6000,
                    'slidesToShow': 6,
                    'slidesToScroll': 1,
                    'pauseOnHover': true,
                    'responsive': [
                        {
                            'breakpoint': 1024,
                            'settings': {
                                'slidesToShow': 4
                            }
                        },
                        {
                            'breakpoint': 760,
                            'settings': {
                                'slidesToShow': 3
                            }
                        },
                        {
                            'breakpoint': 640,
                            'settings': {
                                'slidesToShow': 2
                            }
                        },
                        {
                            'breakpoint': 480,
                            'settings': {
                                'slidesToShow': 1
                            }
                        }
                    ]
                },
                'items': data,
                onAddToCart: this.addToCart
            }
        });
    }

    loadDataAPI() {
        const { productItems, adSliderItems, newProducts } = this.state.dataNames;
        this.props.onGetData('mainPage', 'http://api.vct1.com/topsales/', productItems);
        this.props.onGetData('mainPage', 'http://api.vct1.com/slider/', adSliderItems);
        this.props.onGetData('mainPage', 'http://api.vct1.com/catalog/', newProducts, '?order=id%20desc&onpage=10');
    }

    addToCart(item) {
        this.props.onAddToCart(item);
    }

    render() {
        const {
            productItems,
            adSliderItems,
            newProductsItems
        } = this.state;
        if (!productItems){
            return(
                <div className="loader"/>
            );
        }
        return (
            productItems &&
            <MainPageComponent
                catalogItems={productItems}
                carouselAdData={adSliderItems}
                newProductsItems={newProductsItems}
                onAddToCart={this.addToCart}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.Data.mainPage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddToCart: (item) => dispatch(addToCart(item)),
        onGetData: (id, url, name) => dispatch(getData(id, url, name))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
