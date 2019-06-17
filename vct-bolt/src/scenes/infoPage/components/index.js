import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NewList from './newsList';
import SinglePage from './singlePage';

export default class PageComponent extends Component {

    static propTypes = {
        singlePage: PropTypes.array,
        newList: PropTypes.array
    };

    constructor(props) {
        super(props);

        this.state = {
            test: '123'
        };
    }

    render() {
        const { singlePage, newList } = this.props;
        return (
            <div className="container-fluid max-container-width">
                <div className="row">
                    <div className="col-md-12">
                        {
                            newList &&
                            <NewList
                                newList={newList}
                            />
                        }
                        {
                            singlePage &&
                            <SinglePage singlePage={singlePage[0]}/>
                        }
                    </div>
                </div>
            </div>
        );
    }
}