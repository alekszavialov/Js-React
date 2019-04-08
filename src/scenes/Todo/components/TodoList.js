import React, {Component} from 'react';
import ListItem from './components/ListItem'
import PropTypes from 'prop-types';

export default class TodoList extends Component {
  static propTypes = {
    list: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      list: this.props.list
  }
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

  render() {
    return (
      <ul className="todo-list">
        {this.state.list.map((item, index) => {
          return <ListItem value={item.value} active={item.active} key={item.value+index}/>
        })}

      </ul>
    )
  }
}
//
// {/*<ListItem value="1234" active/>*/}
// {/*<ListItem value="12345" active/>*/}
