/*-----> CORE <-----*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
/*-----> CORE <-----*/

/*-----> MATERIAL-UI <-----*/
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExploreIcon from '@material-ui/icons/Explore';
/*-----> MATERIAL-UI <-----*/

import swal from 'sweetalert';

class NavMakeATrip extends Component {
  state = {};

  /*-----> OPEN DRAWER IF CLOSED <-----*/
  open = () => {
    if (!this.props.store.user.id) {
      swal('Please Login To Use This Feature!');
    } else {
      this.props.openDrawer();
      setTimeout(() => {
        this.dispatch();
      }, 100);
    }
  };
  /*-----> OPEN DRAWER IF CLOSED <-----*/

  /*-----> CALL FOR UPDATE TO SUPERREDCUER <-----*/
  dispatch = () => {
    this.props.superReducer({ call: 'SET', data: 'make' });
  };
  /*-----> CALL FOR UPDATE TO SUPERREDCUER <-----*/
  render() {
    return (
      <ListItem button onClick={this.open}>
        <ListItemIcon>
          <ExploreIcon
            style={{
              color: '#F5EBF6',
            }}
          />
        </ListItemIcon>
        <ListItemText primary="Make A Trip" />
      </ListItem>
    );
  }
}

export default connect(mapStoreToProps)(NavMakeATrip);
