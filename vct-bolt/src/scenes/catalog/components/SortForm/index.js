import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RangeSlider from './components/rangeSlider';
import ParametersBlock from './components/parametersBlock';

import './styles.css';

export default class SortForm extends Component {

    static propTypes = {
        sliderValues: PropTypes.object,
        productParameters: PropTypes.array,
        changeFormField: PropTypes.func,
        submitForm: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.changeFormField = this.changeFormField.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    changeFormField(data) {
        this.props.changeFormField(data);
    }

    submitForm(e) {
        e.preventDefault();
        this.props.submitForm();
    }

    render() {
        const { sliderValues, productParameters } = this.props;
        return (
            <form onSubmit={this.submitForm}>
                <RangeSlider values={sliderValues} changeFormField={this.changeFormField}/>
                {productParameters.map((item, index) =>
                    <div className="shop-sort-block" key={item.name + index}>
                        <ParametersBlock
                            items={item}
                            onChange={this.handleChange}
                            changeFormField={this.changeFormField}/>
                    </div>
                )}
                <button type="submit" className="shop-block-buy">Применить</button>
            </form>
        );
    }
}

