import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFormValues, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import CatalogComponent from './components';

import { addToCart } from '../../data/Store/actions';
import { getData } from '../../data/Data/actions';

import './styles.css';

class Catalog extends Component {
    static propTypes = {
        onAddToCart: PropTypes.func,
        data: PropTypes.object,
        sortForm: PropTypes.object,
        onGetData: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            catalogItems: null,
            recentlyCarouseData: null,
            productOptions: null,
            itemsShowCount: 12,
            isMoreProducts: false,

            breadCrumbs: null,
            shopTags: null,
            tabsData: null,
            carouselProductsData: null
        };

        this.loadProductOptions = this.loadProductOptions.bind(this);
        this.loadShopTags = this.loadShopTags.bind(this);
        this.loadTabsData = this.loadTabsData.bind(this);
        this.loadCarouselItems = this.loadCarouselItems.bind(this);
        this.loadCatalogItems = this.loadCatalogItems.bind(this);
        this.loadDataAPI = this.loadDataAPI.bind(this);
        this.loadRecentlyProducts = this.loadRecentlyProducts.bind(this);
        this.loadMoreProducts = this.loadMoreProducts.bind(this);

        this.addToCart = this.addToCart.bind(this);
        this.changeFormField = this.changeFormField.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        const category = this.props.match.params.categoryName.substring(1);
        const brand = this.props.match.params.brandName;
        const sort = this.props.match.params.sortData;
        console.log(sort, 'sort URL!!!!!');
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
        if (this.props.data && this.props.data.catalogData && this.props.recently && this.props.data.sortData) {
            this.loadCatalogItems(this.props.data.catalogData);
            this.loadRecentlyProducts(this.props.recently);
            this.loadProductOptions(this.props.data.sortData);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('new data');
        console.log(nextProps.sortForm && !this.props.sortForm);
        if (this.props.match.params.sortData) {
            console.log(this.props.location.state, 'some data');
        }
        if (nextProps.match.url !== this.props.match.url) {
            console.log(nextProps.match.url, 'new url');

        }
        const category = this.props.match.params.categoryName.substring(1);
        const data = nextProps.data && nextProps.data.catalogData;
        if (!data) {
            return false;
        }
        if (!nextState.catalogItems) {
            document.title = category;
            this.loadCatalogItems(data);
        }
        if (!nextState.productOptions && nextProps.data.sortData) {
            this.loadProductOptions(nextProps.data.sortData);
        }
        if ((nextProps.recently.length > 0 && !nextState.recentlyCarouseData) ||
            (nextProps.recently.length !== this.props.recently.length)) {
            this.loadRecentlyProducts(nextProps.recently);
        }
        return true;

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
        if (!this.props.data) {
            this.props.onGetData(
                id,
                'http://api.vct1.com/catalog/',
                'catalogData',
                params
            );
            this.props.onGetData(
                id,
                'http://api.vct1.com/parameters/',
                'sortData',
                { category: params.category }
            );
        }
    }

    changeFormField(data) {
        if (!data.name) {
            for (let key in data) {
                this.props.change(key, data[key]);
            }
        }
        else {
            const formField = this.props.sortForm[data.name];
            if (!data.remove) {
                this.props.change(
                    data.name,
                    formField ? [...formField, data.text] : [data.text]
                );
            } else {
                const field = formField.filter(item => item !== data.text);
                this.props.change(
                    data.name,
                    field.length > 0 ? field : ''
                );
            }
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
        let isMoreProducts = this.state.isMoreProducts;
        if (data.length > this.state.itemsShowCount) {
            data = data.slice(0, this.state.itemsShowCount);
            isMoreProducts = true;
        }
        this.setState(
            {
                catalogItems: data,
                breadCrumbs: stateBreadCrumbs,
                isMoreProducts
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
        let isMoreProducts = false;
        let data = this.props.data.catalogData;
        let itemsShowCount = this.state.itemsShowCount;
        const nextStateItemsShowCount = this.state.itemsShowCount + 6;

        if (this.props.data.catalogData.length > nextStateItemsShowCount) {
            data = data.slice(0, nextStateItemsShowCount);
            isMoreProducts = true;
            itemsShowCount = nextStateItemsShowCount;
        }
        this.setState(
            {
                catalogItems: data,
                itemsShowCount,
                isMoreProducts
            }
        );
    }

    loadProductOptions(data) {
        console.log('loadProductOptions');
        const result = {
            sliderValues: {
                min: Number(data[0].items[0].text),
                max: Number(data[0].items[1].text)
            },
            productParameters: [
                ...data.slice(1, data.length).map((item, index) => {
                    return {
                        head: `${item.name} :`,
                        name: item.parameter,
                        options: item.items
                    };
                }),
                { head: 'В наличие', name: 'stock', options: [{ text: 'Только в начилие' }] }
            ]
        };
        console.log(result, 'loadProductData!!!');
        this.setState(
            {
                productOptions: result
            }, () => {
                this.props.initialize({ ...result.sliderValues });
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

    submitForm() {
        let query = {};
        for (let data in this.props.sortForm) {
            if (data === 'stock') {
                query = { ...query, [data]: 1 };
            } else if (Array.isArray(this.props.sortForm[data])) {
                query = { ...query, [data]: this.props.sortForm[data].join(',') };
            } else {
                query = { ...query, [data]: this.props.sortForm[data] };
            }
        }
        console.log(JSON.stringify(this.props.sortForm));
        this.props.history.push({
            pathname: `/catalog-детали для картриджей/epson/sort`,
            state: { query: this.props.sortForm }
        });
        console.log(this.props);
    }

    render() {
        const {
            isMoreProducts,
            catalogItems,
            breadCrumbs,
            recentlyCarouseData,

            productOptions,

            shopTags,
            tabsData,
            carouselProductsData
        } = this.state;
        if (!catalogItems) {
            return (
                <h1>Load</h1>
            );
        }
        return (
            <CatalogComponent
                productOptions={productOptions}
                catalogItems={catalogItems}
                breadCrumbs={breadCrumbs}
                recentlyCarouseData={recentlyCarouseData}
                isMoreProducts={isMoreProducts}
                submitForm={this.submitForm}
                changeFormField={this.changeFormField}
                onAddToCart={this.addToCart}
                onLoadMoreProducts={this.loadMoreProducts}

                shopTags={shopTags}
                tabsData={tabsData}
                carouselProductsData={carouselProductsData}

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
        recently: state.Store.recently,
        sortForm: getFormValues('sortForm')(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddToCart: (item) => dispatch(addToCart(item)),
        onGetData: (id, url, name, params) => dispatch(getData(id, url, name, params))
    };
};

export default reduxForm({
    form: 'sortForm',
})(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Catalog)
);