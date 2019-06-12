import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './styles.css';

export default class Navigation extends Component {

    static propTypes = {
        navList: PropTypes.array
    };

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <ul>
                {this.props.navList.map(item =>
                    <li key={item.text + this.props.navList.length}><NavLink to={item.url}>{item.text}</NavLink></li>
                )
                }
            </ul>
        );
    }
}

