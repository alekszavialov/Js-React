import React, { Component } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';

import CarouselProduct from './components/carouselProduct';
import CarouselAd from './components/carouselAd';

import 'slick-carousel/slick/slick.css';
import './styles.css';

export default class SlickCarousel extends Component {
    static propTypes = {
        carouselData: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.fillItems = this.fillItems.bind(this);
    }


    fillItems() {
        return this.props.carouselData.items ? this.props.carouselData.items.map(item =>
            this.props.carouselData.onAddToCart ?
                <CarouselProduct
                    key={Math.random()}
                    item={item}
                    onAddToCart={this.props.carouselData.onAddToCart}
                /> :
                <CarouselAd
                    key={Math.random()}
                    item={item}
                />
        ) : this.props.carouselData.images;
    }

    render() {
        const { params } = this.props.carouselData;
        return (
            this.props.carouselData &&
            <Slider {...params}>
                {this.fillItems()}
            </Slider>
        );
    }
}