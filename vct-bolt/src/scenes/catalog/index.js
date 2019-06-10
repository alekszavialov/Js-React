import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFormValues, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import CatalogComponent from './components';

import { addToCart } from '../../data/Store/actions';
import { getData, clearData } from '../../data/Data/actions';

import './styles.css';

class Catalog extends Component {
    static propTypes = {
        onAddToCart: PropTypes.func,
        data: PropTypes.object,
        sortForm: PropTypes.object,
        onGetData: PropTypes.func,
        onClearData: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            catalogItems: null,
            recentlyCarouseData: null,
            productOptions: null,
            isMoreProducts: false,
            filterDataItems: false,
            start: 0,
            onpage: 6,
            breadCrumbs: null,
            shopTags: null,
            tabsData: null,
            carouselProductsData: null
        };
        this.baseState = this.state;
        this.loadNewPage = this.loadNewPage.bind(this);
        this.loadProductOptions = this.loadProductOptions.bind(this);
        this.loadShopTags = this.loadShopTags.bind(this);
        this.loadTabsData = this.loadTabsData.bind(this);
        this.loadCarouselItems = this.loadCarouselItems.bind(this);
        this.loadCatalogItems = this.loadCatalogItems.bind(this);
        this.loadDataAPI = this.loadDataAPI.bind(this);
        this.loadRecentlyProducts = this.loadRecentlyProducts.bind(this);
        this.loadMoreProducts = this.loadMoreProducts.bind(this);
        this.refreshCatalogItems = this.refreshCatalogItems.bind(this);

        this.addToCart = this.addToCart.bind(this);
        this.changeFormField = this.changeFormField.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    componentDidMount() {
        console.log('didMount');
        this.loadNewPage();
        // if (this.props.data &&
        //     this.props.data.catalogData &&
        //     this.props.recently &&
        //     this.props.data.sortData) {
        //     this.loadCatalogItems(this.props.data.catalogData);
        //     this.loadRecentlyProducts(this.props.recently);
        //     this.loadProductOptions(this.props.data.sortData);
        // }
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('new data');
        // if (this.props.match.params.filterData !== nextProps.match.params.filterData) {
        //     const filterData = this.props.match.params.filterData.split("&").map(item => {
        //         const data = item.split("=");
        //         data[1] = decodeURIComponent(data[1]);
        //         console.log(data[0]);
        //         console.log(data[0] !== "min");
        //         console.log(data[0] !== "max");
        //         if (data[0] === "stock"){
        //             data[1] = data[1] === "1";
        //         } else
        //         if (data[0] !== "min" && data[0] !== "max"){
        //             data[1] = data[1].split(",");
        //         }
        //         return {[data[0]]: data[1]};
        //     });
        //     console.log(filterData);
        //     this.props.initialize( filterData );
        // }
        console.log(nextProps.location.pathname);
        console.log(this.props.location);
        console.log('ur;');
        if (nextProps.location.pathname !== this.props.location.pathname ||
        nextProps.location.search !== this.props.location.search) {
            console.log('newPAge');
            console.log('newPAge');
            console.log('newPAge');
            console.log('newPAge');
            console.log('newPAge');
            console.log('newPAge');
            console.log('newPAge');
            console.log('newPAge');
            console.log('newPAge');
            console.log('newPAge');
            console.log('newPAge');
            console.log('newPAge');
            console.log('newPAge');
            console.log('newPAge');
            console.log(nextProps.location.search);
            console.log(this.props.location.search);
            const query = nextProps.location.search ? nextProps.location.search : "none";
            this.setState(this.baseState);
            this.loadNewPage(query);
        }

        const category = this.props.match.params.categoryName.split('?')[0].substring(1);
        let data = nextProps.data ?
            nextProps.data.catalogData ? nextProps.data.catalogData :
                nextProps.data.filterData ? nextProps.data.filterData : false : false;
        console.log(data, 'data!!!');
        console.log(nextProps.data, 'dataprops!!!');
        if (!data) {
            return false;
        }
        if (!nextState.catalogItems) {
            document.title = category;
            this.loadCatalogItems(data, nextProps.location.search);
        }
        if (nextState.catalogItems && nextProps.data.catalogData.length !== this.props.data.catalogData.length) {
            this.refreshCatalogItems(data);
        }
        if (!nextState.productOptions && nextProps.data.sortData) {
            this.loadProductOptions(nextProps.data.sortData, nextProps.location.search);
        }
        if ((nextProps.recently.length > 0 && !nextState.recentlyCarouseData) ||
            (nextProps.recently.length !== this.props.recently.length)) {
            this.loadRecentlyProducts(nextProps.recently);
        }
        return true;
    }

    loadNewPage(newQuery) {
        window.scrollTo(0, 0);
        const category = this.props.match.params.categoryName.substring(1);
        const brand = this.props.match.params.brandName;
        let query = this.props.location.search.substring(1);
        if (newQuery === "none"){
            query =  "";
        } else if (newQuery){
            query = newQuery;
        }
        const id = category;
        this.props.onClearData(id);
        let params = {
            category: category,
            start: this.state.start,
            onpage: this.state.onpage
        };
        if (brand) {
            params = {
                ...params,
                brand
            };
        }
        this.loadDataAPI(id, params, query);
    }

