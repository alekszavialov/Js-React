import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class View  extends Component {
  static propTypes = {
    children: PropTypes.any,
  };
  render(){
    return(
      <span>{this.props.children}</span>
    )
  }
}
