import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import { Field } from 'redux-form';

export default class Checkbox extends Component {

    static propTypes = {
        name: PropTypes.string
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
    }

    render() {
        const checkboxClass = this.state.isChecked ? 'check' : 'unchecked';
        return (
            <Fragment>
                <Field name={this.props.name}
                       value={this.props.name}
                       component="input"
                       type="checkbox"
                       checked={this.state.isChecked}/>
                <div className="custom-checkbox-container" onClick={this.toggleChange}>
                    <span className={`custom-checkbox-${checkboxClass}`}></span>
                    {this.props.name}
                </div>
            </Fragment>
        );
    }

}
