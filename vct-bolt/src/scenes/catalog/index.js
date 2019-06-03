import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import CatalogComponent from './components';

import { addToCart  } from '../../data/Store/actions';
import { getData } from '../../data/Data/actions';

import './styles.css';

class Catalog extends Component {
    static propTypes = {
        onAddToCart: PropTypes.func,
        data: PropTypes.object,
        onGetData: PropTypes.func
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

        this.loadDataAPI = this.loadDataAPI.bind(this);
        this.changeFormField = this.changeFormField.bind(this);
        this.loadCatalogItems = this.loadCatalogItems.bind(this);
        this.loadRecentlyProducts = this.loadRecentlyProducts.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        const category = this.props.match.params.categoryName.substring(1);
        const brand = this.props.match.params.brandName;
        const id = brand ? category + brand : category;
        let params = {
            'category': category
        };
        if (brand) {
            params = {
                ...params,
                brand
            };
        }
        this.loadDataAPI(id, params);
        // if (!this.props.data || !this.props.data[id]) {
        //     let params = {
        //         'category': category
        //     };
        //     if (brand) {
        //         params = {
        //             ...params,
        //             brand
        //         };
        //     }
        //     this.props.onGetData(
        //         id,
        //         'http://api.vct1.com/catalog/',
        //         'catalogData',
        //         params
        //     );
        //     console.log('ye[');
        // } else {
        //     console.log(brand);
        // }

        // const id = this.props.match.url.match(/\d+/)[0];
        // this.loadDataAPI(id);
        // if (this.props.data[id]) {
        //     const productData = this.props.data[id].productData[0];
        //     const { comments, specifications } = this.props.data[id];
        //     if (productData && specifications && comments) {
        //         document.title = productData.title;
        //         this.fillPageState(productData, specifications, comments);
        //     }
        // }
    }

    componentWillUpdate(nextProps, nextState) {
        // if (nextProps.match.url !== this.props.match.url) {
        //     window.scrollTo(0, 0);
        //     this.setState({
        //         productData: null,
        //         breadCrumbs: null,
        //         relatedCarouseData: null,
        //         recentlyCarouseData: null,
        //         specifications: null,
        //         comments: null
        //     });
        //     this.loadDataAPI(nextProps.match.url.match(/\d+/)[0]);
        //     return;
        // }

        const category = this.props.match.params.categoryName.substring(1);
        // const brand = this.props.match.params.brandName;
        // const id = brand ? category + brand : category;
        // console.log(nextProps);
        // console.log(id);
        const data = nextProps.data.catalogData;
        if (!data) {
            return;
        }
        console.log(data, 'data!!!');
        if (!nextState.catalogItems) {
            document.title = category;
            this.loadCatalogItems(data);
        }
        console.log(nextProps.recently, 'ASAFSASFSFAFFS1212312');
        if ((nextProps.recently.length > 0 && !nextState.recentlyCarouseData) ||
            (nextProps.recently.length !== this.props.recently.length)) {
            this.loadRecentlyProducts(nextProps.recently);
        }


        // const productData = data.productData && data.productData[0];
        // if (!productData) {
        //     return;
        // }
        // if (!nextState.productData) {
        //     document.title = productData.title;
        //     this.loadProductData(productData);
        // }
        // if (productData['related-products'] && !nextState.relatedCarouseData) {
        //     const related = productData['related-products'].split(',').filter(item => item);
        //     const loaded = related.map(
        //         item => {
        //             return nextProps.data[item];
        //         }
        //     ).filter(item => item);
        //     if (loaded.length === related.length) {
        //         this.loadRelatedProducts(loaded);
        //     }
        // }
        //
        // if (nextProps.recently.length !== this.props.recently.length) {
        //     this.loadRecentlyProducts(nextProps.recently);
        // }
        // if (!nextState.breadCrumbs) {
        //     this.loadBreadCrumbs(productData);
        // }
        //
        // const { comments } = data;
        // if (!nextState.comments && comments) {
        //     this.loadComments(productData, comments);
        // }
        // const { specifications } = data;
        // if (!nextState.specifications && specifications) {
        //     this.loadSpecifications(productData, specifications);
        // }
    }

