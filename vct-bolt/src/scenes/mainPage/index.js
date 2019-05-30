import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MainPageComponent from './components';

import { addToCart } from '../../data/Store/actions';
import { getData } from '../../data/Data/actions';

// import fetchApi from '../../modules/fetch-api';

import './styles.css';
import { getFormValues } from 'redux-form';

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
                adSliderItems: 'mainPageAdSlider'
            },
            productItems: null,
            adSliderItems: null,

            carouselProductsData: null,
            popularItemsData: null,
            catalogItems: null,
            tabItems: null
        };



        this.loadPopularItemsData = this.loadPopularItemsData.bind(this);
        this.loadCarouselItems = this.loadCarouselItems.bind(this);
        this.loadPageTabItems = this.loadPageTabItems.bind(this);

        this.setStateProductItems = this.setStateProductItems.bind(this);
        this.setStateCarouselAd = this.setStateCarouselAd.bind(this);
        this.loadDataAPI = this.loadDataAPI.bind(this);

        this.addToCart = this.addToCart.bind(this);
    }

    componentWillMount() {
        this.loadDataAPI();
    }

    componentDidMount() {
        const { data } = this.props;
        if (!data) {
            return;
        }
        const { productItemsData, adSliderItemsData } = data;
        const { productItems, adSliderItems } = this.state;
        if (productItemsData && !productItems) {
            this.setStateProductItems(productItemsData);
        }
        if (adSliderItemsData && !adSliderItems) {
            this.setStateCarouselAd(adSliderItemsData);
        }
    }

    componentWillUpdate(nextProps, nextState) {
        const { productItemsData, adSliderItemsData } = nextProps.data;
        const { productItems, adSliderItems } = nextState;
        if (productItemsData && !productItems) {
            this.setStateProductItems(productItemsData);
        }
        if (adSliderItemsData && !adSliderItems) {
            this.setStateCarouselAd(adSliderItemsData);
        }
    }

    setStateProductItems(data) {
        this.setState({
            productItems: data.map(item => {
                return { ...item, url: `/${item.url.replace(/\//gi, '-').substring(1)}` };
            })
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
            'items':
                data.map(item => {
                    return {
                        'url': item.url.match(/product/) ? `/product-${item.url.match(/\d+/)[0]}` : `/catalog-${item.url.match(/([^/]*)\/$/)[1]}`,
                        'src': item.img,
                        'text': item.url.match(/([^/]*)\/$/)[1]
                    };
                })

        };
        this.setState({
            adSliderItems: stateData
        });
    }

    loadDataAPI() {
        const { productItems, adSliderItems } = this.state.dataNames;
        (this.props.data && this.props.data.productItemsData) || this.props.onGetData(productItems, 'http://api.vct1.com/topsales/', 'productItemsData');
        (this.props.data && this.props.data.adSliderItemsData) || this.props.onGetData(adSliderItems, 'http://api.vct1.com/slider/', 'adSliderItemsData');
    }


    loadPopularItemsData() {
        // fetchApi('../../fakeAPI/mainPopularCategoriesItems.json')
        //     .then(result => this.setState({
        //             popularItemsData: result
        //         }
        //     ));

        // const result = require('../../fakeAPI/mainPopularCategoriesItems.json');
        this.setState(
            {
                popularItemsData: this.props.data.mainPopularCategoriesItems
            }
        );

        // this.props.onGetData('mainPopularCategoriesItems', 'mainPopularCategoriesItems');
    };
    
    loadCarouselItems() {
        // fetchApi('../../fakeAPI/carouselManyItemsData.json')
        //     .then(result => this.setState({
        //         carouselItemsData: {
        //             ...result,
        //             items: result.items.map(item =>
        //                 <CarouselSmallItem item={item} onAddToCart={this.addToCart} key={Math.random()}/>
        //             )
        //         }
        //     }));

        // const result = require('../../fakeAPI/carouselManyItemsData.json');
        this.setState(
            {
                carouselProductsData: {
                    ...this.props.data.carouselManyItemsData,
                    onAddToCart: this.addToCart
                }
            }
        );

        // this.props.onGetData('carouselManyItemsData', 'carouselManyItemsData');
    };

    loadPageTabItems() {
        // fetchApi('../../fakeAPI/mainPageTabsData.json')
        //     .then(result => this.setState({
        //             tabItems: {
        //                 ...result, items: result.items.map(item =>
        //                     (item.map(item =>
        //                         <div className="tabs-item" key={Math.random()}>
        //                             <div className="tabs-item-image">
        //                                 <NavLink to={item.href}>
        //                                     <img src={item.src} alt=""/>
        //                                 </NavLink>
        //                             </div>
        //                             <div className="tabs-item-content">
        //                                 <h3>
        //                                     <NavLink to={item.href}>
        //                                         {item.name}
        //                                     </NavLink>
        //                                 </h3>
        //                                 <span>{item.date}</span>
        //                                 <p>{item.text}</p>
        //                             </div>
        //                         </div>
        //                     ))
        //                 )
        //             }
        //         }
        //     ));

        // const result = require('../../fakeAPI/mainPageTabsData.json');
        console.log(this.props.data.mainPageTabsData, 'asd');
        this.setState({
                tabItems: {
                    ...this.props.data.mainPageTabsData, items: this.props.data.mainPageTabsData.items.map(item =>
                        (item.map(item =>
                            <div className="tabs-item" key={Math.random()}>
                                <div className="tabs-item-image">
                                    <NavLink to={item.href}>
                                        <img src={item.src} alt=""/>
                                    </NavLink>
                                </div>
                                <div className="tabs-item-content">
                                    <h3>
                                        <NavLink to={item.href}>
                                            {item.name}
                                        </NavLink>
                                    </h3>
                                    <span>{item.date}</span>
                                    <p>{item.text}</p>
                                </div>
                            </div>
                        ))
                    )
                }
            }
        );
        // this.props.onGetData('mainPageTabsData', 'mainPageTabsData');
    };

    addToCart(item) {
        this.props.onAddToCart(item);
    }

    render() {
        const {
            productItems,
            adSliderItems
        } = this.state;
        return (
            productItems &&
            <MainPageComponent
                catalogItems={productItems}
                carouselAdData={adSliderItems}


                onAddToCart={this.addToCart}
            />
        );
    }
}

//
// popularItemsData={popularItemsData}
// carouselProductsData={carouselProductsData}
// tabItems={tabItems}

const mapStateToProps = (state) => {
    return {
        data: {
            ...state.Data['mainPageProductItems'],
            ...state.Data['mainPageAdSlider']
        }
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddToCart: (item) => dispatch(addToCart(item)),
        onGetData: (id, url, name) => dispatch(getData(id, url, name))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
