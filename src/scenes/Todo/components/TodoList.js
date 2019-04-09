import React, {Component} from 'react';
import ListItem from './components/ListItem'
import PropTypes from 'prop-types';

export default class TodoList extends Component {
  static propTypes = {
    list: PropTypes.array,
    onChangeActiveItem: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.handleActiveItem = this.handleActiveItem.bind(this);
  }

  handleActiveItem(item, clas1) {
    this.props.onChangeActiveItem(item, clas1)
  }

  render() {
    return (
      <ul className="todo-list">
        {this.props.list.map((item, index) => {
          return <ListItem text={item.text} active={item.active} key={item.text + index} id={item.id}
                           onChangeActiveItem={this.handleActiveItem}/>
        })}
      </ul>
    )
  }
}
