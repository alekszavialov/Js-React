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
            id: 'mainPage',
            carouselAdData: null,
            carouselProductsData: null,
            popularItemsData: null,
            catalogItems: null,
            tabItems: null
        };

        this.addToCart = this.addToCart.bind(this);

        this.loadCarouselData = this.loadCarouselData.bind(this);
        this.loadPopularItemsData = this.loadPopularItemsData.bind(this);
        this.loadCatalogItemsData = this.loadCatalogItemsData.bind(this);
        this.loadCarouselItems = this.loadCarouselItems.bind(this);
        this.loadPageTabItems = this.loadPageTabItems.bind(this);

        this.setStateSales = this.setStateSales.bind(this);
        this.setStateCarouselAd = this.setStateCarouselAd.bind(this);
    }

    componentWillMount() {
        const { id } = this.state;
        (this.props.data && this.props.data.topSales) || this.props.onGetData(id, 'http://api.vct1.com/topsales/', 'topSales');
        (this.props.data && this.props.data.carouselAdData) || this.props.onGetData('carouselAdData', 'http://api.vct1.com/slider/', 'carouselAdData');

        // fetch('http://api.vct1.com/slider/')
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data, 'slioder');
        //     });
        // fetch('http://api.vct1.com/related-products/150,151')
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data, 'related');
        //     });
        // fetch('http://api.vct1.com/parameters/?category=%D0%9F%D1%80%D0%B8%D0%BD%D1%82%D0%B5%D1%80')
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data, 'parameters');
        //     });
    }

    componentDidMount() {
        const topSales = this.props.data && this.props.data.topSales;
        const carouselAdData = this.props.data && this.props.data.carouselAdData;
        if (topSales && !this.state.catalogItems) {
            this.setStateSales(topSales);
        }
        if (carouselAdData && !this.state.carouselAdData) {
            this.setStateCarouselAd(carouselAdData);
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.data.topSales && !nextState.catalogItems) {
            this.setStateSales(nextProps.data.topSales);
        }
        if (nextProps.data.carouselAdData && !nextState.carouselAdData) {
            this.setStateCarouselAd(nextProps.data.carouselAdData);
        }
    }

    setStateSales(data) {
        this.setState({
            catalogItems: data.map(item => {
                return { ...item, url: `/${item.url.replace(/\//gi, '-').substring(1)}` };
            })
        });
    }

    setStateCarouselAd(data) {
        console.log(data, 'caroused');
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
        console.log(stateData);
        this.setState({
            carouselAdData: stateData
        });
    }

    loadCarouselData() {
        // fetchApi('../../fakeAPI/carouselOneItemData.json')
        //     .then(result => this.setState({
        //             carouselData: {
        //                 ...result, items: result.items.map(item =>
        //                     <CarouselBigItem item={item} key={Math.random()}/>
        //                 )
        //             }
        //         }
        //     ));
        // const result = require('../../fakeAPI/carouselOneItemData.json');
        this.setState(
            {
                carouselAdData: this.props.data.carouselOneItemData
            }
        );
    };

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

    loadCatalogItemsData() {
        // fetchApi('../../fakeAPI/catalogItems.json')
        //     .then(result => this.setState({
        //             catalogItems: result
        //         }
        //     ));

        // const result = require('../../fakeAPI/catalogItems.json');
        this.setState(
            {
                catalogItems: this.props.data.catalogItems
            }
        );

        // this.props.onGetData('catalogItems', 'catalogItems');
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
        console.log(this.props.data);
        // const { topSales } = this.props.data;
        const {
            carouselAdData,
            popularItemsData,
            catalogItems,
            carouselProductsData,
            tabItems
        } = this.state;
        return (
            catalogItems &&
            <MainPageComponent
                carouselAdData={carouselAdData}
                popularItemsData={popularItemsData}
                catalogItems={catalogItems}
                carouselProductsData={carouselProductsData}
                tabItems={tabItems}
                onAddToCart={this.addToCart}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: { ...state.Data['mainPage'], ...state.Data['carouselAdData'] }
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddToCart: (item) => dispatch(addToCart(item)),
        onGetData: (id, url, name) => dispatch(getData(id, url, name))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
