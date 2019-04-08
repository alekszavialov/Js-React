import React, {Component} from 'react';
import NameComponent from './copmponents';
import {connect} from 'react-redux';
import {changeName} from '../../data/Name/actions';
import PropTypes from 'prop-types';

class Name extends Component {

  static propTypes = {
    name: PropTypes.string,
    onNameChange: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.handleAdd = this.handleAdd.bind(this);

    this.state = {
      count: "",
    }
  }

  handleAdd(value) {
    this.props.onNameChange(value);
  }


  render(){
    return (
      <NameComponent count={this.props.name}
                     onAdd={this.handleAdd}
                     />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    name: state.Name.name,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onNameChange: (name) => dispatch(changeName(name))
  };
};

export default connect((mapStateToProps), mapDispatchToProps)(Name)
