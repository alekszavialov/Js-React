import React, {Component} from 'react';
import ListItem from './components/ListItem'
import PropTypes from 'prop-types';

export default class TodoList extends Component {
  static propTypes = {
    list: PropTypes.array,
    onChangeActiveItem: PropTypes.func,
    onChangeItemText: PropTypes.func,
    onChangeItemPosition: PropTypes.func,
    onRemoveResolved: PropTypes.func
  };

  constructor(props) {
    super(props);

    // this.handleActiveItem = this.handleActiveItem.bind(this);
    this.handleChangeItemText = this.handleChangeItemText.bind(this);
    this.handleChangeItemPosition = this.handleChangeItemPosition.bind(this);
    this.handleOnRemoveResolved = this.handleOnRemoveResolved.bind(this);
  }

  // handleActiveItem(item) {
  //   this.props.onChangeActiveItem(item)
  // }

  handleChangeItemText(item, obj) {
    this.props.onChangeItemText(item, obj)
  }

  handleChangeItemPosition(id, className) {
    this.props.onChangeItemPosition(id, className)
  }

  handleOnRemoveResolved(id) {
    this.props.onRemoveResolved(id);
  }

  render() {
    return (
      <ul className="list-group">
        {this.props.list.map((item, index) => {
          return <ListItem
            text={item.text} active={item.active} key={item.text + index} id={item.id}
            onChangeActiveItem={this.props.onChangeActiveItem}
            onChangeItemText={this.handleChangeItemText}
            onChangeItemPosition={this.handleChangeItemPosition}
            onRemoveResolved={this.handleOnRemoveResolved}
          />
        })}
      </ul>
    )
  }
}
