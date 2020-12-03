import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import TextField from '@material-ui/core/TextField';

class NavSearch extends Component {
  /*-----> ON KEYSTROKE UPDATE SEARCH PARAMS <-----*/
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
  /*-----> ON KEYSTROKE UPDATE SEARCH PARAMS <-----*/

  /*-----> DISPATCH SEARCH PARAMS <-----*/
  searchInputField = (event) => {
    this.props.dispatch({
      type: 'FETCH_OPEN_CAGE',
      payload: { search_string: this.state.search_input },
    });
  };
  /*-----> DISPATCH SEARCH PARAMS <-----*/
  render() {
    return (
      <TextField
        label="Search"
        color="primary"
        variant="filled"
        onChange={this.onChange('search_input')}
        style={{ color: '#E4E8F3' }}
      />
    );
  }
}

export default connect(mapStoreToProps)(NavSearch);
