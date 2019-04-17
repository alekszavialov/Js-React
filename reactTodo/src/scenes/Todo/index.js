import React, {Component} from 'react';
import TodoHead from './components/TodoHead';
import TodoList from './components/TodoList';
import {connect} from 'react-redux';
import {addToTodoList, modifyTodoList} from '../../data/Todo/actions';
import PropTypes from 'prop-types';

class Todo extends Component {

  static propTypes = {
    list: PropTypes.array,
    onAddToTodoList: PropTypes.func,
    onModifyTodoList: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      inputText: ""
    };

    this.handleAddTodoItem = this.handleAddTodoItem.bind(this);
    this.handleChangeTodoItem = this.handleChangeTodoItem.bind(this);
    this.handleChangeTodoItemText = this.handleChangeTodoItemText.bind(this);
    this.handleFilterTodoItems = this.handleFilterTodoItems.bind(this);
    this.handleRemoveResolved = this.handleRemoveResolved.bind(this);
    this.handleChangeItemPosition = this.handleChangeItemPosition.bind(this);
    this.handleOnChangeInputText = this.handleOnChangeInputText.bind(this);
  }

  handleAddTodoItem() {
    if (this.state.inputText === "") {
      return;
    }
    this.modifyState('inputText');
    this.props.onAddToTodoList({text: this.state.inputText, active: true, id: this.props.list.length + Math.random()});
  }

  handleChangeTodoItem(item, state = 'active') {
    const modifiedList = this.props.list.map(obj => {
      if (obj.id === item.id) {
        return {...obj, [state]: item[state]};
      }
      return obj;
    });
    this.props.onModifyTodoList(modifiedList);
  }

  handleChangeTodoItemText(item, obj) {
    if (item.tagName !== 'H6') {
      return;
    }
    if (item.hasAttribute('contentEditable')) {
      item.removeAttribute('contentEditable');
      if (item.innerText !== obj.state.text) {
        obj.setState(
          () => {
            return {text: item.innerText}
          },
          () => this.handleChangeTodoItem(obj.state, 'text')
        );
      }
    } else {
      item.setAttribute('contentEditable', true);
      item.focus();
    }
  }

  handleFilterTodoItems(item) {
    switch (item) {
      case "resolved" : {
        this.sortList(false);
        break;
      }
      case "active" : {
        this.sortList(true);
        break;
      }
      default : {
        this.sortList();
        break;
      }
    }
  }

  handleOnChangeInputText(item) {
    this.modifyState('inputText', item);
  }

  modifyState = (stateName, value = '') => {
    this.setState(
      () => {
        return {[stateName]: value}
      }
    );
  };

  sortList = (type) => {
    if (this.props.list.length === 0) {
      return;
    }
    let sortedList;
    if (typeof type !== 'undefined') {
      sortedList = [...this.sortByValue(this.props.list.filter(item => item.active === type)),
        ...this.sortByValue(this.props.list.filter(item => item.active !== type))];
    } else {
      sortedList = this.sortByValue([...this.props.list]);
    }
    this.props.onModifyTodoList(sortedList);
  };

  sortByValue = (array) => {
    return array.sort((a, b) => {
      return (a.text).localeCompare(b.text);
    });
  };

  handleRemoveResolved(id = false) {
    let sortedList;
    if (!id) {
      sortedList = this.props.list.filter(obj => obj.active === true);
    } else {
      sortedList = this.props.list.filter(obj => obj.id !== id);
    }
    this.props.onModifyTodoList(sortedList);
  }

  handleChangeItemPosition(id, className) {
    const currentItem = this.props.list.findIndex(element => element.id === id);
    if ((currentItem === 0 && className === 'up') || (currentItem === this.props.list.length - 1 && className === 'down')) {
      return;
    }
    let modifiedList = [...this.props.list];
    const replaceableItem = className === "up" ? -1 : 1;
    [modifiedList[currentItem], modifiedList[currentItem + replaceableItem]] = [modifiedList[currentItem + replaceableItem], modifiedList[currentItem]];
    this.props.onModifyTodoList(modifiedList);
  }


  render() {
    return (
      <div className="container">
        <h1 className="d-flex justify-content-center">TodoList</h1>
        <TodoHead inputText={this.state.inputText}
                  onAddItem={this.handleAddTodoItem}
                  onChangeInputText={this.handleOnChangeInputText}
                  onFilter={this.handleFilterTodoItems}
                  onRemoveResolved={this.handleRemoveResolved}
        />
        <TodoList
          list={this.props.list}
          onChangeActiveItem={this.handleChangeTodoItem}
          onChangeItemText={this.handleChangeTodoItemText}
          onChangeItemPosition={this.handleChangeItemPosition}
          onRemoveResolved={this.handleRemoveResolved}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.Todo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddToTodoList: (item) => dispatch(addToTodoList(item)),
    onModifyTodoList: (list) => dispatch(modifyTodoList(list))
  };
};

export default connect((mapStateToProps), mapDispatchToProps)(Todo)
