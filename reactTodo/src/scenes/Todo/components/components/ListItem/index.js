import React, {Component} from 'react';
import SpanArrow from './components/SpanArrow';
import RemoveDiv from './components/RemoveDiv';
import ItemText from './components/ItemText';
import PropTypes from 'prop-types';

export default class ListItem extends Component {

  static propTypes = {
    active: PropTypes.bool,
    text: PropTypes.string,
    id: PropTypes.number,
    onChangeActiveItem: PropTypes.func,
    onChangeItemText: PropTypes.func,
    onChangeItemPosition: PropTypes.func,
    onRemoveResolved: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      text: this.props.text,
      active: this.props.active
    };

    this.handleChangeActiveItem = this.handleChangeActiveItem.bind(this);
    this.handleChangeItemPosition = this.handleChangeItemPosition.bind(this);
    this.handleChangeItemText = this.handleChangeItemText.bind(this);
    this.handleOnRemoveResolved = this.handleOnRemoveResolved.bind(this);
  }

  handleChangeActiveItem() {
    this.setState(
      () => {
        return {active: !this.state.active}
      },
      () => this.props.onChangeActiveItem(this.state)
    );
  }

  handleChangeItemPosition(className) {
    this.props.onChangeItemPosition(this.state.id, className)
  }

  handleOnRemoveResolved() {
    this.props.onRemoveResolved(this.state.id)
  }

  handleChangeItemText(item) {
    this.props.onChangeItemText(item, this);
  }

  render() {
    return (
      <li
        onClick={this.handleChangeActiveItem}
        className={"list-group-item " + (this.state.active ? "itemActive" : "itemResolved")}
      >
        <RemoveDiv buttonFunction={this.handleOnRemoveResolved}/>
        <ItemText text={this.props.text} onChangeItemText={this.handleChangeItemText}/>
        <SpanArrow className="up" buttonFunction={this.handleChangeItemPosition}/>
        <SpanArrow className="down" buttonFunction={this.handleChangeItemPosition}/>
      </li>
    )
  }
}

