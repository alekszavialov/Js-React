import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import SiteTabs from '../../../components/tabs';
import BreadCrumbs from '../../../components/breadCrumbs';
import SlickCarousel from '../../../components/slickCarousel';
import ItemCatalog from '../../../components/itemCatalog';
import SortForm from './SortForm';
import ShopTags from './shopTags';

export default class CatalogComponent extends Component {
    static propTypes = {
        productOptions: PropTypes.object,
        breadCrumbs: PropTypes.array,
        carouselAdData: PropTypes.object,
        shopTags: PropTypes.array,
        catalogItems: PropTypes.array,
        tabsData: PropTypes.object,
        carouselProductsData: PropTypes.object,
        onAddToCart: PropTypes.func,
        onLoadMoreProducts: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.loadMoreProducts = this.loadMoreProducts.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    loadMoreProducts(item) {
        this.props.onLoadMoreProducts(item);
    }

    addToCart(item) {
        this.props.onAddToCart(item);
    }

    render() {
        const {
            productOptions,
            breadCrumbs,
            carouselAdData,
            shopTags,
            catalogItems,
            tabsData,
            carouselProductsData
        } = this.props;
        return (
            <div className="container">
                <div className="bg-white">
                    <div className="row">
                        <div className="col-md-3">
                            {
                                productOptions &&
                                <SortForm
                                    sliderValues={productOptions.sliderValues}
                                    productParameters={productOptions.productParameters}
                                />
                            }
                        </div>
                        <div className="col-md-9">
                            {
                                breadCrumbs &&
                                <BreadCrumbs items={breadCrumbs}/>
                            }
                            {
                                carouselAdData &&
                                <SlickCarousel
                                    carouselData={carouselAdData}
                                />
                            }
                            {
                                shopTags &&
                                <ShopTags items={shopTags}/>
                            }
                            <div className="catalog-shop-blocks">
                                {
                                    catalogItems &&
                                    <Fragment>
                                        <ItemCatalog items={catalogItems} onAddToCart={this.addToCart}/>
                                        <div
                                            className="shop-blocks-load-more shop-block-buy"
                                            onClick={this.loadMoreProducts}
                                        >
                                            Загрузить еще
                                        </div>
                                    </Fragment>
                                }
                            </div>
                            <div className="product-card-tabs">
                                {
                                    tabsData &&
                                    <SiteTabs items={tabsData}/>
                                }
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="accompanying-carousel-block">
                                {
                                    carouselProductsData &&
                                    <Fragment>
                                        <h2 className="seal-lead block-with-icon icon-thumbs-up">Популярные позиции в
                                            категории:</h2>
                                        <SlickCarousel
                                            carouselData={carouselProductsData}
                                        />
                                    </Fragment>
                                }
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="accompanying-carousel-block">
                                {
                                    carouselProductsData &&
                                    <Fragment>
                                        <h2 className="seal-lead block-with-icon icon-thumbs-up">Недавно просмотренные
                                            товары:</h2>
                                        <SlickCarousel
                                            carouselData={carouselProductsData}
                                        />
                                    </Fragment>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
