import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ShoppingCart extends Component {

  static propTypes = {
    img: PropTypes.string,
    alt: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.number
  };

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <a href="#">
        <img src={this.props.src} alt={this.props.alt} title={this.props.title}/>
        <span>{this.props.value} шт.</span>
      </a>
    )
  }
}

