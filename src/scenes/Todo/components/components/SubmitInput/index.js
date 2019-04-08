import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class SubmitInput  extends Component {

  static propTypes = {
    value: PropTypes.string,
    onSubmit: PropTypes.func
  };

  constructor(props){
    super(props);
  }

  render(){
    return(
      <input type="submit" value={this.props.value} onClick={this.props.onSubmit}/>
    )
  }
}
