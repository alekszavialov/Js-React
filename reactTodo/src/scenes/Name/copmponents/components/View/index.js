import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class View  extends Component {
  static propTypes = {
    children: PropTypes.any,
    count: PropTypes.string
  };

  render(){
    return(
      <span>{this.props.count}{this.props.children}</span>
    )
  }
}
