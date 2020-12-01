/*-----> CORE <-----*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
/*-----> CORE <-----*/

/*-----> MATERIAL-UI <-----*/
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MapIcon from '@material-ui/icons/Map';
/*-----> MATERIAL-UI <-----*/

class NavHome extends Component {
  /*-----> TAKE ME HOME... TO THE PLACE... I BELONG!!! <-----*/
  render() {
    return (
      <Link to="/home">
        <ListItem button>
          <ListItemIcon>
            <MapIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </Link>
    );
  }
}

export default connect(mapStoreToProps)(NavHome);
