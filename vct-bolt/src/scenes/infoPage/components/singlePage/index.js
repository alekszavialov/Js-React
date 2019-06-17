import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

export default class SinglePAge extends Component {

    static propTypes = {
        singlePage: PropTypes.object
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { singlePage } = this.props;
        return (
            <div className="single-page-container">
                <h1>{singlePage.title}</h1>
                {singlePage.date && !singlePage.date.includes('0000') &&
                <span className="single-page-container-date block-with-icon icon-time">
                    {singlePage.date}
                </span>
                }
                <div dangerouslySetInnerHTML={{ __html: singlePage.text }}/>
            </div>
        );
    }

}