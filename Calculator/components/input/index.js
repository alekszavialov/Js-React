import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Input extends Component {

  static propTypes = {
    value: PropTypes.string,
    class: PropTypes.string,
    handleClick: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleClick(this.props.value);
  }

  render() {
    return (
      <input
        type="submit"
        value={this.props.value}
        className={this.props.class}
        onClick={this.handleClick}
      />
    )
  }
}
