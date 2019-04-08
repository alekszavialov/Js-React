import React, {Component} from 'react';
import MainComponent from './components';

export default class Main extends Component {

  constructor(props) {
    super(props);

    this.handleSubtract = this.handleSubtract.bind(this);
    this.handleAdd = this.handleAdd.bind(this);

    this.state = {
      count: 0,
    }
  }

  handleAdd() {
    this.setState({
      count: this.state.count + 1,
    })
  }

  handleSubtract() {
    this.setState({
      count: this.state.count - 1,
    })
  }

  render(){
    return (
      <MainComponent count={this.state.count}
                     onAdd={this.handleAdd}
                     onSubtract={this.handleSubtract}/>
    )
  }
}
