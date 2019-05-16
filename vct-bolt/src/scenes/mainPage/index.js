import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MainPageComponent from './components';

import { addToCart } from '../../data/Store/actions';

// import fetchApi from '../../modules/fetch-api';

import './styles.css';

class MainPage extends Component {

    static propTypes = {
        onAddToCart: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            carouselAdData: null,
            carouselProductsData: null,
            popularItemsData: null,
            catalogItems: null,
            tabItems: null
        };

        this.addToCart = this.addToCart.bind(this);
    }

    componentDidMount() {
        Promise.all([
            this.loadCarouselData(),
            this.loadPopularItemsData(),
            this.loadCatalogItemsData(),
            this.loadCarouselItems(),
            this.loadPageTabItems()
        ]).then(() => this.setState({ loading: false }));
    }

    loadCarouselData = () => {
        // fetchApi('../../fakeAPI/carouselOneItemData.json')
        //     .then(result => this.setState({
        //             carouselData: {
        //                 ...result, items: result.items.map(item =>
        //                     <CarouselBigItem item={item} key={Math.random()}/>
        //                 )
        //             }
        //         }
        //     ));
        const result = require('../../fakeAPI/carouselOneItemData.json');
        this.setState(
            {
                carouselAdData: result
            }
        );
    };

    loadPopularItemsData = () => {
        // fetchApi('../../fakeAPI/mainPopularCategoriesItems.json')
        //     .then(result => this.setState({
        //             popularItemsData: result
        //         }
        //     ));

        const result = require('../../fakeAPI/mainPopularCategoriesItems.json');
        this.setState(
            {
                popularItemsData: result
            }
        );
    };

    loadCatalogItemsData = () => {
        // fetchApi('../../fakeAPI/catalogItems.json')
        //     .then(result => this.setState({
        //             catalogItems: result
        //         }
        //     ));

        const result = require('../../fakeAPI/catalogItems.json');
        this.setState(
            {
                catalogItems: result
            }
        );
    };

    loadCarouselItems = () => {
        // fetchApi('../../fakeAPI/carouselManyItemsData.json')
        //     .then(result => this.setState({
        //         carouselItemsData: {
        //             ...result,
        //             items: result.items.map(item =>
        //                 <CarouselSmallItem item={item} onAddToCart={this.addToCart} key={Math.random()}/>
        //             )
        //         }
        //     }));

        const result = require('../../fakeAPI/carouselManyItemsData.json');
        this.setState(
            {
                carouselProductsData: {
                    ...result,
                    onAddToCart: this.addToCart
                }
            }
        );
    };

    loadPageTabItems = () => {
        // fetchApi('../../fakeAPI/mainPageTabsData.json')
        //     .then(result => this.setState({
        //             tabItems: {
        //                 ...result, items: result.items.map(item =>
        //                     (item.map(item =>
        //                         <div className="tabs-item" key={Math.random()}>
        //                             <div className="tabs-item-image">
        //                                 <NavLink to={item.href}>
        //                                     <img src={item.src} alt=""/>
        //                                 </NavLink>
        //                             </div>
        //                             <div className="tabs-item-content">
        //                                 <h3>
        //                                     <NavLink to={item.href}>
        //                                         {item.name}
        //                                     </NavLink>
        //                                 </h3>
        //                                 <span>{item.date}</span>
        //                                 <p>{item.text}</p>
        //                             </div>
        //                         </div>
        //                     ))
        //                 )
        //             }
        //         }
        //     ));

        const result = require('../../fakeAPI/mainPageTabsData.json');
        this.setState({
                tabItems: {
                    ...result, items: result.items.map(item =>
                        (item.map(item =>
                            <div className="tabs-item" key={Math.random()}>
                                <div className="tabs-item-image">
                                    <NavLink to={item.href}>
                                        <img src={item.src} alt=""/>
                                    </NavLink>
                                </div>
                                <div className="tabs-item-content">
                                    <h3>
                                        <NavLink to={item.href}>
                                            {item.name}
                                        </NavLink>
                                    </h3>
                                    <span>{item.date}</span>
                                    <p>{item.text}</p>
                                </div>
                            </div>
                        ))
                    )
                }
            }
        );
    };

    addToCart(item) {
        this.props.onAddToCart(item);
    }

    render() {
        const {
            carouselAdData,
            popularItemsData,
            catalogItems,
            carouselProductsData,
            tabItems
        } = this.state;
        return (
            <MainPageComponent
                carouselAdData={carouselAdData}
                popularItemsData={popularItemsData}
                catalogItems={catalogItems}
                carouselProductsData={carouselProductsData}
                tabItems={tabItems}
                onAddToCart={this.addToCart}
            />
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddToCart: (item) => dispatch(addToCart(item))
    };
};

export default connect(null, mapDispatchToProps)(MainPage);
