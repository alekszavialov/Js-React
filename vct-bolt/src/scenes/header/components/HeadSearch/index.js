import React, {Component} from 'react';

import './styles.css'

export default class HeadSearch extends Component {

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