    loadDataAPI(id, params) {
        if (!this.props.data || !this.props.data.productData) {
            this.props.onGetData(
                id,
                'http://api.vct1.com/catalog/',
                'catalogData',
                params
            );
            console.log('load');
        }

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

    loadCatalogItems(data) {
        const category = this.props.match.params.categoryName.substring(1);
        const brand = this.props.match.params.brandName;
        const stateBreadCrumbs = brand ? [
                { 'href': '/', 'name': 'Главная' },
                {
                    'href': `/catalog-${category.toLowerCase()}`,
                    'name': category
                },
                {
                    'href': ``,
                    'name': brand
                }] :
            [
                { 'href': '/', 'name': 'Главная' },
                {
                    'href': ``,
                    'name': category
                }
            ]

        ;
        this.setState(
            {
                catalogItems: data,
                breadCrumbs: stateBreadCrumbs
            }
        );
    };

    loadRecentlyProducts(data) {
        this.setState({
            recentlyCarouseData: {
                'params': {
                    'dots': false,
                    'infinite': true,
                    'speed': 500,
                    'autoplay': true,
                    'autoplaySpeed': 6000,
                    'slidesToShow': data.length < 6 ? data.length : 6,
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
                            'breakpoint': 992,
                            'settings': {
                                'slidesToShow': 2
                            }
                        }
                    ]
                },
                'items': data,
                onAddToCart: this.addToCart
            }
        });
    }


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

        // const result = require('../../fakeAPI/catalogProductItemsData.json');
        this.setState(
            {
                catalogItems: this.props.data.catalogItems
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

        // const result = require('../../fakeAPI/carouselOneItemData.json');
        this.setState(
            {
                carouselAdData: this.props.data.carouselOneItemData
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
        // this.setState(
        //     {
        //         productOptions: this.props.data.productOptionsData
        //     }, () => {
        //         this.changeFormField({ ...this.props.data.productOptionsData.sliderValues });
        //     }
        // );
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

        // const result = require('../../fakeAPI/catalogBreadCrumbs.json');
        this.setState(
            {
                breadCrumbs: this.props.data.catalogBreadCrumbs
            }
        );
    };

    loadShopTags() {
        // fetchApi('../../fakeAPI/catalogShopTags.json')
        //     .then(result => this.setState({
        //             shopTags: result
        //         }
        //     ));

        // const result = require('../../fakeAPI/catalogShopTags.json');
        this.setState(
            {
                shopTags: this.props.data.catalogShopTags
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

        // const result = require('../../fakeAPI/catalogPageTabsData.json');
        this.setState(
            {
                tabsData:
                    {
                        ...this.props.data.catalogPageTabsData, items: this.props.data.catalogPageTabsData.items.map
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
        // console.log(this.props);
        // return (
        //     <h1>load</h1>
        // );
        const {
            productOptions,
            breadCrumbs,
            recentlyCarouseData,
            shopTags,
            catalogItems,
            tabsData,
            carouselProductsData
        } = this.state;
        console.log(catalogItems);
        return (
            catalogItems &&
            <CatalogComponent
                productOptions={productOptions}

                catalogItems={catalogItems}
                breadCrumbs={breadCrumbs}
                recentlyCarouseData={recentlyCarouseData}

                shopTags={shopTags}
                tabsData={tabsData}
                carouselProductsData={carouselProductsData}
                onAddToCart={this.addToCart}
                onLoadMoreProducts={this.loadMoreProducts}

                changeFormField={this.changeFormField}
            />
        );
    }
}

const mapStateToProps = (state, props) => {
    const category = props.match.params.categoryName.substring(1);
    const brand = props.match.params.brandName;
    const id = brand ? category + brand : category;
    return {
        data: state.Data[id],
        recently: state.Store.recently
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddToCart: (item) => dispatch(addToCart(item)),
        onGetData: (id, url, name, params) => dispatch(getData(id, url, name, params))
    };
};

export default reduxForm({
    form: 'sortForm'
})(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Catalog)
);