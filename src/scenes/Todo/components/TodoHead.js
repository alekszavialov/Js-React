import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SubmitInput from './components/SubmitInput';
import TextInput from './components/TextInput';
import Select from './components/Select';

export default class MainComponent extends Component {
  static propTypes = {
    text: PropTypes.string,
    onAddItem: PropTypes.func,
    onChangeNewItem: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.handleOnChangeNewItem = this.handleOnChangeNewItem.bind(this);
  }

  handleOnChangeNewItem(text) {
    this.props.onChangeNewItem(text);
  }

  render() {
    return (
      <div className="todo-head">
        <div className="todo-head-row">
          <TextInput onChange={this.handleOnChangeNewItem} text={this.props.text}/>
          <SubmitInput text={this.props.text} value="Submit" onSubmit={this.props.onAddItem}/>
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
