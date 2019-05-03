import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class RemoveDiv extends Component {

  static propTypes = {
    buttonFunction: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick(e) {
    e.stopPropagation();
    this.props.buttonFunction();
  }

  render() {
    return (
      <div
        className="remove"
        onClick={this.handleButtonClick}/>
    )
  }
}
