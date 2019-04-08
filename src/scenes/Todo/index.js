import React, {Component} from 'react';
import TodoHead from './components/TodoHead';
import TodoList from './components/TodoList';

export default class Todo extends Component {

  constructor(props) {
    super(props);

    // this.handleSubtract = this.handleSubtract.bind(this);
    // this.handleAdd = this.handleAdd.bind(this);

  }

  // handleAdd() {
  //   this.setState({
  //     count: this.state.count + 1,
  //   })
  // }
  //
  // handleSubtract() {
  //   this.setState({
  //     count: this.state.count - 1,
  //   })
  // }

  render(){
    return (
      <div>
        <h1>Worked</h1>
        <TodoHead />
        <TodoList list={[{value: '1234', active: true},{value: '12345', active: true}]} />
      </div>

    )
  }
}
