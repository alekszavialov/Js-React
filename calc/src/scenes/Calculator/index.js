import './components/styles.css'

import React, {Component} from 'react';
import Input from './components/input';
import Span from './components/span';
import KeyboardEventHandler from 'react-keyboard-event-handler';

const arithmeticSymbols = [
  {value: '/'},
  {value: '*'},
  {value: '-'},
  {value: '+'},
];

const operators = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y
};

const ComponentA = (props) => (<div>
  <div>key detected: {props.eventKey}</div>
  <KeyboardEventHandler
    handleKeys={['a', 'b', 'c']}
    onKeyEvent={(key, e) => console.log(`do something upon keydown event of ${key}`)}/>
</div>);

export default class Calculator extends Component {

  constructor(props) {
    super(props);

    this.state = {
      calcLine: '',
      calcValue: ''
    };

    this.addToLine = this.addToLine.bind(this);
    this.clearState = this.clearState.bind(this);
    this.calcState = this.calcState.bind(this);
  }

  addToLine(item) {
    this.setState({
      calcLine: this.state.calcLine + item
    })
  }

  clearState() {
    this.setState({
      calcLine: '0'
    })
  }


  calcState() {
    let polishNotation = [];
    let polishNotationStek = [];
    let stack = [];

    this.state.calcLine.split('').forEach((token) => {
      console.log(token);
      if (token in operators) {
        let [y, x] = [stack.pop(), stack.pop()];
        stack.push(operators[token](x, y));
      } else {
        stack.push(parseFloat(token));
      }
    });

    console.log(stack.pop());
  }


  createNumberButtons = () => {
    let buttons = [];
    for (let i = 1; i < 10; i++) {
      buttons.push(
        <Input value={i.toString()}
               handleClick={this.addToLine}
               key={i + String.fromCharCode(i)}
        />);
    }
    return buttons;
  };

  createArithmeticSymbols = () => {
    return arithmeticSymbols.map((item, index) =>
      <Input key={index + item.value.charAt(0)}
             class="one-flex-item"
             value={item.value.toString()}
             handleClick={this.addToLine}
      />);
  };

  render() {
    return (
      <div className="containter">
        <div className="calculator-body">
          <ComponentA/>
          <Span value={this.state.calcLine} calcValue={this.state.calcValue}/>
          <div className="input-keys">
            <input type="submit" value="Clear" className="one-flex-item" onClick={this.clearState}/>
            {this.createNumberButtons()}
          </div>
          <div className="input-controls">
            {this.createArithmeticSymbols()}
          </div>
          <input type="submit" value="=" className="one-flex-item" onClick={this.calcState}/>
        </div>
      </div>
    )
  }
}

"Дві тисячі дев'ятсот сімдесят гривень 00 копійок
У т.ч. ПДВ: Чотириста дев'яносто п'ять гривень 00 копійок"
