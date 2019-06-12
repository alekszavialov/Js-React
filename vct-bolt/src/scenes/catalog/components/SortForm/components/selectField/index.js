import React, { Component } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

export default class SelectField extends Component {

    static propTypes = {
        orderValues: PropTypes.object,
        options: PropTypes.array,
        changeFormField: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            selectedOption: props.orderValues,
            options: props.options
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(selectedOption) {
        this.setState({ selectedOption }, () => {
            selectedOption.order ? this.props.changeFormField({ order: selectedOption.order }) : this.props.changeFormField({ ASCDESC: selectedOption.ASCDESC });
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
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={options}
                    placeholder="Выберите тип"
                />
            </div>

        );
    }

}