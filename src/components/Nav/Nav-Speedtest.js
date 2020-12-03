/*-----> CORE <-----*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
/*-----> CORE <-----*/

/*-----> MATERIAL-UI <-----*/
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SpeedIcon from '@material-ui/icons/Speed';
/*-----> MATERIAL-UI <-----*/

class NavSpeedtest extends Component {
  state = {
    speedAlert: false,
  };

  /*-----> OPEN DRAWER IF CLOSED <-----*/
  open = () => {
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
  };
  /*-----> OPEN DRAWER IF CLOSED <-----*/

  /*-----> CALL FOR UPDATE TO SUPERREDCUER <-----*/
  dispatch = () => {
    this.props.superReducer({ call: 'SET', data: 'speedtest' });
  };
  /*-----> CALL FOR UPDATE TO SUPERREDCUER <-----*/

  render() {
    return (
      <>
        <ListItem button onClick={this.open}>
          <ListItemIcon>
            <SpeedIcon
              style={{
                color: '#F5EBF6',
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Speedtest" />
        </ListItem>
      </>
    );
  }
}

export default connect(mapStoreToProps)(NavSpeedtest);
