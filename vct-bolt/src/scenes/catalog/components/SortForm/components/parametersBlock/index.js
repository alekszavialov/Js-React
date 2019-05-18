import React, { Component, Fragment } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

import Checkbox from './components/checkbox';

import './styles.css';

export default class ParametersBlock extends Component {

    static propTypes = {
        items: PropTypes.object,
    };

    constructor(props) {
        super(props);

        this.state = {
            isActive: window.innerWidth >= 992
        };

        this.toggleChange = this.toggleChange.bind(this);
        this.updateIsMobile = this.updateIsMobile.bind(this);
    }

    toggleChange() {
        this.setState({ isActive: !this.state.isActive });
    }

    updateIsMobile() {
        this.setState({
            isActive: window.innerWidth >= 992
        });
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateIsMobile);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateIsMobile);
    }

    render() {
        const checkboxClass = this.state.isActive ? 'active' : '';
        const { items } = this.props;
        console.log(items);
        return (
            <Fragment>
                <span className={`parameters-block-head ${checkboxClass}`} onClick={this.toggleChange}>
                    {items.head}
                </span>
                <ul className={checkboxClass}>
                    {items.options.map(
                        (item, index) => {
                            const itemID = `option${  items.name  }${  index}`;
                            return (
                                <li key={itemID}>
                                    <Field
                                        name={`${items.name}_${item}`}
                                        component={Checkbox}
                                    />
                                </li>
                            );
                        }
                    )}
                </ul>
            </Fragment>
        );
    }



}

