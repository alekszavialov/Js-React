import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import RangeSlider from './components/rangeSlider';
import ParametersBlock from './components/parametersBlock';
import RenderField from './components';

import './styles.css';

class SortForm extends Component {

    static propTypes = {
        sliderValues: PropTypes.object,
        productParameters: PropTypes.array
    };

    constructor(props) {
        super(props);


        this.state = {
            sortData: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log();
    }

    handleChange(data) {
        // this.setState({
        //     sortData: [...this.state.sortData, data]
        // });
        // console.log(this.state.sortData);
    }



    render() {
        const { sliderValues, productParameters } = this.props;
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="shop-sort-block">
                    <RangeSlider values={sliderValues}/>
                </div>
                {productParameters.map((item, index) =>
                    <div className="shop-sort-block" key={index}>
                        <ParametersBlock items={item} onChange={this.handleChange}/>
                    </div>
                )}
                <button type="submit" className="shop-block-buy">Применить</button>
            </form>
        );
    }
}

SortForm = reduxForm({
    form: 'SortForm'
})(SortForm);

export default SortForm;

