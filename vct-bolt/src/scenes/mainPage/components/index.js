import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import ItemCatalog from '../../../components/itemCatalog';
import SiteTabs from '../../../components/tabs';
import PopularCategoriesItems from './popularCategoriesItems';
import SlickCarousel from '../../../components/slickCarousel';

export default class MainPageComponent extends Component {

    static propTypes = {
        carouselAdData: PropTypes.object,
        popularItemsData: PropTypes.array,
        catalogItems: PropTypes.array,
        carouselProductsData: PropTypes.object,
        tabItems: PropTypes.object,
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
        const { carouselAdData, popularItemsData, catalogItems, carouselProductsData, tabItems } = this.props;

        return (
            <Fragment>
                <div className="container">
                    <div className="bg-white">
                        <div className="row">
                            <div className="col-md-12">
                                {
                                    carouselAdData &&
                                    <SlickCarousel
                                        carouselData={carouselAdData}
                                    />
                                }
                            </div>
                            <div className="col-md-12">
                                {
                                    popularItemsData &&
                                    <Fragment>
                                        <h2 className="seal-lead">Популярные категории товаров:</h2>
                                        <PopularCategoriesItems items={popularItemsData}/>
                                    </Fragment>
                                }
                            </div>
                            <div className="col-md-12">
                                {
                                    catalogItems &&
                                    <Fragment>
                                        <h2 className="seal-lead">Популярные товары:</h2>
                                        <ItemCatalog items={catalogItems} onAddToCart={this.addToCart}/>
                                    </Fragment>
                                }
                            </div>
                            <div className="col-md-12 accompanying-carousel-block">
                                {
                                    carouselProductsData &&
                                    <Fragment>
                                        <h2 className="seal-lead">Новые товары в интернет магазине:</h2>
                                        <div className="accompanying-carousel-block-wrapper">
                                            <SlickCarousel
                                                carouselData={carouselProductsData}
                                            />
                                        </div>
                                    </Fragment>
                                }
                            </div>
                            <div className="col-md-12">
                                {
                                    tabItems &&
                                    <SiteTabs items={tabItems}/>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-shop">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="about-corp trophy">
                                    <h3>20 лет на рынке IT в Украине</h3>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="about-corp certificate">
                                    <h3>Cертифицированный товар</h3>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="about-corp cogs">
                                    <h3>Идеальное обслуживание</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
