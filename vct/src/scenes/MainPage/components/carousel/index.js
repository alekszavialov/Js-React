import React, { Component } from 'react';
import PropTypes from 'prop-types'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import './styles.css'

export default class CarouselElement extends Component {

  static propTypes = {
    items: PropTypes.array
  };

  constructor(props){
    super(props)
  }

  render() {
    return (
      <Carousel autoPlay showStatus={false} showThumbs={false} infiniteLoop emulateTouch>
        {this.props.items.map(item =>
          <div key={item.name + this.props.length}>
            <a href={item.url}>
              <img src={item.src} alt={item.text}/>
            </a>
          </div>
        )}
      </Carousel>
    );
  }
}
