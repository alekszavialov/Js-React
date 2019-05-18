import React, { Component } from 'react';

import './styles.css';

export default class Checkbox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isChecked: false
        };
        this.input = React.createRef();
        this.toggleCheck = this.toggleCheck.bind(this);
    }

    toggleCheck() {
        this.input.current.click();
    }

    render() {
        const checkboxClass = this.state.isChecked ? 'check' : 'unchecked';
        const { input } = this.props;
        return (
            <div className="custom-checkbox-container" onClick={this.toggleCheck}>
                <span className={`custom-checkbox-${checkboxClass}`}/>
                <input ref={this.input} type="checkbox" {...input}
                       onClick={() => {
                           input.onChange();
                           this.setState({
                               isChecked: !this.state.isChecked
                           });
                       }}/>
            </div>
        );
    }

}
