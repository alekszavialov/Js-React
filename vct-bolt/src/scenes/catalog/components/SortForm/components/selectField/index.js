import React, { Component } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

export default class SelectField extends Component {

    static propTypes = {
        changeFormField: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            selectedOption: null
        };
        this.options = [
            { order: 'title', label: 'Название' },
            { order: 'nds', label: 'Цена' },
            { order: 'views', label: 'Просмотры' },
            { order: 'sales', label: 'Продажи' },
            { ASCDESC: 'ASC', label: 'Возрастанию цены' },
            { ASCDESC: 'DESC', label: 'Убыванию цены' }
        ];
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(selectedOption) {
        this.setState({ selectedOption }, () => {
            selectedOption.order ? this.props.changeFormField({ order: selectedOption.order }) : this.props.changeFormField({ ASCDESC: selectedOption.ASCDESC });
        });
    };

    render() {
        const { selectedOption } = this.state;
        return (
            <div className="shop-sort-block" style={{ overflow: 'visible' }}>
                <div className="priceslider-head">
                    <p>Сортировка по :</p>
                </div>
                <Select
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={this.options}
                    placeholder="Выберите тип"
                />
            </div>

        );
    }

}