import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SubmitInput from './components/SubmitInput';
import TextInput from './components/TextInput';
import Select from './components/Select';

export default class MainComponent extends Component {
  static propTypes = {
    inputText: PropTypes.string,
    onAddItem: PropTypes.func,
    onFilter: PropTypes.func,
    onChangeInputText: PropTypes.func,
    onRemoveResolved: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.handleOnChangeInputText = this.handleOnChangeInputText.bind(this);
    this.handleOnRemoveResolved = this.handleOnRemoveResolved.bind(this);
  }

  handleOnChangeInputText(text) {
    this.props.onChangeInputText(text);
  }

  handleOnRemoveResolved(id) {
    this.props.onRemoveResolved(id);
  }

  render() {
    return (
      <div className="todo-head container">
        <div className="form-group row">
          <TextInput
            onChange={this.handleOnChangeInputText}
            inputText={this.props.inputText}
            onEnterKey={this.props.onAddItem}
          />
          <SubmitInput value="Submit" buttonFunction={this.props.onAddItem}/>
        </div>
        <div className="form-group row">
          <Select onFilter={this.props.onFilter}/>
          <SubmitInput value="Remove resolved" buttonFunction={this.handleOnRemoveResolved}/>
        </div>
      </div>
    )
  }
}
