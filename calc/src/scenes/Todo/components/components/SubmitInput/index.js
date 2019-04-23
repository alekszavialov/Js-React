import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class SubmitInput extends Component {

  static propTypes = {
    value: PropTypes.string,
    buttonFunction: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick(e, id = false) {
    this.props.buttonFunction(id);
  }

  render() {
    return (
      <input
        type="submit"
        className="col-sm-2 btn btn-primary"
        value={this.props.value}
        onClick={this.handleButtonClick}/>
    )
  }
}
