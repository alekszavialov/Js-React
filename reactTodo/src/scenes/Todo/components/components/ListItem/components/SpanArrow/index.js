import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class SpanArrow extends Component {

  static propTypes = {
    className: PropTypes.string,
    buttonFunction: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick(e) {
    e.stopPropagation();
    this.props.buttonFunction(this.props.className);
  }

  render() {
    return (
      <span
        className={this.props.className}
        onClick={this.handleButtonClick}/>
    )
  }
}
