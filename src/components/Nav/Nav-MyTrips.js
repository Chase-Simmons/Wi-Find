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
import ExploreIcon from '@material-ui/icons/Explore';
/*-----> MATERIAL-UI <-----*/

class NavMyTrips extends Component {
  state = {
    load: 0,
  };

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
  dispatch = () => {
    this.props.superReducer({ call: 'SET', data: 'my_trips' });
  };
  render() {
    return (
      <ListItem button onClick={this.open}>
        <ListItemIcon>
          <ExploreIcon />
        </ListItemIcon>
        <ListItemText primary="My Trips" />
      </ListItem>
    );
  }
}

export default connect(mapStoreToProps)(NavMyTrips);
