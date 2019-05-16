import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class RenderField extends Component{

    static propTypes = {

    }

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <input {...input} placeholder={label} type={type}/>
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        );
    }

}