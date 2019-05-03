import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Select extends Component {

  static propTypes = {
    onFilter: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onFilter(e.target.value);
  }

  render() {
    return (
      <select className="col-sm-10 form-control form-control-lg" onChange={this.handleChange}>
        <option value="all">all</option>
        <option value="active">active</option>
        <option value="resolved">resolved</option>
      </select>
    )
  }
}
