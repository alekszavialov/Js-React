import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class HeadSearch extends Component {

  static propTypes = {
  };

  constructor(props) {
    super(props);

  }


  render() {
    return (
      <form method="GET">
        <input type="text" placeholder="Search" autoComplete="off" required/>
        <button>Ok</button>
      </form>
    )
  }
}

