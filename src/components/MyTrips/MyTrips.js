/*-----> CORE <-----*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
/*-----> CORE <-----*/

/*-----> MATERIAL-UI <-----*/
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CancelIcon from '@material-ui/icons/Cancel';
/*-----> MATERIAL-UI <-----*/

/*-----> COMPONENTS <-----*/
import MyTripsContent from './MyTripsContent';
/*-----> COMPONENTS <-----*/

class MyTrips extends Component {
  /*-----> ON CLICK CLOSE CONTENT WINDOW <-----*/
  closeClick = () => {
    this.props.superReducer({ call: 'SET', data: 'none' });
  };
  /*-----> ON CLICK CLOSE CONTENT WINDOW <-----*/

  /*-----> PLACEHOLDER COMPONENT <-----*/
  ContentComponent;
  /*-----> PLACEHOLDER COMPONENT <-----*/

  render() {
    /*-----> MAP REDUCER -> COMPONENT <-----*/
    this.ContentComponent = this.props.store.user_trips.map((trip, key) => {
      return (
        <MyTripsContent
          trip={trip}
          key={key}
          superReducer={this.props.superReducer}
        />
      );
    });
    /*-----> MAP REDUCER -> COMPONENT <-----*/
    return (
      <>
        <ListItem
          button
          style={{
            backgroundColor: '#AC61B9',
            boxShadow: '0 8px 4px #00000033',
            marginTop: '-8px',
            marginBottom: '-8px',
            borderBottom: '3px solid #D5B0DC',
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
