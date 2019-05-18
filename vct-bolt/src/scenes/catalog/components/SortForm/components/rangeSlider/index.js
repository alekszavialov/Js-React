import React, { Component, Fragment } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

import './styles.css';
import cartOrderFormValidator from '../../../../../../modules/cartOrderFormValidator';
import RenderField from '../../../../../header/components/modalCart/components/cartOrderForm/components/renderField';

export default class RangeSlider extends Component {

    static propTypes = {
        values: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            value: { min: this.props.values.min, max: this.props.values.max }
        };

        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(name, event) {
        let value = Number(event.target.value.replace(/0+(?!$)/, ''));
        if (isNaN(value)){
            event.preventDefault();
            return;
        }
        if (value < this.props.values.min || value > this.props.values.max) {
            value = this.props.values[name];
        }
        this.setState({
            value: { ...this.state.value, [name]: value }
        });
    }

    render() {
        return (
            <Fragment>
                <div className="priceslider-head">
                    <p>Цена</p>
                    <span>от</span>

                    <Field
                        name="priceMin"
                        component="input"
                        type="text"
                        props={{value: this.state.value.min}}
                        onChange={this.handleChange.bind(this, 'min')}
                    />
                    <span>до</span>
                    <Field
                        name="priceMax"
                        component="input"
                        type="text"
                        props={{value: this.state.value.max}}
                        onChange={this.handleChange.bind(this, 'max')}
                    />
                </div>
                <InputRange
                    maxValue={this.props.values.max}
                    minValue={this.props.values.min}
                    value={this.state.value}
                    onChange={value => this.setState({ value })}/>
            </Fragment>
        );
    }
}

