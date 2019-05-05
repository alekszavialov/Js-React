import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'

import Checkbox from './components/checkbox'

import './styles.css'

export default class ParametersBlock extends Component {

  static propTypes = {
    items: PropTypes.object,
    id: PropTypes.number
  }

  constructor(props) {
    super(props)

    this.state = {
      isActive: true
    }

    this.toggleChange = this.toggleChange.bind(this);
  }

  toggleChange() {
    this.setState({isActive: !this.state.isActive});
  }

  render() {
    const checkboxClass = this.state.isActive ? 'active' : '';
    return (
      <Fragment>
        <span className={`parameters-block-head ${checkboxClass}`} onClick={this.toggleChange}>
          {this.props.items.head}
        </span>
        <ul className={checkboxClass}>
          {this.props.items.options.map((item, index) => {
              const itemID = "option" + this.props.id + "" + index;
              return (
                <li key={itemID}>
                  <Checkbox name={item}/>
                </li>
              )
            }
          )}
        </ul>
      </Fragment>
    )
  }

}

