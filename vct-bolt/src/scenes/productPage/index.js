import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProductPageComponent from './components';

import { addToCart } from '../../data/Store/actions';
// import fetchApi from '../../modules/fetch-api';

import './styles.css';
import { getData } from '../../data/Data/actions';

class ProductPage extends Component {

    static propTypes = {
        onAddToCart: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            productData: null,
            tabsItems: null,
            breadCrumbs: null,
            carouselProductsData: null
        };

        this.loadProductData = this.loadProductData.bind(this);
        this.loadBreadCrumbs = this.loadBreadCrumbs.bind(this);
        this.loadPageTabs = this.loadPageTabs.bind(this);
        this.loadCarouselItems = this.loadCarouselItems.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.url.match(/\d+/)[0];
        this.props.onGetData(`http://api.vct1.com/product/${id}`, 'productData');
        this.props.onGetData(`http://api.vct1.com/specifications/${id}`, 'specifications');
        this.props.onGetData(`http://api.vct1.com/comments/${id}`, 'comments');
        Promise.all([

            // !this.props.productPageData && this.props.onGetData('productPageData', 'productPageData'),
            // !this.props.productPageBreadCrumbs && this.props.onGetData('productPageBreadCrumbs', 'productPageBreadCrumbs'),
            // !this.props.productPageTabsData && this.props.onGetData('productPageTabsData', 'productPageTabsData'),
            // !this.props.carouselManyItemsData && this.props.onGetData('carouselManyItemsData', 'carouselManyItemsData'),
        ]).then(
            () => {
                // this.loadProductData();
                // this.loadBreadCrumbs();
                // this.loadPageTabs();
                // this.loadCarouselItems();
            }
        );
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log(nextProps.data.productData);
    //     if (nextProps.data.productData && !this.state.breadCrumbs) {
    //         console.log('load bread');
    //         this.loadBreadCrumbs();
    //     }
    // }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.data.productData && !nextState.breadCrumbs) {
            this.loadBreadCrumbs(nextProps.data.productData[0]);
        }
    }

    loadProductData() {
        // fetchApi('../../fakeAPI/productPageData.json')
        //     .then(result => this.setState({
        //             productData: result
        //         }
        //     ));

        this.setState(
            {
                productData: this.props.data.productPageData
            }
        );
    };

    loadPageTabs() {
        // fetchApi('../../fakeAPI/productPageTabsData.json')
        //   .then(result => this.setState({
        //       tabsItems: {
        //         ...result, items: result.items.map(item =>
        //           (item.map(item =>
        //             <div className="tabs-item" key={Math.random()} dangerouslySetInnerHTML={{__html: item.content}}>
        //             </div>
        //           ))
        //         )
        //       }
        //     }
        //   ));

        // const result = require('../../fakeAPI/productPageTabsData.json');
        this.setState(
            {
                tabsItems: {
                    ...this.props.data.productPageTabsData, items: this.props.data.productPageTabsData.items.map
                    (item =>
                        (
                            item.map
                            (item =>
                                <div className="tabs-item" key={Math.random()}
                                     dangerouslySetInnerHTML={{ __html: item.content }}>
                                </div>
                            )
                        )
                    )
                }
            }
        );
    };

    loadBreadCrumbs(data) {
        console.log('load bread crumbs!@');
        const result = [
            { 'href': '/', 'name': 'Главная' },
            {
                'href': `/catalog-${data.brand.toLowerCase()}`,
                'name': data.brand
            },
            { 'href': '', 'name': data.title }
        ];
        this.setState(
            {
                breadCrumbs: result
            }
        );
    };

    loadCarouselItems() {
        // fetchApi('../../fakeAPI/carouselManyItemsData.json')
        //     .then(result => this.setState({
        //         carouselData: {
        //             ...result,
        //             items: result.items.map(item =>
        //                 <CarouselSmallItem key={Math.random()} item={item} onAddToCart={this.addToCart}/>
        //             )
        //         }
        //     }));

        // const result = require('../../fakeAPI/carouselManyItemsData.json');
        this.setState(
            {
                carouselProductsData:
                    {
                        ...this.props.data.carouselManyItemsData,
                        onAddToCart: this.addToCart
                    }
            }
        );
    };

    addToCart(item) {
        this.props.onAddToCart(item);
    }

    render() {
        console.log(this.props.data);
        const { productData, specifications } = this.props.data;
        const {
            breadCrumbs,
            carouselProductsData,
            tabsItems
        } = this.state;
        if (!productData) {
            return false;
        }
        return (
            <ProductPageComponent
                breadCrumbs={breadCrumbs}
                productData={productData[0]}

                carouselProductsData={carouselProductsData}
                tabsItems={tabsItems}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);