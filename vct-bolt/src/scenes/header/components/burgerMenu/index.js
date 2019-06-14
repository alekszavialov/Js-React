import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { slide as Menu } from 'react-burger-menu';

import './styles.css';

export default class BurgerMenu extends Component {

    static propTypes = {
        list: PropTypes.array,
        isOpen: PropTypes.bool,
        toggleMobileList: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            list: props.list.map(item => {return {...item, active: false}})
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleActiveItem = this.handleActiveItem.bind(this);
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.isOpen !== this.props.isOpen){
            this.setState({isOpen: nextProps.isOpen});
            return true;
        }
        return false;
    }

    handleChange(state) {
        this.props.toggleMobileList(state.isOpen);
    };

    handleClose() {
        this.props.toggleMobileList();
    };

    handleActiveItem(e, index) {
        const newList = this.state.list.map((item, itemIndex) => {
            return itemIndex === index && !item.active ? {...item, active: true} : {...item, active: false};
        });
        this.setState({
            list: newList
        });
    };

    render() {
        return (
            <Menu isOpen={this.state.isOpen} onStateChange={this.handleChange}>
                <ul>
                    {this.state.list.map((item, index) => {
                        return (
                            <li
                                className={item.active ? `active` : ''}
                                key={item.name + index}
                                onClick={(e) => this.handleActiveItem(e, index)}
                            >
                                <span>{item.name}</span>
                                <ul>
                                    {item.items.map((object, objectIndex) => {
                                        return (
                                            <NavLink
                                                key={object.text + objectIndex}
                                                to={`/catalog-${object.text}`}>
                                                {object.text}
                                            </NavLink>
                                        );
                                    })}
                                </ul>
                            </li>
                        );
                    })}
                </ul>
            </Menu>
        );
    }

}