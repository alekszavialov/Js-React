import React, { Component } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
// import './styles.css';

export default class ImageCarousel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            params: {
                'dots': true,
                'arrows': false,
                'infinite': true,
                'autoplay': true,
                'autoplaySpeed': 6000,
                'speed': 500,
                'slidesToShow': 1,
                'slidesToScroll': 1,
                'pauseOnHover': true
            }
        };
    }

    render() {
        const { images } = this.props;
        console.log(images);
        return (
            <Slider {...this.state.params}>
                {images.filter(item => item).map(item => <img src={item} alt=""/>)}
            </Slider>
        );
    }
}