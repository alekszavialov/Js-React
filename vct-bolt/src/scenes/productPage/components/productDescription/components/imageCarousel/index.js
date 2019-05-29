import React, { Component } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import './styles.css';

export default class ImageCarousel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            params: {
                'dots': true,
                'infinite': true,
                'autoplay': true,
                'autoplaySpeed': 6000,
                'dotsClass': "slick-dots-images",
                'speed': 500,
                'slidesToShow': 1,
                'slidesToScroll': 1,
                'pauseOnHover': true,
            }
        };
    }

    render() {
        const images = this.props.images.filter(item => item);
        const settings = {
            customPaging(item) {
                return (
                    <img key={images[item] + item} src={images[item]} alt=""/>
                );
            }
        };
        return (

            <Slider {...settings} {...this.state.params}>
                {images.map(item => <img key={item} src={item} alt=""/>)}
            </Slider>
        );
    }
}