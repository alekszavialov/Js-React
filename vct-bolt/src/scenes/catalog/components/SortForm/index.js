import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import RangeSlider from './components/rangeSlider';
import ParametersBlock from './components/parametersBlock';

import './styles.css';

class SortForm extends Component {

    static propTypes = {
        sliderValues: PropTypes.object,
        productParameters: PropTypes.array
    };

    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        console.log(e);
    }

// <div className="shop-sort-block">
// <RangeSlider values={this.props.sliderValues}/>
// </div>
// {this.props.productParameters.map((item, index) =>
// <div className="shop-sort-block" key={index}>
// <ParametersBlock items={item} id={index}/>
// </div>
// )}

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Field
                    name="firstName"
                    component="input"
                    type="text"
                    placeholder="First Name"
                />
                <Field
                    name="lastName"
                    component="input"
                    type="text"
                    placeholder="Last Name"
                />
                <Field
                    name="employed"
                    component="input"
                    type="checkbox"
                />
                <Field
                    name="employed1"
                    component="input"
                    type="checkbox"
                />
                <button type="submit" title="Применить текущие параметры" className="shop-block-buy">Применить</button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'sortData'
})(SortForm);
