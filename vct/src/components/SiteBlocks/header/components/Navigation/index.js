import React, {Component} from 'react';
import PropTypes from 'prop-types';

import NavItem from './components/NavItem';

export default class Navigation extends Component {

  static propTypes = {
    navList: PropTypes.array
  };

  constructor(props) {
    super(props);

  }


  render() {
    return (
      <ul>
        {this.props.navList.map(item => {
          return <NavItem text={item.text} url={item.url} key={item.text + this.props.navList.length}/>
        })
        }
      </ul>
    )
  }
}

