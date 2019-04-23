import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Span extends Component {

  static propTypes = {
    value: PropTypes.string,
    calcValue: PropTypes.string
  };

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <span>{this.props.calcValue ? this.props.calcValue + <br/> : ''}{this.props.value}</span>
    )
  }
}
