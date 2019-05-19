import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RangeSlider from './components/rangeSlider';
import ParametersBlock from './components/parametersBlock';

import './styles.css';

class SortForm extends Component {

    static propTypes = {
        sliderValues: PropTypes.object,
        productParameters: PropTypes.array,
        changeFormField: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeFormField = this.changeFormField.bind(this);
    }

    changeFormField(data){
        this.props.changeFormField(data);
    }

    handleSubmit(e) {
        e.preventDefault();

        console.log();
    }

    render() {
        const { sliderValues, productParameters } = this.props;
        return (
            <form onSubmit={this.handleSubmit}>
                <RangeSlider values={sliderValues} changeFormField={this.changeFormField}/>
                {productParameters.map((item, index) =>
                    <div className="shop-sort-block" key={index}>
                        <ParametersBlock items={item} onChange={this.handleChange} changeFormField={this.changeFormField}/>
                    </div>
                )}
                <button type="submit" className="shop-block-buy">Применить</button>
            </form>
        );
    }
}

export default SortForm;

