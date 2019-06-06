import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Checkbox from './components/checkbox';

import './styles.css';

export default class ParametersBlock extends Component {

    static propTypes = {
        items: PropTypes.object,
        changeFormField: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            isActive: window.innerWidth >= 992
        };

        this.toggleChange = this.toggleChange.bind(this);
        this.updateIsMobile = this.updateIsMobile.bind(this);
        this.changeFormField = this.changeFormField.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateIsMobile);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateIsMobile);
    }

    changeFormField(data) {
        this.props.changeFormField(data);
    }

    toggleChange() {
        this.setState({ isActive: !this.state.isActive });
    }

    updateIsMobile() {
        this.setState({
            isActive: window.innerWidth >= 992
        });
    }

    render() {
        const checkboxClass = this.state.isActive ? 'active' : '';
        const { items } = this.props;
        console.log(items, 'params!!!');
        return (
            <Fragment>
                <span className={`parameters-block-head ${checkboxClass}`} onClick={this.toggleChange}>
                    {items.head}
                </span>
                <ul className={checkboxClass}>
                    {items.options.map(
                        (item, index) => {
                            const itemID = `option${items.name}${index}`;
                            return (
                                <li key={itemID}>
                                    <Checkbox
                                        item={item}
                                        name={items.name}
                                        changeFormField={this.changeFormField}/>
                                </li>
                            );
                        }
                    )}
                </ul>
            </Fragment>
        );
    }


}

