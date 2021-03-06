/*-----> CORE <-----*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
/*-----> CORE <-----*/

/*-----> MATERIAL-UI <-----*/
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
/*-----> MATERIAL-UI <-----*/

import swal from 'sweetalert';

class NavMyTrips extends Component {
  state = {};

  /*-----> OPEN DRAWER IF CLOSED <-----*/
  open = () => {
    if (!this.props.store.user.id) {
      swal('Please Login To Use This Feature!');
    } else {
      this.props.openDrawer();
      this.props.dispatch({
        type: 'HANDLE_CURRENT_TRIP',
        payload: {
          data: '',
          id: this.props.store.make_a_trip_title.id,
          call: 'DELETE',
        },
      });
      setTimeout(() => {
        this.dispatch();
      }, 100);
    }
  };
  /*-----> OPEN DRAWER IF CLOSED <-----*/

  /*-----> CALL FOR UPDATE TO SUPERREDCUER <-----*/
  dispatch = () => {
    this.props.superReducer({ call: 'SET', data: 'my_trips' });
  };
  /*-----> CALL FOR UPDATE TO SUPERREDCUER <-----*/
  render() {
    return (
      <ListItem button onClick={this.open}>
        <ListItemIcon>
          <EmojiTransportationIcon
            style={{
              color: '#F5EBF6',
            }}
          />
        </ListItemIcon>
        <ListItemText primary="My Trips" />
      </ListItem>
    );
  }
}

export default connect(mapStoreToProps)(NavMyTrips);
