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
            isOpen: false
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
        console.log('state change');
        console.log(state);
        if (!state.isOpen) {
        //    this.props.toggleMobileList();
        }
    };

    handleClose() {
        this.props.toggleMobileList();
    };

    handleActiveItem(e) {
        e.stopPropagation();
        e.preventDefault();
        console.log(e.target.parentNode.classList.toggle('active'));
    };

    render() {
        console.log(this.state.isOpen);
        console.log('isOpem');
        return (
            <Menu isOpen={this.state.isOpen} onStateChange={this.handleChange}>
                <ul>
                    {this.props.list.map((item, index) => {
                        return (
                            <li key={item.name + index} onClick={this.handleActiveItem}>
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