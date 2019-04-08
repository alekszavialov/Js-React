import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Input from './components/Input';
import View from './components/View';

export default class NameComponent extends Component {
  static propTypes = {
    count: PropTypes.string,
    onAdd: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(value) {
    this.props.onAdd(value);
  }

  render(){
    return (
      <Fragment>
        <View>
          My name is: {this.props.count}
        </View>
        <Input onChange={this.props.onAdd}/>
      </Fragment>
    )
  }
}
