import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export default class RenderField extends Component {

    static propTypes = {
        params: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.createObject = this.createObject.bind(this);
    }

    createObject() {
        const { input } = this.props;
        const { meta: { touched, error, warning } } = this.props;
        switch (this.props.params.object) {
            case 'input' :
                return (
                    <input
                        className={
                            (touched && (error || warning)) ? "errorField" : ""
                        }
                        {...input}
                        placeholder={this.props.params.placeholder}
                        type={this.props.params.type}
                        required={this.props.params.required}
                    />
                );
            case 'select' :
                return (
                    <select
                        {...input}
                        className={
                            (touched && (error || warning)) ? "errorField" : ""
                        }
                    >
                        {this.props.params.options.map(item => <option key={Math.random()}>{item}</option>)}
                    </select>
                );
            case 'textarea' :
                return (
                    <textarea
                        {...input}
                        placeholder={this.props.params.placeholder}
                        className={
                            (touched && (error || warning)) ? "errorField" : ""
                        }
                    />
                );
            default:
                return false;
        }
    }

    render() {
        const { meta: { touched, error, warning } } = this.props;
        return (
            <Fragment>
                {touched &&
                ((error && <span>{error}</span>) ||
                    (warning && <span>{warning}</span>))}
                {this.createObject()}
            </Fragment>
        );
    }

}