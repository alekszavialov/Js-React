import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ItemText extends Component {

  static propTypes = {
    text: PropTypes.string,
    onChangeItemText: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.handleChangeItemText = this.handleChangeItemText.bind(this);
  }

  handleChangeItemText(e) {
    e.stopPropagation();
    this.props.onChangeItemText(e.target);
  }

  render() {
    return (
      <h6
        onClick={this.handleChangeItemText}
        onBlur={this.handleChangeItemText}
      >
        {this.props.text}
      </h6>
    )
  }
}
