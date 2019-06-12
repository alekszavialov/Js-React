import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import './styles.css';

const maxElementsValue = 24;

export default class CatalogItem extends Component {

    static propTypes = {
        item: PropTypes.object,
        id: PropTypes.number,
        isMobileList: PropTypes.bool,
        handleOpenList: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.toggleMobileList = this.toggleMobileList.bind(this);
    }

    toggleMobileList() {
        this.props.handleOpenList(this.props.id, this.props.item.active === true);
    }

    fillEmptySpace = () => {
        let newList = this.props.item.items.map((item, index) =>
            <NavLink key={item.text + index} to={`/catalog-${item.text}`}>{item.text}</NavLink>
        );
        while (newList.length < maxElementsValue) {
            newList.push(<a key={newList.length} className="disabled"/>);
        }
        return newList;
    };

    render() {
        return (
            <li
                className={this.props.item.active ? 'shop-navigation-mobile-open' : null}
                onClick={this.props.handleOpenList === null ? null : this.toggleMobileList}
            >
                <span>{this.props.item.name}</span>
                <ul>
                    {this.fillEmptySpace()}
                </ul>
            </li>
        );
    }
}
