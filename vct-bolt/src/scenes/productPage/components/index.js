import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BreadCrumbs from '../../../components/breadCrumbs';
import SlickCarousel from '../../../components/slickCarousel';
import SiteTabs from '../../../components/tabs';
import ProductDescription from './productDescription';
import ProductCommentBlock from './productComment';
import DeliveryAndPay from './deliveryAndPay';
import ProductTabs from './tabs';
import ProductSpecification from './productSpecifications';

export default class ProductPageComponent extends Component {

    static propTypes = {
        breadCrumbs: PropTypes.array,
        productData: PropTypes.object,
        comments: PropTypes.object,
        specification: PropTypes.object,
        carouselProductsData: PropTypes.object,

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
        const { breadCrumbs, productData, carouselProductsData, comments, specification } = this.props;
        console.log(specification, '123123sad');
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
                        <div className="col-md-8">
                            {
                                specification &&
                                (
                                    <ProductSpecification {...specification}/>
                                )
                            }

                            <DeliveryAndPay title={productData.title}/>
                        </div>
                        <div className="col-md-4">
                            {
                                comments &&
                                (
                                    <div className="product-card-tabs">
                                        <ProductCommentBlock
                                            title={comments.title} data={comments.data}
                                            changeFormField={comments.changeFormField}
                                        />
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
