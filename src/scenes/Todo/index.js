import React, {Component} from 'react';
import TodoHead from './components/TodoHead';
import TodoList from './components/TodoList';
import {connect} from 'react-redux';
import {addTodoItem, newTodoItemText} from '../../data/Todo/actions';
import PropTypes from 'prop-types';

class Todo extends Component {

  static propTypes = {
    list: PropTypes.any,
    text: PropTypes.any,
    onAddItem: PropTypes.func,
    onChangeNewItem: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.handleAddTodoItem = this.handleAddTodoItem.bind(this);
    this.handleOnChangeNewItem = this.handleOnChangeNewItem.bind(this);
  }

  handleAddTodoItem() {
    this.props.onAddItem(this.props.list.concat([{text: this.props.text}]));
  }

  handleOnChangeNewItem(item) {
    this.props.onChangeNewItem(item);
  }

  render(){
    return (
      <div>
        <h1>TodoList</h1>
        <TodoHead text={this.props.text} onAddItem={this.handleAddTodoItem} onChangeNewItem={this.handleOnChangeNewItem}/>
        <TodoList list={this.props.list}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.Todo.list,
    text: state.Todo.text,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddItem: (name) => {dispatch(addTodoItem(name))},
    onChangeNewItem: (text) => dispatch(newTodoItemText(text))
  };
};

export default connect((mapStateToProps), mapDispatchToProps)(Todo)
