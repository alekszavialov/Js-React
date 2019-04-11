import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class TextInput extends Component {

  static propTypes = {
    inputText: PropTypes.string,
    onChange: PropTypes.func,
    onEnterKey: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleKey = this.handleKey.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  handleKey(e) {
    if (e.key === 'Enter') {
      this.props.onEnterKey();
    }
  }

  render() {
    return (
      <input type="text"
             className="col-sm-10 form-control"
             onChange={this.handleChange}
             value={this.props.inputText}
             onKeyDown={this.handleKey}
      />
    )
  }
}
