import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import RangeSlider from './rangeSlider';
import ParametersBlock from './parametersBlock';

export default class RenderField extends Component {

    // static propTypes = {
    //     //     params: PropTypes.object
    //     // };
    //     //
    //     // constructor(props) {
    //     //     super(props);
    //     //
    //     //     this.createObject = this.createObject.bind(this);
    //     // }
    //     //
    //     // createObject() {
    //     //     const { input, params } = this.props;
    //     //     const { meta: { touched, error, warning } } = this.props;
    //     //     switch (params.object) {
    //     //         case 'RangeSlider' :
    //     //             return (
    //     //                 <RangeSlider values={params.value}/>
    //     //             );
    //     //         default:
    //     //             return false;
    //     //     }
    //     // }
    //     //
    //     // render() {
    //     //     const { meta: { touched, error, warning } } = this.props;
    //     //     return (
    //     //         <Fragment>
    //     //             {touched &&
    //     //             ((error && <span>{error}</span>) ||
    //     //                 (warning && <span>{warning}</span>))}
    //     //             {this.createObject()}
    //     //         </Fragment>
    //     //     );
    //     // }

    render() {
        console.log(this.props.input);
        const { input: { value, onChange }, values :{minVal, maxVal} } = this.props;
        return (
            <div>
                <span>The current value is {value}.</span>
                <button type="button" onClick={() => onChange(value + 1)}>Inc</button>
                <button type="button" onClick={() => onChange(value - 1)}>Dec</button>
                <button type="button" onClick={() => onChange(minVal + 1)}>Inc</button>
                <button type="button" onClick={() => onChange(maxVal - 1)}>Dec</button>
            </div>
        )
    }

}