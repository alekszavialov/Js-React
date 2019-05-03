import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Logo extends Component {

  static propTypes = {
    src: PropTypes.string,
    title: PropTypes.string,
    alt: PropTypes.string,
  };

  constructor(props) {
    super(props);

  }


  render() {
    return (
      <a href="index">
        <img src={this.props.src} alt={this.props.alt} title={this.props.title}/>
      </a>
    )
  }
}

