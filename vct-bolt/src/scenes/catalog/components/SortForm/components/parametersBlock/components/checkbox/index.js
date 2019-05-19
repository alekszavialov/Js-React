import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

export default class Checkbox extends Component {

    static propTypes = {
        name: PropTypes.string,
        value: PropTypes.string,
        changeFormField: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            isChecked: false
        };

        this.toggleCheck = this.toggleCheck.bind(this);
        this.changeFormField = this.changeFormField.bind(this);
    }

    changeFormField() {
        const {name} = this.props;
        const {isChecked} = this.state;
        let data;
        if (isChecked){
            data = {[name]: isChecked};
        } else {
            data = {remove: name};
        }
        this.props.changeFormField(data);
    }

    toggleCheck() {
        this.setState({
            isChecked: !this.state.isChecked
        }, () => this.changeFormField());
    }

    render() {
        const {isChecked} = this.state;
        const {name, value} = this.props;
        const checkboxClass = isChecked ? 'check' : 'unchecked';
        return (
            <div className="custom-checkbox-container" onClick={this.toggleCheck}>
                <span className={`custom-checkbox-${checkboxClass}`}/>
                <input type="checkbox" name={name} checked={isChecked} onChange={this.toggleCheck} />
                {value}
            </div>
        );
    }

}
