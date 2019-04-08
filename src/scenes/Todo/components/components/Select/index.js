import React, {Component} from 'react';

export default class Select  extends Component {

  constructor(props){
    super(props);


    // this.state = {
    //   value: this.props.value
    // }
    // this.handleChange = this.handleChange.bind(this);
  }

  // handleChange(e) {
  //   this.props.onChange(e.target.value);
  // }
  // onChange={this.handleChange}
  render(){
    return(
      <select>
        <option value="all">all</option>
        <option value="active">active</option>
        <option value="resolved">resolved</option>
      </select>
    )
  }
}
