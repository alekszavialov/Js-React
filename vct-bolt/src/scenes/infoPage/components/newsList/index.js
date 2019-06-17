import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import './styles.css';

export default class NewsList extends Component {

    static propTypes = {
        newList: PropTypes.array
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { newList } = this.props;
        return (
            <Fragment>
                <ul className="news-list">
                    {newList.map(item => {
                        return (
                            <li>
                                <div className="news-list-image-wrapper">
                                    <NavLink to={item.url}>
                                        <img src={item.img} alt={item.title}/>
                                    </NavLink>
                                </div>
                                <div className="news-list-details">
                                    <h3>
                                        <NavLink to={item.url}>
                                            {item.title}
                                        </NavLink>
                                    </h3>
                                    <div className="news-list-date block-with-icon icon-time">
                                        {item.date}
                                    </div>
                                    <span>
                                        {item.description}
                                    </span>
                                </div>
                            </li>
                        );
                    })};
                </ul>
            </Fragment>

        );
    }

}