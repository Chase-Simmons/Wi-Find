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
  /*-----> GO TO MY LOCATION <-----*/

  findNearMe = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('Latitude is :', position.coords.latitude);
      console.log('Longitude is :', position.coords.longitude);

      this.props.dispatch({
        type: 'FETCH_OPEN_CAGE',
        payload: {
          search_string:
            position.coords.latitude + ' ' + position.coords.longitude,
        },
      });
    });
  };
  /*-----> GO TO MY LOCATION <-----*/
  render() {
    return (
      <ListItem button onClick={this.findNearMe}>
        <ListItemIcon>
          <RoomIcon
            style={{
              color: '#F5EBF6',
            }}
          />
        </ListItemIcon>
        <ListItemText primary="Near Me" />
      </ListItem>
    );
  }
}

export default connect(mapStoreToProps)(NavNearMe);
