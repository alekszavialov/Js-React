import React, { Component } from 'react';
import PropTypes from 'prop-types'

import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

import './styles.css'

export default class CarouselElement extends Component {

  static propTypes = {
    items: PropTypes.array,
    params: PropTypes.object
  };

  constructor(props){
    super(props)

  }

  render() {
    return (
      <AliceCarousel
        items={[...this.props.items]}
        {...this.props.params}
      />
    );
  }


}
