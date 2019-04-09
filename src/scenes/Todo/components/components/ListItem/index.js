import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ListItem extends Component {

  static propTypes = {
    active: PropTypes.bool,
    text: PropTypes.string,
    id: PropTypes.number,
    onChangeActiveItem: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      text: this.props.text,
      active: this.props.active
    }
    console.log(this.state ? '1' : '2');
    this.handleChangeActiveItem = this.handleChangeActiveItem.bind(this);
  }

  handleChangeActiveItem() {
    this.props.onChangeActiveItem(this.state.id, this);
  }

  render() {
    return (
      <li isActive={this.state.active ? 'true' : 'false'} itemID={this.state.id} onClick={this.handleChangeActiveItem}>
        <p>{this.state.text}</p>
      </li>
    )
  }
}

