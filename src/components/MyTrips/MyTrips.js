/*-----> CORE <-----*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
/*-----> CORE <-----*/

/*-----> MATERIAL-UI <-----*/
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
/*-----> MATERIAL-UI <-----*/

import MyTripsContent from './MyTripsContent';
import swal from 'sweetalert';

class MyTrips extends Component {
  reducer = this.props.store;
  componentDidMount() {
    console.log(this.reducer.user_trips, this.reducer.trip_locations);
  }
  closeClick = () => {
    this.props.superReducer({ call: 'SET', data: 'none' });
  };

  ContentComponent;
  render() {
    this.ContentComponent = this.reducer.user_trips.map((trip, key) => {
      return (
        <MyTripsContent
          trip={trip}
          key={key}
          superReducer={this.props.superReducer}
        />
      );
    });
    return (
      <>
        <ListItem
          button
          style={{
            backgroundColor: '#ffc8b5',
            marginTop: '-8px',
            marginBottom: '-8px',
            borderBottom: '1px #222222 solid',
          }}
          onClick={this.closeClick}
        >
          <ListItemIcon>
            <CancelIcon />
          </ListItemIcon>
          <ListItemText primary="Close" />
        </ListItem>
        {this.ContentComponent}
      </>
    );
  }
}

export default connect(mapStoreToProps)(MyTrips);
