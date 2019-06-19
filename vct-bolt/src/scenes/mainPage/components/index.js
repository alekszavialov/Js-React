import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import ItemCatalog from '../../../components/itemCatalog';
import SlickCarousel from '../../../components/slickCarousel';

export default class MainPageComponent extends Component {

    static propTypes = {
        carouselAdData: PropTypes.object,
        catalogItems: PropTypes.array,
        newProductsItems: PropTypes.object,
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
        const { carouselAdData, catalogItems, newProductsItems } = this.props;

        return (
            <Fragment>
                <div className="container-fluid max-container-width">
                    <div className="bg-white">
                        <div className="row">
                            {
                                carouselAdData &&
                                <div className="col-md-12">
                                    <SlickCarousel
                                        carouselData={carouselAdData}
                                    />
                                </div>
                            }
                            {
                                catalogItems &&
                                <div className="col-md-12">
                                    <h2 className="seal-lead">Популярные товары:</h2>
                                    <ItemCatalog items={catalogItems} onAddToCart={this.addToCart}/>
                                </div>
                            }
                            <div className="col-md-12">
                                {
                                    newProductsItems &&

                                    <div className="accompanying-carousel-block">
                                        <h2 className="seal-lead block-with-icon icon-thumbs-up">Новые
                                            товары:</h2>
                                        <SlickCarousel
                                            carouselData={newProductsItems}
                                        />
                                    </div>

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
