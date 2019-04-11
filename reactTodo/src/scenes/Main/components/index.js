import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

export default class MainComponent extends Component {
  static propTypes = {
    count: PropTypes.number,
    onAdd: PropTypes.func,
    onSubtract: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.handleSubtract = this.handleSubtract.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleSubtract() {
    this.props.onSubtract();
  }

  handleAdd() {
    this.props.onAdd();
  }

  render(){
    return (
      <Fragment>
        <div>count:</div>
        <button onClick={this.handleSubtract}>-</button>
        <span>{this.props.count}</span>
        <button onClick={this.handleAdd}>+</button>
      </Fragment>
    )
  }
}
