import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class NavItem extends Component {

  static propTypes = {
    text: PropTypes.string,
    url: PropTypes.string
  };

  constructor(props) {
    super(props);
  }



  render() {
    return (
      <li><a href={this.props.url}>{this.props.text}</a></li>
    )
  }
}
