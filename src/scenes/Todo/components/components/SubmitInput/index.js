import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class SubmitInput  extends Component {

  static propTypes = {
    // onChange: PropTypes.func,
    value: PropTypes.string
  };

  constructor(props){
    super(props);


    this.state = {
      value: this.props.value
    }
    // this.handleChange = this.handleChange.bind(this);
  }

  // handleChange(e) {
  //   this.props.onChange(e.target.value);
  // }
  // onChange={this.handleChange}
  render(){
    return(
      <input type="submit" value="Submit"/>
    )
  }
}
