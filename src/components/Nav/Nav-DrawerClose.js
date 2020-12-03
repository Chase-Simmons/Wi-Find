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
  /*-----> CLOSER DRAWER -> DELETE CURRENT TRIP FOR [MAKE A TRIP COMPONENT] <-----*/
  closer = () => {
    this.props.close();
    this.props.dispatch({
      type: 'HANDLE_CURRENT_TRIP',
      payload: {
        data: '',
        id: this.props.store.make_a_trip_title.id,
        call: 'DELETE',
      },
    });
  };
  /*-----> CLOSER DRAWER -> DELETE CURRENT TRIP FOR [MAKE A TRIP COMPONENT] <-----*/
  render() {
    return (
      <IconButton onClick={this.closer}>
        <ChevronLeftIcon
          style={{
            color: '#F5EBF6',
          }}
        />
      </IconButton>
    );
  }
}

export default connect(mapStoreToProps)(NavDrawerClose);
