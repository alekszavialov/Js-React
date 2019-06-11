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
            values: {
                min: props.values.options.currentMin ? props.values.options.currentMin : props.values.options.min,
                max: props.values.options.currentMax ? props.values.options.currentMax : props.values.options.max
            },
            name: props.values.name
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.changeFormField = this.changeFormField.bind(this);
    }

    changeFormField() {
        this.props.changeFormField({ ...this.state.values });
    }

    handleBlur() {
        const { values } = this.state;
        const { options } = this.props.values;
        let correctData = {};
        if (values.min < options.min || values.min > options.max) {
            correctData = { min: options.min };
        }
        if (values.max > options.max || values.max < options.min) {
            correctData = { max: options.max };
        }
        if (Object.entries(correctData).length === 0) {
            this.changeFormField();
        } else {
            this.setState({
                values: { ...values, ...correctData }
            });
        }
    }

    handleChange(event) {
        const value = event.target ? { [event.target.name]: Number(event.target.value.replace(/0+(?!$)/, '')) } : event;
        if (event.target) {
            if (isNaN(value[event.target.name])) {
                event.preventDefault();
                return;
            }
        }
        this.setState({
            values: { ...this.state.values, ...value }
        });
    }

    render() {
        const { values } = this.state;
        return (
            <div className="shop-sort-block">
                <div className="priceslider-head">
                    <p>Цена</p>
                    <span>от</span>
                    <input type="text" name="min" value={values.min} onChange={this.handleChange}
                           onBlur={this.handleBlur}/>
                    <span>до</span>
                    <input type="text" name="max" value={values.max} onChange={this.handleChange}
                           onBlur={this.handleBlur}/>
                </div>
                <InputRange
                    minValue={this.props.values.options.min}
                    maxValue={this.props.values.options.max}
                    value={{ min: values.min, max: values.max }}
                    onChange={value => this.handleChange(value)}
                    onChangeComplete={this.changeFormField}
                />
            </div>
        );
    }
}

