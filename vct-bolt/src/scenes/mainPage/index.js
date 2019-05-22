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
        onGetData: PropTypes.func,
        onAddToCart: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
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

        this.setAndMutateData = this.setAndMutateData.bind(this);
        this.mutateSales = this.mutateSales.bind(this);
    }

    componentDidMount() {
        Promise.all([
            // this.props.onGetData('carouselOneItemData', 'carouselOneItemData'),
            // this.props.onGetData('mainPopularCategoriesItems', 'mainPopularCategoriesItems'),
            this.props.onGetData('http://api.vct1.com/topsales/', 'topSales')
            // this.props.onGetData('carouselManyItemsData', 'carouselManyItemsData'),
            // this.props.onGetData('mainPageTabsData', 'mainPageTabsData'),
        ]).then(
            () => {
                // this.loadCarouselData();
                // this.loadPopularItemsData();
                // this.loadCatalogItemsData();
                // this.loadCarouselItems();
                // this.loadPageTabItems();
                this.setAndMutateData();
            }
        );
    }


    setAndMutateData() {
        const { topSales } = this.props.data;
        this.setState({
            catalogItems: topSales && this.mutateSales(topSales)
        });
    }

    mutateSales(data) {
        return data.map(item => {
                return { ...item, url: `/${item.url.replace(/\//gi, '-').substring(1)}` };
            }
        );
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
        const { topSales } = this.props.data;
        const {
            carouselAdData,
            popularItemsData,
            catalogItems,
            carouselProductsData,
            tabItems
        } = this.state;
        return (
            <MainPageComponent
                carouselAdData={carouselAdData}
                popularItemsData={popularItemsData}
                catalogItems={topSales}
                carouselProductsData={carouselProductsData}
                tabItems={tabItems}
                onAddToCart={this.addToCart}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.Data
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddToCart: (item) => dispatch(addToCart(item)),
        onGetData: (url, name) => dispatch(getData(url, name))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
