import React, {Component} from 'react'
import {NavLink} from "react-router-dom";
import PropTypes from 'prop-types'

export default class CarouselBigItem extends Component {

  static propTypes = {
    item: PropTypes.object
  };

  render() {
    return (
      <div>
        <NavLink to={this.props.item.url}>
          <img src={this.props.item.src} alt={this.props.item.text}/>
        </NavLink>
      </div>
    )
  }

}
