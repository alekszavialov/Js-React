import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, change } from 'redux-form';
import PropTypes from 'prop-types';

import ProductPageComponent from './components';

import { addToCart } from '../../data/Store/actions';

import './styles.css';
import { getData } from '../../data/Data/actions';
import cyrillicToTranslit from 'cyrillic-to-translit-js/CyrillicToTranslit';

class ProductPage extends Component {

    static propTypes = {
        data: PropTypes.object,
        match: PropTypes.object,
        onAddToCart: PropTypes.func,
        onGetData: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            productData: null,
            breadCrumbs: null,
            relatedCarouseData: null,
            specifications: null,
            comments: null
        };

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

    }

    componentDidMount() {
        window.scrollTo(0, 0);
        const id = this.props.match.url.match(/\d+/)[0];
        this.loadDataAPI(id);
        if (this.props.data[id]) {
            const productData = this.props.data[id].productData[0];
            const { comments, specifications } = this.props.data[id];
            if (productData && specifications && comments) {
                document.title = productData.title;
                this.fillPageState(productData, specifications, comments);
            }
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.match.url !== this.props.match.url) {
            window.scrollTo(0, 0);
            this.setState({
                productData: null,
                breadCrumbs: null,
                relatedCarouseData: null,
                specifications: null,
                comments: null
            });
            this.loadDataAPI(nextProps.match.url.match(/\d+/)[0]);
            return;
        }
        const id = this.props.match.url.match(/\d+/)[0];
        const data = nextProps.data[id];
        if (!data) {
            return;
        }
        const productData = data.productData && data.productData[0];
        if (!productData) {
            return;
        }
        if (!nextState.productData) {
            document.title = productData.title;
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
                'href': `/catalog-${productData.brand.toLowerCase()}`,
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
                'href': `/catalog-${data.brand.toLowerCase()}`,
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

    toggleAddComment() {
        this.setState({
            isVisibleCommentForm: !this.state.isVisibleCommentForm
        });
    }

    addToCart(item) {
        this.props.onAddToCart(item);
    }

    render() {
        console.log(this.props.match);
        const {
            breadCrumbs,
            relatedCarouseData,
            productData,
            comments,
            specifications
        } = this.state;
        return (
            productData &&
            <ProductPageComponent
                breadCrumbs={breadCrumbs}
                productData={productData}
                relatedCarouseData={relatedCarouseData}
                comments={comments}
                specifications={specifications}
                url={this.props.match.params.productName}
                subPage={this.props.match.params.subPage}
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
