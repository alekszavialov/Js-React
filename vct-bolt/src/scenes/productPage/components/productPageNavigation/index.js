import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import './styles.css';

export default class ProductPageNavigation extends Component {

    static propTypes = {
        url: PropTypes.string,
        images: PropTypes.string,
        relatedProducts: PropTypes.array
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { url, images, relatedProducts } = this.props;
        return (
            <ul className="product-page-navigation">
                <li key="mainPage">
                    <NavLink exact to={`/product${url}`}>Полное описание</NavLink>
                </li>
                <li key="specifications">
                    <NavLink to={`/product${url}/specifications`}>Характеристики</NavLink>
                </li>
                {images &&
                <li key="images">
                    <NavLink to={`/product${url}/images`}>Изображения</NavLink>
                </li>
                }
                <li key="comments">
                    <NavLink to={`/product${url}/comments`}>Отзывы</NavLink>
                </li>
                {relatedProducts &&
                <li key="related">
                    <NavLink to={`/product${url}/related`}>Сопутствующие товары</NavLink>
                </li>
                }
                <li key="delivery">
                    <NavLink to={`/product${url}/delivery`}>Доставка и оплата</NavLink>
                </li>
            </ul>
        );
    }

}