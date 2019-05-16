import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BreadCrumbs from '../../../components/breadCrumbs';
import SlickCarousel from '../../../components/slickCarousel';
import SiteTabs from '../../../components/tabs';
import ProductDescription from './productDescription';

export default class ProductPageComponent extends Component {

    static propTypes = {
        breadCrumbs: PropTypes.array,
        productData: PropTypes.object,
        carouselProductsData: PropTypes.object,
        tabsItems: PropTypes.object,
        onAddToCart: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.addToCart = this.addToCart.bind(this);
    }

    addToCart(item) {
        this.props.onAddToCart(item);
    }

    render() {
        const { breadCrumbs, productData, carouselProductsData, tabsItems } = this.props;
        return (
            <div className="container">
                <div className="bg-white">
                    <div className="product-info-head">
                        <div className="row">
                            <div className="col-md-12">
                                {
                                    breadCrumbs &&
                                    (
                                        <div className="product-card-tabs">
                                            <BreadCrumbs items={breadCrumbs}/>
                                        </div>
                                    )
                                }
                            </div>
                            {
                                productData &&
                                (
                                    <ProductDescription
                                        data={productData}
                                        onAddToCart={this.addToCart}
                                    />
                                )
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="accompanying-carousel-block">
                                <h2 className="seal-lead">Сопутствующие товары:</h2>
                                {
                                    carouselProductsData &&
                                    (
                                        <SlickCarousel
                                            carouselData={carouselProductsData}
                                        />
                                    )
                                }
                            </div>
                        </div>
                        <div className="col-md-12">
                            {
                                tabsItems &&
                                (
                                    <div className="product-card-tabs">
                                        <SiteTabs items={tabsItems}/>
                                    </div>
                                )
                            }
                        </div>
                        <div className="col-md-12">
                            <div className="accompanying-carousel-block">
                                <h2 className="seal-lead">Похожие товары на Принтер фабрика печати Epson L132
                                    C11CE58403:</h2>
                                {
                                    carouselProductsData &&
                                    (
                                        <SlickCarousel
                                            carouselData={carouselProductsData}
                                        />
                                    )
                                }
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="accompanying-carousel-block">
                                <h2 className="seal-lead block-with-icon icon-eye">Недавно просмотренные товары:</h2>
                                {
                                    carouselProductsData &&
                                    (
                                        <SlickCarousel
                                            carouselData={carouselProductsData}
                                        />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
