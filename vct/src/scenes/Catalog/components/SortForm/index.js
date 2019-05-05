import React, {Component} from 'react'
import PropTypes from 'prop-types'

import RangeSlider from './components/rangeSlider'
import ParametersBlock from './components/parametersBlock'

import './styles.css'

export default class SortForm extends Component {

  static propTypes = {
    sliderValues: PropTypes.object,
    productParameters: PropTypes.array
  };

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <form method="GET">
        <div className="shop-sort-block">
          <RangeSlider values={this.props.sliderValues}/>
        </div>
        {this.props.productParameters.map((item, index) =>
          <div className="shop-sort-block" key={index}>
            <ParametersBlock items={item} id={index}/>
          </div>
        )}
        <button title="Применить текущие параметры" className="shop-block-buy">Применить</button>
      </form>

    )
  }

}
