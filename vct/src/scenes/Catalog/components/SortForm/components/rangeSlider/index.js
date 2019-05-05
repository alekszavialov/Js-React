import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'

import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

import './styles.css'

export default class RangeSlider extends Component {

  static propTypes = {
    values: PropTypes.object
  }

  constructor(props) {
    super(props)

    this.state = {
      value: {min: this.props.values.min, max: this.props.values.max},
    }
  }

  render() {
    return (
      <Fragment>
        <div className="priceslider-head">
          <p>Цена</p>
          <span>от</span>
          <input type="text" value={this.state.value.min} onChange={value => this.setState({value})}/>
          <span>до</span>
          <input type="text" value={this.state.value.max} onChange={value => this.setState({value})}/>
        </div>
        <InputRange
          maxValue={this.props.values.max}
          minValue={this.props.values.min}
          value={this.state.value}
          onChange={value => this.setState({value})}/>
      </Fragment>

    )
  }

}
