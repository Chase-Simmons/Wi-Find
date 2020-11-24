import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import TextField from '@material-ui/core/TextField';

class NavSearch extends Component {
  onChange = (key) => (event) => {
    this.setState(
      {
        ...this.state,
        [key]: event.target.value,
      },
      () => {
        this.searchInputField();
      }
    );
  };

  searchInputField = (event) => {
    this.props.dispatch({
      type: 'FETCH_OPEN_CAGE',
      payload: { search_string: this.state.search_input },
    });
  };
  render() {
    return (
      <TextField
        id="filled-basic"
        label="Filled"
        variant="filled"
        onChange={this.onChange('search_input')}
      />
    );
  }
}

export default connect(mapStoreToProps)(NavSearch);
