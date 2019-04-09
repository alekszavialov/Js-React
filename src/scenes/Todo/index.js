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
    // onChangeActiveItem: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.handleAddTodoItem = this.handleAddTodoItem.bind(this);
    this.handleOnChangeNewItem = this.handleOnChangeNewItem.bind(this);
    this.handleChangeActiveItem = this.handleChangeActiveItem.bind(this);
  }

  handleAddTodoItem() {
    this.props.onAddItem(this.props.list.concat([{text: this.props.text, active: true, id: this.props.list.length + Math.random()}]));
    this.props.onChangeNewItem('');
  }

  handleOnChangeNewItem(item) {
    this.props.onChangeNewItem(item);
  }

  handleChangeActiveItem(item, class1) {
    // let test1 = [...this.props.list];
    // let test = test1.find((listItem) => listItem.id === item);
    console.log(class1.state);
    class1.setState({
      active: !class1.state.active
    })
    console.log(class1.state);
    // test.active = !test.active;
    // console.log(item);
    // console.log(test);
    // console.log(test1);
    // console.log(this.props.list);
    // this.props.onAddItem(test1);
  }

  render(){
    return (
      <div>
        <h1>TodoList</h1>
        <TodoHead text={this.props.text} onAddItem={this.handleAddTodoItem} onChangeNewItem={this.handleOnChangeNewItem}/>
        <TodoList list={this.props.list} onChangeActiveItem={this.handleChangeActiveItem}/>
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
    onAddItem: (items) => dispatch(addTodoItem(items)),
    onChangeNewItem: (text) => dispatch(newTodoItemText(text)),
    // onChangeActiveItem: (items) => dispatch(changeActiveItem(items)),
  };
};

export default connect((mapStateToProps), mapDispatchToProps)(Todo)
