import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import BreadCrumbs from '../../../components/breadCrumbs';
import SlickCarousel from '../../../components/slickCarousel';
import ItemCatalog from '../../../components/itemCatalog';
import SortForm from './SortForm';

export default class CatalogComponent extends Component {
    static propTypes = {
        breadCrumbs: PropTypes.array,
        recentlyCarouseData: PropTypes.object,
        newCarouseData: PropTypes.object,
        catalogItems: PropTypes.array,
        isMoreProducts: PropTypes.bool,
        productOptions: PropTypes.object,
        onAddToCart: PropTypes.func,
        onLoadMoreProducts: PropTypes.func,
        changeFormField: PropTypes.func,
        submitForm: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.loadMoreProducts = this.loadMoreProducts.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.changeFormField = this.changeFormField.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    changeFormField(data) {
        this.props.changeFormField(data);
    }

    loadMoreProducts(item) {
        this.props.onLoadMoreProducts(item);
    }

    addToCart(item) {
        this.props.onAddToCart(item);
    }

    submitForm() {
        this.props.submitForm();
    }

    render() {
        const {
            isMoreProducts,
            breadCrumbs,
            recentlyCarouseData,
            newCarouseData,
            catalogItems,
            productOptions
        } = this.props;
        const isEmpty = catalogItems.length === 0;
        return (
            <div className="container-fluid max-container-width">
                <div className="bg-white">
                    <div className="row">
                        <div className="col-md-3">
                            {
                                productOptions &&
                                <SortForm
                                    sliderValues={productOptions.sliderValues}
                                    productParameters={productOptions.productParameters}
                                    orderValues={productOptions.order}
                                    changeFormField={this.changeFormField}
                                    submitForm={this.submitForm}
                                />
                            }
                        </div>
                        <div className="col-md-9">
                            {
                                breadCrumbs &&
                                <BreadCrumbs items={breadCrumbs}/>
                            }
                            <div className="catalog-shop-blocks">
                                {
                                    isEmpty &&
                                    <h2>По вашему запросу ничего не найдено</h2>
                                }
                                {
                                    !isEmpty &&

                                    <ItemCatalog items={catalogItems} onAddToCart={this.addToCart}/>
                                }
                                {isMoreProducts &&
                                <div
                                    className="shop-blocks-load-more shop-block-buy"
                                    onClick={this.loadMoreProducts}
                                >
                                    Загрузить еще
                                </div>}
                            </div>
                        </div>
                        {
                            newCarouseData &&
                            <div className="col-md-12">
                                <div className="accompanying-carousel-block">
                                    <Fragment>
                                        <h2 className="seal-lead block-with-icon icon-thumbs-up">Новые
                                            товары:</h2>
                                        <SlickCarousel
                                            carouselData={newCarouseData}
                                        />
                                    </Fragment>
                                </div>
                            </div>
                        }
                        {
                            recentlyCarouseData &&
                            <div className="col-md-12">
                                <div className="accompanying-carousel-block">
                                    <Fragment>
                                        <h2 className="seal-lead block-with-icon icon-thumbs-up">Недавно просмотренные
                                            товары:</h2>
                                        <SlickCarousel
                                            carouselData={recentlyCarouseData}
                                        />
                                    </Fragment>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
