import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './styles.css'

export default class ShoppingCart extends Component {

  static propTypes = {
    handleClick: PropTypes.func,
    items: PropTypes.object,
    value: PropTypes.number
  };

  constructor(props) {
    super(props);

    this.toggleState = this.toggleState.bind(this);
  }

  toggleState(){
    this.props.handleClick();
  }

  render() {
    return (
      <div>
        <img src="https://vct1.com/img/bucket.gif.pagespeed.ce.bEDFj2GcQE.gif" alt="ВКТ" title="ВКТ" onClick={this.toggleState}/>
        <span>{this.props.value} шт.</span>
      </div>
    )
  }
}

