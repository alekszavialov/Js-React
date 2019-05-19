import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

import './styles.css';

export default class RangeSlider extends Component {

    static propTypes = {
        values: PropTypes.object,
        changeFormField: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            values: { min: this.props.values.min, max: this.props.values.max }
        };

        this.handleChange = this.handleChange.bind(this);
        this.changeFormField = this.changeFormField.bind(this);
    }

    changeFormField(){
        this.props.changeFormField({...this.state.values});
    }

    handleChange(event) {
        const value = event.target ? {[event.target.name]: Number(event.target.value.replace(/0+(?!$)/, ''))} : event;
        if (event.target){
            if (isNaN(value[event.target.name])){
                event.preventDefault();
                return;
            }
            if (value[event.target.name] < this.props.values.min || value[event.target.name] > this.props.values.max) {
                value[event.target.name] = this.props.values[event.target.name];
            }
        }
        this.setState({
            values: { ...this.state.values, ...value }
        }, () => this.changeFormField());
    }

    render() {
        const {values} = this.state;
        return (
            <div className="shop-sort-block">
                <div className="priceslider-head">
                    <p>Цена</p>
                    <span>от</span>
                    <input type="text" name="min" value={values.min} onChange={this.handleChange}/>
                    <span>до</span>
                    <input type="text" name="max" value={values.max} onChange={this.handleChange}/>
                </div>
                <InputRange
                    minValue={this.props.values.min}
                    maxValue={this.props.values.max}
                    value={values}
                    onChange={value => this.handleChange(value)}/>
            </div>
        );
    }
}

