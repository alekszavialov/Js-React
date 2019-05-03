import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './styles.css'

export default class CategoriesItems extends Component {
  static propTypes = {
    items: PropTypes.array
  };

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="categories-items">
        {this.props.items.map(item =>
          <a href={item.url} key={item.text + this.props.items.length}>
            <img src={item.src} alt={item.text}/>
            <span>{item.text}</span>
          </a>
        )}
      </div>
    );
  }
}
