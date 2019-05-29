import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import BreadCrumbs from '../../../components/breadCrumbs';
import ProductPageNavigation from './productPageNavigation';
import SlickCarousel from '../../../components/slickCarousel';
import ProductDescription from './productDescription';
import ProductCommentBlock from './productComment';
import DeliveryAndPay from './deliveryAndPay';
import ProductSpecification from './productSpecifications';

export default class ProductPageComponent extends Component {

    static propTypes = {
        breadCrumbs: PropTypes.array,
        productData: PropTypes.object,
        comments: PropTypes.object,
        specifications: PropTypes.object,
        relatedCarouseData: PropTypes.object,
        url: PropTypes.string,
        subPage: PropTypes.string,
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
        const { breadCrumbs, productData, relatedCarouseData, comments, specifications, url, subPage } = this.props;
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
                                <ProductPageNavigation
                                    url={url}
                                    images={productData.img2}
                                    relatedProducts={relatedCarouseData && relatedCarouseData.items}
                                />
                            </div>
                            {
                                (!subPage && productData) &&
                                (
                                    <ProductDescription
                                        data={productData}
                                        onAddToCart={this.addToCart}
                                    />
                                )
                            }
                            {
                                subPage && subPage === 'specifications' && specifications &&
                                <div className="col-md-12">
                                    <ProductSpecification {...specifications}/>
                                </div>
                            }
                            {
                                subPage && subPage === 'comments' && comments &&
                                (
                                    <div className="col-md-12">
                                        <div className="product-card-tabs">
                                            <ProductCommentBlock
                                                title={comments.title} data={comments.data}
                                                changeFormField={comments.changeFormField}
                                            />
                                        </div>
                                    </div>
                                )

                            }
                            {
                                subPage && subPage === 'delivery' &&
                                <div className="col-md-12">
                                    <DeliveryAndPay title={productData.title} open/>
                                </div>

                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="accompanying-carousel-block">
                                {
                                    !subPage && relatedCarouseData &&
                                    (
                                        <Fragment>
                                            <h2 className="seal-lead">Сопутствующие товары:</h2>
                                            <SlickCarousel
                                                carouselData={relatedCarouseData}
                                            />
                                        </Fragment>
                                    )
                                }
                            </div>
                        </div>
                        <div className="col-md-12">
                            {
                                !subPage && specifications &&
                                (
                                    <ProductSpecification {...specifications}/>
                                )
                            }
                            {
                                !subPage && comments &&
                                (
                                    <div className="product-card-tabs">
                                        <ProductCommentBlock
                                            title={comments.title} data={comments.data}
                                            changeFormField={comments.changeFormField}
                                        />
                                    </div>
                                )
                            }
                            {!subPage && <DeliveryAndPay title={productData.title}/>}
                        </div>
                        <div className="col-md-12">
                            <div className="accompanying-carousel-block">
                                <h2 className="seal-lead">Похожие товары на Принтер фабрика печати Epson L132
                                    C11CE58403:</h2>
                                {
                                    relatedCarouseData &&
                                    (
                                        <SlickCarousel
                                            carouselData={relatedCarouseData}
                                        />
                                    )
                                }
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="accompanying-carousel-block">
                                <h2 className="seal-lead block-with-icon icon-eye">Недавно просмотренные товары:</h2>
                                {
                                    relatedCarouseData &&
                                    (
                                        <SlickCarousel
                                            carouselData={relatedCarouseData}
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
