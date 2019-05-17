import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import { Field } from 'redux-form';

export default class Checkbox extends Component {

    static propTypes = {
        name: PropTypes.string,
        onChange: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            isChecked: false
        };

        this.toggleChange = this.toggleChange.bind(this);
    }

    toggleChange() {
        this.setState({ isChecked: !this.state.isChecked });
        this.props.onChange({ value: !this.state.isChecked === true ? this.props.name : null });
    }

    render() {
        const checkboxClass = this.state.isChecked ? 'check' : 'unchecked';
        return (
            <div className="custom-checkbox-container" onClick={this.toggleChange}>
                <span className={`custom-checkbox-${checkboxClass}`}/>
                {this.props.name}
            </div>
        );
    }

}
