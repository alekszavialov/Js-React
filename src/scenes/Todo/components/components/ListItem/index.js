import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ListItem  extends Component {

  static propTypes = {
    active: PropTypes.bool,
    text: PropTypes.string
  };

  constructor(props){
    super(props);

    this.state = {
      text: this.props.text,
      active: this.props.active
    }
    // this.handleChange = this.handleChange.bind(this);
  }

  // handleChange(e) {
  //   this.props.onChange(e.target.value);
  // }
  // onChange={this.handleChange}
  render(){
    return(
      <li>
       <p>{this.state.text}</p>
      </li>
    )
  }
}

