import './components/styles.css'

import React, {Component} from 'react';
import Input from './components/input';
import Span from './components/span';
import KeyboardEventHandler from 'react-keyboard-event-handler';

const arithmeticSymbols = {
  '/': {priority: 1, function: (x, y) => x / y},
  '*': {priority: 1, function: (x, y) => x * y},
  '-': {priority: 0, function: (x, y) => x - y},
  '+': {priority: 0, function: (x, y) => x + y}
};

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
      calcLine: '',
      calcValue: ''
    })
  }

  convertToPolishNotation = (expression) => {
    let newExpression = [];
    let operators = [];
    for (let i = 0; i < expression.length; i++) {
      if (this.isNumeric(expression[i])) {
        newExpression.push(expression[i]);
      } else {
        if (operators.length === 0 ||
          arithmeticSymbols[operators[operators.length - 1]].priority <
          arithmeticSymbols[expression[i]].priority) {
          operators.push(expression[i]);
        } else if (arithmeticSymbols[operators[operators.length - 1]].priority >=
          arithmeticSymbols[expression[i]].priority) {
          newExpression.push(operators.pop());
          operators.push(expression[i]);
        }
        // else {
        //   newExpression.push(expression[i]);
        // }

      }
    }
    while (operators.length > 0) {
      newExpression.push(operators.pop());
    }
    return newExpression;
  };

  isNumeric = (expressionElement) => {
    return !isNaN(parseFloat(expressionElement)) && isFinite(expressionElement);
  };

  calcState() {
    if (this.state.calcLine.trim().length === 0) {
      return;
    }
    const expression = this.convertToPolishNotation(
      this.state.calcLine.replace(/\d+(?:\.\d+)?|[\/*\-+]/g, '$& ').trim().split(' ')
    );
    console.log(expression);

    let stack = [];
    expression.forEach((token) => {
      if (token in arithmeticSymbols) {
        let [y, x] = [stack.pop(), stack.pop()];
        stack.push(arithmeticSymbols[token].function(x, y));
      } else {
        stack.push(parseFloat(token));
      }
    });
    const answer = stack.pop();
    this.isNumeric(answer) ?
      this.setState({calcValue: answer.toString()}) :
      this.setState({calcValue: 'Bad expression'});
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
    return Object.keys(arithmeticSymbols).map((item, index) =>
      <Input key={index + item.charAt(0)}
             class="one-flex-item"
             value={item.toString()}
             handleClick={this.addToLine}
      />);
  };

  render() {
    return (
      <div className="containter">
        <div className="calculator-body">
          <KeyboardEventHandler
            handleKeys={['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '/', '*', '+', '-', '=']}
            onKeyEvent={(key) => {
              key === '=' ? this.calcState() : this.addToLine(key)
            }}/>
          <Span value={this.state.calcLine} calcValue={this.state.calcValue}/>
          <div className="input-keys">
            <input type="submit" value="Clear" className="one-flex-item" onClick={this.clearState}/>
            {this.createNumberButtons()}
            <input type="submit" value="0" className="one-flex-item" onClick={this.addToLine}/>
          </div>
          <div className="input-controls">
            {this.createArithmeticSymbols()}
            <input type="submit" value="=" className="one-flex-item" onClick={this.calcState}/>
          </div>
        </div>
      </div>
    )
  }
}
