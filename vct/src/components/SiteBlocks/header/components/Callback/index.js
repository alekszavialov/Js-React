import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

export default class Callback extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <Fragment>
        <p>Напиши Нам : </p>
        <a href="#">Обратная связь</a>
      </Fragment>
    )
  }
}

