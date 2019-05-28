import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, change } from 'redux-form';
import PropTypes from 'prop-types';

import ProductPageComponent from './components';
import DeliveryAndPay from './components/deliveryAndPay';
import ProductSpecification from './components/productSpecifications';
import ProductCommentBlock from './components/productComment';

import { addToCart } from '../../data/Store/actions';

import './styles.css';
import { getData } from '../../data/Data/actions';
import cyrillicToTranslit from 'cyrillic-to-translit-js/CyrillicToTranslit';

class ProductPage extends Component {

    static propTypes = {
        onAddToCart: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.url.match(/\d+/)[0],
            productData: null,
            tabsItems: null,
            breadCrumbs: null,
            carouselProductsData: null,
            relatedCarouseData: null,
            relatedProducts: null
        };

        this.loadProductData = this.loadProductData.bind(this);
        this.loadRelatedProducts = this.loadRelatedProducts.bind(this);
        this.loadBreadCrumbs = this.loadBreadCrumbs.bind(this);
        this.loadPageTabs = this.loadPageTabs.bind(this);
        this.loadCarouselItems = this.loadCarouselItems.bind(this);
        this.addToCart = this.addToCart.bind(this);

        this.toggleAddComment = this.toggleAddComment.bind(this);
        this.changeFormField = this.changeFormField.bind(this);
    }

    componentWillMount() {
        const { id } = this.state;
        (this.props.data[id] && this.props.data[id].productData) || this.props.onGetData(id, `http://api.vct1.com/product/${id}`, `productData`);
        (this.props.data[id] && this.props.data[id].specifications) || this.props.onGetData(id, `http://api.vct1.com/specifications/${id}`, `specifications`);
        (this.props.data[id] && this.props.data[id].comments) || this.props.onGetData(id, `http://api.vct1.com/comments/${id}`, `comments`);
    }

    componentDidMount() {
        const { id } = this.state;
        const productData = this.props.data[id] && this.props.data[id].productData;
        if (productData && !this.state.productData) {
            this.loadProductData(productData[0]);
        }
        if (productData && !this.state.breadCrumbs) {
            this.loadBreadCrumbs(productData[0]);
        }
        const specifications = this.props.data[id] && this.props.data[id].specifications;
        const comments = this.props.data[id] && this.props.data[id].comments;
        if (!this.state.comments && productData && specifications && comments) {
            this.loadPageTabs(productData, specifications, comments);
        }
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('update!!!');
        const { id } = this.state;
        const productData = nextProps.data[id].productData || this.props.data[id] && this.props.data[id].productData;
        if (productData && !nextState.productData) {
            this.loadProductData(productData[0]);
        }
        if (productData && productData[0]['related-products'] && !nextState.relatedCarouseData) {
            const related = productData[0]['related-products'].split(',');
            const loaded = related.map(item => {
                    return nextProps.data[item];
                }
            ).filter(item => item);
            if (loaded.length === related.length) {
                this.loadRelatedProducts(loaded);
            }
        }
        if (productData && !nextState.breadCrumbs) {
            this.loadBreadCrumbs(productData[0]);
        }
        const specifications = nextProps.data[id].specifications || this.props.data[id] && this.props.data[id].specifications;
        const comments = nextProps.data[id].comments || this.props.data[id] && this.props.data[id].comments;
        if (!nextState.comments && productData && specifications && comments) {
            this.loadPageTabs(productData, specifications, comments);
        }
    }

    changeFormField(data) {
        // if (!data.remove) {
        //     console.log(data, 'asaas log');
        //
        // } else {
        //     console.log('else');
        //     this.props.change(data.remove, '');
        // }
        console.log(data, 'asaas log');
        for (const key in data) {
            // this.props.change(key, data[key]);
            // dispatch(change("form name", "foo", response.data.foo))
            this.props.onChangeField(key, data[key]);
            break;
        }
    };

    loadRelatedProducts(data) {
        console.log('asddsaads carouserlll!!!');
        const filterData = data.map(
            item => {
                const newItem = {
                    src: item.productData[0].img,
                    href: `/product-${item.productData[0].id}-${cyrillicToTranslit().transform(item.productData[0].title.replace(/\//g, ''), '_').toLowerCase()}`,
                    name: item.productData[0].title,
                    price: item.productData[0].price,
                    article: item.productData[0].id
                };
                return newItem;
            }
        );
        this.setState({
            relatedCarouseData: {
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
                'items': filterData,
                onAddToCart: this.addToCart
            }
        });
    }

