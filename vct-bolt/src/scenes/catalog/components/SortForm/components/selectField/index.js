import React, { Component } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

import './styles.css';

export default class SelectField extends Component {

    static propTypes = {
        orderValues: PropTypes.array,
        options: PropTypes.array,
        changeFormField: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            selectedOption: props.orderValues,
            options: props.options
        };


        this.options = [
            { value: 'title ASC', label: 'Название (а-я)' },
            { value: 'title DESC', label: 'Название (я-а)' },
            { value: 'views ASC', label: 'Просмотры (а-я)' },
            { value: 'views DESC', label: 'Просмотры (я-а)' },
            { value: 'sales ASC', label: 'Количество продаж (а-я)' },
            { value: 'sales DESC', label: 'Количество продаж (я-а)' },
            { value: 'nds ASC', label: 'Цене (а-я)' },
            { value: 'nds DESC', label: 'Цене (я-а)' },
        ];
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(selectedOption) {
        this.setState({ selectedOption }, () => {
            selectedOption.value ? this.props.changeFormField({ order: selectedOption.value }) : this.props.changeFormField({ ASCDESC: selectedOption.ASCDESC });
        });
    };

    render() {
        const { selectedOption, options } = this.state;
        return (
            <div className="shop-sort-block" style={{ overflow: 'visible' }}>
                <div className="priceslider-head">
                    <p>Сортировка по :</p>
                </div>
                <Select
                    classNamePrefix="react-select"
                    defaultValue={selectedOption}
                    onChange={this.handleChange}
                    options={options}
                    placeholder="Выберите тип"
                />
            </div>

        );
    }

}