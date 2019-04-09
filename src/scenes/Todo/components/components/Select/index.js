import React, {Component} from 'react';

export default class Select extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <select>
        <option value="all">all</option>
        <option value="active">active</option>
        <option value="resolved">resolved</option>
      </select>
    )
  }
}
