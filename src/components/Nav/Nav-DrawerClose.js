/*-----> CORE <-----*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
/*-----> CORE <-----*/

/*-----> MATERIAL-UI <-----*/
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';
/*-----> MATERIAL-UI <-----*/

class NavDrawerClose extends Component {
  closer = () => {
    this.props.close();
    this.props.dispatch({
      type: 'SET_TRIP_TITLE',
      payload: '',
    });
  };
  render() {
    return (
      <IconButton onClick={this.closer}>
        <ChevronLeftIcon />
      </IconButton>
    );
  }
}

export default connect(mapStoreToProps)(NavDrawerClose);
