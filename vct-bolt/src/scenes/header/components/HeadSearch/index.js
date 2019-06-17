import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import './styles.css';

export default class HeadSearch extends Component {

    static propTypes = {
        list: PropTypes.array,
        handleChangeSearch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const text = e.target.value.trim();
        if (text.length >= 3) {
            this.props.handleChangeSearch(text);
        }
    }

    render() {
        return (
            <form method="GET">
                <input type="text" placeholder="Поиск" onChange={this.handleChange} required/>
                {
                    this.props.list &&
                    <div className="search-results">
                        <ul>
                            {this.props.list.map(item => {
                                return (
                                    <li key={item.title}>
                                        <NavLink to={item.url} title={item.title}>
                                            <div className="search-results-image-wrapper">
                                                <img
                                                    src={item.img}
                                                    alt={`Изображение ${item.title}`}
                                                />
                                            </div>
                                            <p>{item.title}</p>
                                            <span>{item.price} грн</span>
                                        </NavLink>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                }

            </form>
        );
    }
}

