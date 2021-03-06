import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, change } from 'redux-form';
import PropTypes from 'prop-types';

import ProductPageComponent from './components';

import { addToCart, addToRecently } from '../../data/Store/actions';
import fillMetaData from '../../modules/fillMetaData';

import './styles.css';
import { getData } from '../../data/Data/actions';
import cyrillicToTranslit from 'cyrillic-to-translit-js/CyrillicToTranslit';

class ProductPage extends Component {

    static propTypes = {
        data: PropTypes.object,
        recently: PropTypes.array,
        match: PropTypes.object,
        onAddToCart: PropTypes.func,
        onAddToRecently: PropTypes.func,
        onGetData: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            productData: null,
            breadCrumbs: null,
            relatedCarouseData: null,
            recentlyCarouseData: null,
            specifications: null,
            comments: null
        };
        this.baseState = this.state;
        this.loadDataAPI = this.loadDataAPI.bind(this);
        this.fillPageState = this.fillPageState.bind(this);
        this.loadProductData = this.loadProductData.bind(this);
        this.loadRelatedProducts = this.loadRelatedProducts.bind(this);
        this.loadBreadCrumbs = this.loadBreadCrumbs.bind(this);
        this.loadComments = this.loadComments.bind(this);
        this.loadSpecifications = this.loadSpecifications.bind(this);

