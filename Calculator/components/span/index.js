import React, {Component, Fragment} from 'react';
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
      <Fragment>
        {this.props.calcValue ? <span>{this.props.calcValue}</span> : ''}
        <span>{this.props.value}</span>
      </Fragment>
    )

  }
}
