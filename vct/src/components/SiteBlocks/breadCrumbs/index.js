import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {NavLink} from "react-router-dom";

import './styles.css'

export default class BreadCrumbs extends Component {

  static propTypes = {
    items: PropTypes.array
  };

  constructor(props) {
    super(props)
  }

  createBreadCrumbs = () => {
    return this.props.items.map((item, index) => {
      return (
        <span key={index + Math.random()}>
          {index === this.props.items.length-1 ? item.name : (<NavLink to={item.href}>{item.name}</NavLink>)}
        </span>
      )
    });
  };

  render() {
    return (
      <div className="bread-crumbs">
        {this.createBreadCrumbs()}
      </div>
    )
  }

}

