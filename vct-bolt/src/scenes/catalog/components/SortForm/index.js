import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RangeSlider from './components/rangeSlider';
import ParametersBlock from './components/parametersBlock';
import SelectField from './components/selectField';

import './styles.css';

export default class SortForm extends Component {

    static propTypes = {
        sliderValues: PropTypes.object,
        orderValues: PropTypes.object,
        productParameters: PropTypes.array,
        changeFormField: PropTypes.func,
        submitForm: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.options = [
            { order: 'title ASC', label: 'Название (а-я)' },
            { order: 'title DESC', label: 'Название (я-а)' },
            { order: 'views ASC', label: 'Просмотры (а-я)' },
            { order: 'views DESC', label: 'Просмотры (я-а)' },
            { order: 'sales ASC', label: 'Количество продаж (а-я)' },
            { order: 'sales DESC', label: 'Количество продаж (я-а)' },
            { order: 'nds ASC', label: 'Цене (а-я)' },
            { order: 'nds DESC', label: 'Цене (я-а)' },
        ];

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
        const { sliderValues, productParameters, orderValues } = this.props;
        const selectActiveValue = orderValues ?
            this.options.filter(item => item.order === orderValues.order) : null;
        return (
            <form onSubmit={this.submitForm}>
                <SelectField
                    orderValues={selectActiveValue}
                    options={this.options}
                    changeFormField={this.changeFormField}
                />
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

