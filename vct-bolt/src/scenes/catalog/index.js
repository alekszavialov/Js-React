import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import CatalogComponent from './components';

import { addToCart } from '../../data/Store/actions';
// import fetchApi from '../../modules/fetch-api'

import './styles.css';

class Catalog extends Component {
    static propTypes = {
        onAddToCart: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            catalogItems: null,
            carouselAdData: null,
            productOptions: null,
            breadCrumbs: null,
            shopTags: null,
            tabsData: null,
            carouselProductsData: null
        };

        this.loadProductList = this.loadProductList.bind(this);
        this.loadProductOptions = this.loadProductOptions.bind(this);
        this.loadBreadCrumbs = this.loadBreadCrumbs.bind(this);
        this.loadCarouselData = this.loadCarouselData.bind(this);
        this.loadShopTags = this.loadShopTags.bind(this);
        this.loadTabsData = this.loadTabsData.bind(this);
        this.loadCarouselItems = this.loadCarouselItems.bind(this);
        this.loadMoreProducts = this.loadMoreProducts.bind(this);
        this.addToCart = this.addToCart.bind(this);

        this.changeFormField = this.changeFormField.bind(this);
    }

    componentWillMount() {
        this.loadProductList();
        this.loadProductOptions();
        this.loadBreadCrumbs();
        this.loadCarouselData();
        this.loadShopTags();
        this.loadTabsData();
        this.loadCarouselItems();
    }

    changeFormField(data) {
        if (!data.remove) {
            for (let key in data) {
                this.props.change(key, data[key]);
            }
        } else {
            this.props.change(data.remove, '');
        }

    };

    loadMoreProducts() {
        this.setState({
            catalogItems:
                [
                    ...this.state.catalogItems,
                    {
                        src: 'https://vct1.com/img/sub_menu/sub_menu_proector.jpg.pagespeed.ce.gqCHhkEpSA.jpg',
                        href: '/product',
                        name: 'Чип для картриджа Pantu21421442142142 fsdafdsafsda m PC-210E/211EV (безлимитный) (CHIP-PC-211EV)',
                        description: 'M6500/M6607/P220safdfdsa sadfsadf0/P2207/ P2500/P2507',
                        price: 124421
                    },
                    {
                        src: 'https://vct1.com/img/sub_menu/sub_menu_proector.jpg.pagespeed.ce.gqCHhkEpSA.jpg',
                        href: '/product',
                        name: 'Чип для картриджа Pantum PC-210E/211EV (безлимитный) (CHIP-PC-211EV)',
                        description: 'M6500/M6607/P2200/P2207/ P2500/P2507',
                        price: 3212
                    }
                ]
        });
    }

    loadProductList() {
        // axios.get(`../../fakeAPI/catalogProductItemsData.json`)
        //     .then(res => {
        //         console.log(res, 'ads');
        //     })
        // fetchApi('../../fakeAPI/catalogProductItemsData.json')
        //     .then(result => this.setState({
        //         catalogItems: result
        //     }
        //     ));

        const result = require('../../fakeAPI/catalogProductItemsData.json');
        this.setState(
            {
                catalogItems: result
            }
        );
    };

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

        const result = require('../../fakeAPI/carouselOneItemData.json');
        this.setState(
            {
                carouselAdData: result
            }
        );
    };

    loadProductOptions() {
        // fetchApi('../../fakeAPI/productOptionsData.json')
        //     .then(result => this.setState({
        //             productOptions: result
        //         }
        //     ));

        const result = require('../../fakeAPI/productOptionsData.json');
        this.setState(
            {
                productOptions: result
            }, () => {
                this.changeFormField({ ...result.sliderValues });
            }
        );
    };

    loadBreadCrumbs() {
        // fetchApi('../../fakeAPI/catalogBreadCrumbs.json')
        //     .then(result => this.setState({
        //             breadCrumbs: result
        //         }
        //     ));

        const result = require('../../fakeAPI/catalogBreadCrumbs.json');
        this.setState(
            {
                breadCrumbs: result
            }
        );
    };

    loadShopTags() {
        // fetchApi('../../fakeAPI/catalogShopTags.json')
        //     .then(result => this.setState({
        //             shopTags: result
        //         }
        //     ));

        const result = require('../../fakeAPI/catalogShopTags.json');
        this.setState(
            {
                shopTags: result
            }
        );
    };

    loadTabsData() {
        // fetchApi('../../fakeAPI/catalogPageTabsData.json')
        //     .then(result => this.setState({
        //         tabsData: {
        //             ...result, items: result.items.map(item =>
        //                 (item.map(item =>
        //                         <div className="tabs-item" key={Math.random()}
        //                              dangerouslySetInnerHTML={{ __html: item.content }}>
        //                         </div>
        //                     )
        //                 )
        //             )
        //         }
        //     }));

        const result = require('../../fakeAPI/catalogPageTabsData.json');
        this.setState(
            {
                tabsData:
                    {
                        ...result, items: result.items.map
                        (item =>
                            (item.map
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

        const result = require('../../fakeAPI/carouselManyItemsData.json');
        this.setState(
            {
                carouselProductsData:
                    {
                        ...result,
                        onAddToCart: this.addToCart
                    }
            }
        );
    };

    addToCart(item) {
        this.props.onAddToCart(item);
    }

    render() {
        const {
            productOptions,
            breadCrumbs,
            carouselAdData,
            shopTags,
            catalogItems,
            tabsData,
            carouselProductsData
        } = this.state;
        console.log(productOptions, 'render options');
        return (
            <CatalogComponent
                productOptions={productOptions}
                breadCrumbs={breadCrumbs}
                carouselAdData={carouselAdData}
                shopTags={shopTags}
                catalogItems={catalogItems}
                tabsData={tabsData}
                carouselProductsData={carouselProductsData}
                onAddToCart={this.addToCart}
                onLoadMoreProducts={this.loadMoreProducts}

                changeFormField={this.changeFormField}
            />
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddToCart: (item) => dispatch(addToCart(item))
    };
};

// export default connect(null, mapDispatchToProps)(Catalog);
export default reduxForm({
    form: 'sortForm'
})(
    connect(
        null,
        mapDispatchToProps
    )(Catalog)
);