        this.addToCart = this.addToCart.bind(this);
        this.toggleAddComment = this.toggleAddComment.bind(this);
        this.changeFormField = this.changeFormField.bind(this);
        this.addToRecently = this.addToRecently.bind(this);

    }

    componentDidMount() {
        window.scrollTo(0, 0);
        const id = this.props.match.url.match(/\d+/)[0];
        this.loadDataAPI(id);
        if (this.props.data[id]) {
            const productData = this.props.data[id].productData[0];
            const { comments, specifications } = this.props.data[id];
            if (productData && specifications && comments) {
                fillMetaData('productPage', productData.title, productData.price);
                // document.title = `${productData.title} купить за ${productData.price} грн в интернет магазине krop.com.ua`;
                // document.getElementsByTagName("META").filter(item => item.name === "description")[0].content = `${productData.title} – купить на ➦ krop.com.ua. ☎: (099) 70-17-001. Быстрая доставка ✈ Гарантия качества ☑ Отличная цена $`;
                this.fillPageState(productData, specifications, comments);
                console.log(Array.from(document.getElementsByTagName('META')));
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.match.url !== this.props.match.url) {
            window.scrollTo(0, 0);
            this.setState(this.baseState);
            this.loadDataAPI(nextProps.match.url.match(/\d+/)[0]);
            return false;
        }
        const id = this.props.match.url.match(/\d+/)[0];
        const data = nextProps.data[id];
        if (!data) {
            return false;
        }
        const productData = data.productData && data.productData[0];
        if (!productData) {
            return false;
        }
        if (!nextState.productData) {
            // console.log(Array.from(document.getElementsByTagName('META')));
            fillMetaData('productPage', productData.title, productData.price);
            // document.getElementsByTagName("META").filter(item => item.name === "description")[0].content = `${productData.title} – купить на ➦ krop.com.ua. ☎: (099) 70-17-001. Быстрая доставка ✈ Гарантия качества ☑ Отличная цена $`;
            this.loadProductData(productData);
        }
        if (productData['related-products'] && !nextState.relatedCarouseData) {
            const related = productData['related-products'].split(',').filter(item => item);
            const loaded = related.map(
                item => {
                    return nextProps.data[item];
                }
            ).filter(item => item);
            if (loaded.length === related.length) {
                this.loadRelatedProducts(loaded);
            }
        }

        if (nextProps.recently.length !== this.props.recently.length) {
            this.loadRecentlyProducts(nextProps.recently);
        }
        if (!nextState.breadCrumbs) {
            this.loadBreadCrumbs(productData);
        }

        const { comments } = data;
        if (!nextState.comments && comments) {
            this.loadComments(productData, comments);
        }
        const { specifications } = data;
        if (!nextState.specifications && specifications) {
            this.loadSpecifications(productData, specifications);
        }
        return true;
    }

    loadDataAPI(id) {
        (this.props.data[id] && this.props.data[id].productData) || this.props.onGetData(id, `http://api.vct1.com/product/${id}`, `productData`);
        (this.props.data[id] && this.props.data[id].specifications) || this.props.onGetData(id, `http://api.vct1.com/specifications/${id}`, `specifications`);
        (this.props.data[id] && this.props.data[id].comments) || this.props.onGetData(id, `http://api.vct1.com/comments/${id}`, `comments`);
    }

    fillPageState(productData, specifications, comments) {
        if (productData['related-products']) {
            const related = productData['related-products'].split(',').filter(item => item);
            related.forEach((item) =>
                this.props.data[item] || this.props.onGetData(item, `http://api.vct1.com/product/${item}`, `productData`)
            );
            const loaded = related.map(
                item => {
                    return this.props.data[item];
                }
            ).filter(item => item);
            if (loaded.length === related.length) {
                this.loadRelatedProducts(loaded);
            }
        }
        const stateBreadCrumbs = [
            { 'href': '/', 'name': 'Главная' },
            {
                'href': `/catalog-${productData.category.toLowerCase()}`,
                'name': productData.category
            },
            {
                'href': `/catalog-${productData.category.toLowerCase()}/${productData.brand.toLowerCase()}`,
                'name': productData.brand
            },
            { 'href': '', 'name': productData.title }
        ];
        const stateSpecification = {
            title: productData.title,
            data: specifications
        };
        const stateComments = {
            title: productData.title,
            data: comments,
            changeFormField: this.changeFormField
        };
        if (this.props.recently.length > 0) {
            this.loadRecentlyProducts(this.props.recently);
        }
        this.setState(
            {
                productData: productData,
                breadCrumbs: stateBreadCrumbs,
                specifications: stateSpecification,
                comments: stateComments
            }
        );

    }

    loadBreadCrumbs(data) {
        const breadCrumbs = [
            { 'href': '/', 'name': 'Главная' },
            {
                'href': `/catalog-${data.category.toLowerCase()}`,
                'name': data.category
            },
            {
                'href': `/catalog-${data.category.toLowerCase()}/${data.brand.toLowerCase()}`,
                'name': data.brand
            },
            { 'href': '', 'name': data.title }
        ];
        this.setState(
            {
                breadCrumbs: breadCrumbs
            }
        );
    };

    loadProductData(data) {
        if (data['related-products']) {
            const related = data['related-products'].split(',');
            related.forEach((item) =>
                this.props.data[item] || this.props.onGetData(item, `http://api.vct1.com/product/${item}`, `productData`)
            );
        }
        this.addToRecently(data);
        this.setState(
            {
                productData: data
            }
        );
    };

    loadSpecifications(productData, specifications) {
        const stateSpecification = {
            title: productData.title,
            data: specifications
        };
        this.setState(
            {
                specifications: stateSpecification
            }
        );
    };

    loadComments(productData, comments) {
        const stateComment = {
            title: productData.title,
            data: comments,
            changeFormField: this.changeFormField
        };
        this.setState(
            {
                comments: stateComment
            }
        );
    };

    changeFormField(data) {
        for (const key in data) {
            this.props.onChangeField(key, data[key]);
            break;
        }
    };

    loadRelatedProducts(data) {
        const filterData = data.map(
            item => {
                return {
                    src: item.productData[0].img,
                    href: `/product-${item.productData[0].id}-${cyrillicToTranslit().transform(item.productData[0].title.replace(/\//g, ''), '_').toLowerCase()}`,
                    name: item.productData[0].title,
                    price: item.productData[0].price,
                    article: item.productData[0].id,
                    description: item.productData[0].description
                };
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
                'items': filterData,
                onAddToCart: this.addToCart
            }
        });
    }

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

    toggleAddComment() {
        this.setState({
            isVisibleCommentForm: !this.state.isVisibleCommentForm
        });
    }

    addToCart(item) {
        this.props.onAddToCart(item);
    }

    addToRecently(data){
        if (this.props.recently.filter(cartItem => cartItem.article === data.id)[0] === undefined){
            this.props.onAddToRecently({
                name: data.title,
                description: data.description,
                href: `/product${this.props.match.params.productName}`,
                src: data.img,
                price: data.price,
                article: data.id
            });
        }
        this.loadRecentlyProducts(this.props.recently);
    }

    render() {
        const { subPage, productName } = this.props.match.params;
        const {
            breadCrumbs,
            relatedCarouseData,
            recentlyCarouseData,
            productData,
            comments,
            specifications
        } = this.state;
        if (!productData ||
            subPage === 'specifications' && !specifications ||
            subPage === 'comments' && !comments ||
            subPage === 'related' && !relatedCarouseData
        ) {
            return (
                <div className="loader"/>
            );
        }
        return (
            <ProductPageComponent
                breadCrumbs={breadCrumbs}
                productData={productData}
                relatedCarouseData={relatedCarouseData}
                recentlyCarouseData={recentlyCarouseData}
                comments={comments}
                specifications={specifications}
                url={productName}
                subPage={subPage}
                onAddToCart={this.addToCart}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.Data,
        recently: state.Store.recently
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddToCart: (item) => dispatch(addToCart(item)),
        onAddToRecently: (item) => dispatch(addToRecently(item)),
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