// {
//     "src": "https://vct1.com/img/sub_menu/sub_menu_proector.jpg.pagespeed.ce.gqCHhkEpSA.jpg",
//     "href": "#",
//     "name": "Чип для картриджа Pantum PC-210E/211EV (безлимитный) (CHIP-PC-211EV)",
//     "description": "M6500/M6607/P2200/P2207/ P2500/P2507",
//     "price": 324,
//     "article": 121221
// },

    toggleAddComment() {
        this.setState({
            isVisibleCommentForm: !this.state.isVisibleCommentForm
        });
    }

    loadProductData(data) {
        if (data['related-products']) {
            const related = data['related-products'].split(',');
            related.forEach((item) =>
                this.props.data[item] || this.props.onGetData(item, `http://api.vct1.com/product/${item}`, `productData`)
            );
        }
        this.setState(
            {
                productData: data
            }
        );
    };

    // loadPageTabs() {
    //     // fetchApi('../../fakeAPI/productPageTabsData.json')
    //     //   .then(result => this.setState({
    //     //       tabsItems: {
    //     //         ...result, items: result.items.map(item =>
    //     //           (item.map(item =>
    //     //             <div className="tabs-item" key={Math.random()} dangerouslySetInnerHTML={{__html: item.content}}>
    //     //             </div>
    //     //           ))
    //     //         )
    //     //       }
    //     //     }
    //     //   ));
    //
    //     // const result = require('../../fakeAPI/productPageTabsData.json');
    //     this.setState(
    //         {
    //             tabsItems: {
    //                 ...this.props.data.productPageTabsData,
    //                 items: this.props.data.productPageTabsData.items.map
    //                 (item =>
    //                     (
    //                         item.map
    //                         (item =>
    //                             <div className="tabs-item" key={Math.random()}
    //                                  dangerouslySetInnerHTML={{ __html: item.content }}>
    //                             </div>
    //                         )
    //                     )
    //                 )
    //             }
    //         }
    //     );
    // };

    loadPageTabs(productData, specifications, comments) {
        const specification = {
            title: productData[0].title,
            data: specifications
        };
        const comment = {
            title: productData[0].title,
            data: comments,
            changeFormField: this.changeFormField
        };
        this.setState(
            {
                specification: specification,
                comments: comment
            }
        );
    };

    loadBreadCrumbs(data) {
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
        console.log(this.state);
        console.log(this.props.data);
        const {
            breadCrumbs,
            relatedCarouseData,
            productData,
            comments,
            specification
        } = this.state;
        if (!productData) {
            return false;
        }
        return (
            <ProductPageComponent
                breadCrumbs={breadCrumbs}
                productData={productData}

                relatedCarouseData={relatedCarouseData}
                comments={comments}
                specification={specification}
                onAddToCart={this.addToCart}
            />
        );
    }
}

const mapStateToProps = (state, props) => {
    // const id = props.match.url.match(/\d+/)[0];
    return {
        data: state.Data
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddToCart: (item) => dispatch(addToCart(item)),
        onGetData: (id, url, name) => dispatch(getData(id, url, name)),
        onChangeField: (name, value) => dispatch(change('commentForm', name, value))
    };
};

export default reduxForm({
    form: 'commentForm'
})(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(ProductPage)
);
