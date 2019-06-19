import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getData, clearData } from '../../data/Data/actions';

import './styles.css';

import PageComponent from './components';

class InfoPage extends Component {

    static propTypes = {
        onClearData: PropTypes.func,
        onGetData: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            singlePage: null,
            newList: null
        };
        this.baseState = this.state;

        this.loadDataAPI = this.loadDataAPI.bind(this);
    }

    componentDidMount() {
        this.props.onClearData('page');
        const params = this.props.match.params.pageName;
        this.loadDataAPI(params);

    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            this.setState(this.baseState);
            this.props.onClearData('page');
            const params = nextProps.match.params.pageName;
            this.loadDataAPI(params);
        }
        const data = nextProps.data && nextProps.data.page;
        if (!data) {
            return false;
        }
        if (!this.props.data || !this.props.data.page || this.props.data.page[0].id !== data[0].id) {
            document.title = data.length > 1 ? 'Новости' : data[0].title;
            if (data.length > 1) {
                this.setState({
                    newList: data
                });
            } else {
                this.setState({
                    singlePage: data
                });
            }
        }
        return true;
    }

    loadDataAPI(params) {
        let query = null;
        if (params) {
            query = params.split('-')[1];
        }
        this.props.onGetData(
            'page',
            'http://api.vct1.com/page/',
            'page',
            query
        );
    }

    render() {
        const { singlePage, newList } = this.state;
        if (!singlePage && !newList){
            return(
                <div className="loader"/>
            );
        }
        return (
            <PageComponent
                singlePage={singlePage}
                newList={newList}
            />
        );
    }

}

const mapStateToProps = (state) => {
    return {
        data: state.Data['page']
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetData: (id, url, name, params) => dispatch(getData(id, url, name, params)),
        onClearData: (id) => dispatch(clearData(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoPage);