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
        switch (this.props.params.object) {
            case 'input' :
                return (
                    <input
                        placeholder={this.props.params.placeholder}
                        type={this.props.params.type}
                        required={this.props.params.required}
                    />
                );
            case 'select' :
                return (
                    <select>
                        {this.props.params.options.map(item => <option key={Math.random()}>{item}</option>)}
                    </select>
                );
            case 'textarea' :
                return (
                    <textarea
                        placeholder={this.props.params.placeholder}
                    />
                );
            default:
                return false;
        }
    }

//
// <input {...input} placeholder={label} type={type}/>
// {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}

    render() {
        return (
            <Fragment>
                {this.createObject()}
            </Fragment>
        );
    }

}