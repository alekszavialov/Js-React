import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CatalogItem from './components/catalog/index';
import './styles.css';

export default class Catalog extends Component {

    static propTypes = {
        list: PropTypes.array,
        mobileList: PropTypes.bool
    };

    constructor(props) {
        super(props);

        this.state = {
            listItems: this.props.list
        };

        this.handleOpenList = this.handleOpenList.bind(this);
    }

    handleOpenList(id, active) {
        const newListItems = [...this.state.listItems].map(item => {
            if (item.active) {
                item.active = false;
            }
            return item;
        });
        newListItems[id] = active ? { ...newListItems[id], active: false } : { ...newListItems[id], active: true };
        this.setState({
            listItems: newListItems
        });
    }

    render() {
        return (
            <ul className="toggle-menu">
                {this.state.listItems.map((item, index) => {
                    return <CatalogItem
                        item={item}
                        id={index}
                        key={item.name + this.props.list.length}
                        isMobileList={this.props.mobileList === undefined ? false : this.props.mobileList}
                        handleOpenList={this.props.mobileList === undefined ? null : this.handleOpenList}
                    />;
                })}
            </ul>
        );
    }

}
