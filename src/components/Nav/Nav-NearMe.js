/*-----> CORE <-----*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
/*-----> CORE <-----*/

/*-----> MATERIAL-UI <-----*/
// import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RoomIcon from '@material-ui/icons/Room';
/*-----> MATERIAL-UI <-----*/

class NavNearMe extends Component {
  render() {
    return (
      <ListItem button>
        <ListItemIcon>
          <RoomIcon />
        </ListItemIcon>
        <ListItemText primary="Near Me" />
      </ListItem>
    );
  }
}

export default connect(mapStoreToProps)(NavNearMe);
