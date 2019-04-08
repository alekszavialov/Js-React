import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class TextInput extends Component {

  static propTypes = {
    onChange: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <input type="text" className="form-control add-todo" onChange={this.handleChange}/>
    )
  }
}
