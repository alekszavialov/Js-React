import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SubmitInput from './components/SubmitInput';
import TextInput from './components/TextInput';
import Select from './components/Select';

export default class MainComponent extends Component {
  static propTypes = {
    count: PropTypes.number,
    onAdd: PropTypes.func,
    onSubtract: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // this.handleSubtract = this.handleSubtract.bind(this);
    // this.handleAdd = this.handleAdd.bind(this);
  }

  // handleSubtract() {
  //   this.props.onSubtract();
  // }
  //
  // handleAdd() {
  //   this.props.onAdd();
  // }

  render(){
    return (
      <div className="todo-head">
        <div className="todo-head-row">
          <TextInput/>
          <SubmitInput value="Submit"/>
        </div>
        <div className="todo-head-row">
          <SubmitInput value="Remove resolved"/>
          <Select/>
          <SubmitInput value="Save changes"/>
        </div>
      </div>
    )
  }
}