    loadDataAPI(id, params, query) {
        if (query) {
            console.log(query, 'query');
            this.props.onGetData(
                id,
                'http://api.vct1.com/catalog/',
                'catalogData',
                query
            );
        } else {
            this.props.onGetData(
                id,
                'http://api.vct1.com/catalog/',
                'catalogData',
                params
            );
        }
        this.props.onGetData(
            id,
            'http://api.vct1.com/parameters/',
            'sortData',
            { category: params.category }
        );

    }

    changeFormField(data) {
        if (!data.name) {
            for (let key in data) {
                this.props.change(key, data[key]);
            }
        }
        else {
            if (data.name === "stock" && data.remove){
                this.props.change(
                    data.name,
                    false
                );
            } else {
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
        }

    };

    loadCatalogItems(data, query) {
        const category = this.props.match.params.categoryName.substring(1);
        let brand = this.props.match.params.brandName;
        if (query && query.includes("brand")){
            brand = /brand=([^&]*)/.exec(decodeURIComponent(query))[1].replace(/^,/, '');
        }
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
        if (data.length % this.state.onpage === 0) {
            isMoreProducts = true;
        }
        const start = data.length;
        this.setState(
            {
                catalogItems: data,
                breadCrumbs: stateBreadCrumbs,
                isMoreProducts,
                start
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
        const category = this.props.match.params.categoryName.substring(1);
        const brand = this.props.match.params.brandName;
        const id = brand ? category + brand : category;
        let params = {
            category: category,
            start: this.state.start,
            onpage: this.state.onpage
        };
        if (brand) {
            params = {
                ...params,
                brand
            };
        }
        console.log(params, 'azaza loadf');
        this.props.onGetData(
            id,
            'http://api.vct1.com/catalog/',
            'catalogData',
            params
        );
    }

    refreshCatalogItems(data) {
        console.log('refresh');
        console.log(data);
        let isMoreProducts = this.state.isMoreProducts;
        let start = this.state.start + this.state.onpage;
        if (data.length >= start) {
            isMoreProducts = true;
        } else {
            isMoreProducts = false;
            start = data.length;
        }
        this.setState(
            {
                catalogItems: data,
                isMoreProducts,
                start
            }
        );
    }

    loadProductOptions(data, query) {
        let result = {
            sliderValues: {
                name: data[0].parameter,
                options:
                    {
                        min: Number(data[0].items[0].text),
                        max: Number(data[0].items[1].text)
                    }
            },
            productParameters: [
                ...data.slice(1, data.length).map((item) => {
                    return {
                        head: `${item.name} :`,
                        name: item.parameter,
                        options: item.items
                    };
                }),
                { head: 'В наличие', name: 'stock', options: [{ text: 'Только в начилие' }] }
            ]
        };
        let initValues = { ...result.sliderValues.options };
        if (query) {
            const filterData = query.substring(1).split('&').reduce((acc, item) => {
                const data = item.split('=');
                data[1] = decodeURIComponent(data[1]);
                if (data[0] === 'stock') {
                    data[1] = data[1] === '1';
                } else if (data[0] !== 'min' && data[0] !== 'max') {
                    data[1] = data[1].split(',');
                }
                return { ...acc, [data[0]]: data[1] };
            }, {});
            initValues = filterData;
            const productCheckedData = result.productParameters.map(item => {
                return filterData[item.name] ?
                    {
                        ...item,
                        options: item.options.map(option => {
                            if (item.name === 'stock') {
                                return {
                                    ...option,
                                    checked: true
                                };
                            }
                            return Object.values(filterData[item.name]).indexOf(option.text) >= 0 ? {
                                ...option,
                                checked: true
                            } : option;
                        })
                    } :
                    item;
            });
            const priceCheckedData = { currentMin: Number(initValues.min), currentMax: Number(initValues.max) };
            result = {
                sliderValues: {
                    ...result.sliderValues, options: { ...result.sliderValues.options, ...priceCheckedData }
                },
                productParameters: productCheckedData
            };
        }
        this.setState(
            {
                productOptions: result
            }, () => {
                this.props.initialize(
                    initValues
                );
            }
        );
    }

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
        const category = this.props.match.params.categoryName.split('?')[0];
        let query = Object.entries(this.props.sortForm).map(item => {
            if (item[0] === 'stock' && item[1] !== false) {
                item[1] = 1;
            }
            return [item[0], encodeURIComponent(item[1])].join('=');
        }).join('&').concat(`&category=${category.substring(1)}`);
        const brand = this.props.match.params.brandName;
        if (brand && !query.includes('brand')) {
            query = query.concat(`&brand=${brand}`);
        }
        const url = `/catalog${category}`;
        this.props.history.push({
            pathname: url,
            search: query
        });
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
        console.log(catalogItems, 'catalog items');
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
    return {
        data: state.Data[category],
        recently: state.Store.recently,
        sortForm: getFormValues('sortForm')(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddToCart: (item) => dispatch(addToCart(item)),
        onGetData: (id, url, name, params) => dispatch(getData(id, url, name, params)),
        onClearData: (id) => dispatch(clearData(id))
    };
};

export default reduxForm({
    form: 'sortForm',
    enableReinitialize: true
})(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Catalog)
);