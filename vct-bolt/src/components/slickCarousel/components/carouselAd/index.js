import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class CarouselAd extends Component {

    static propTypes = {
        item: PropTypes.object
    };

    render() {
        return (
            <NavLink to={this.props.item.url}>
                <img src={this.props.item.src} alt={this.props.item.text}/>
            </NavLink>
        );
    }

}
