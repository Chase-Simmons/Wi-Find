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
import NavigationIcon from '@material-ui/icons/Navigation';
/*-----> MATERIAL-UI <-----*/

import './MyTrips.css';

class MyTripsContent extends Component {
  state = {
    trips: null,
    deleteColor: 'black',
    navigateColor: 'black',
    hasLoaded: false,
  };

  /*-----> ON MOUNT LOAD DATA <-----*/
  componentDidMount() {
    this.loadData();
  }
  /*-----> ON MOUNT LOAD DATA <-----*/

  /*-----> REDUCER -> STATE <-----*/
  loadData() {
    this.setState({
      ...this.state,
      trips: this.props.store.user_trips,
    });
  }
  /*-----> REDUCER -> STATE <-----*/

  /*-----> ON HOVER CHANGE COLOR [DELETE] <-----*/
  onEnterDelete = () => {
    this.setState({
      ...this.state,
      deleteColor: 'red',
    });
  };
  /*-----> ON HOVER CHANGE COLOR [DELETE] <-----*/

  /*-----> ON LEAVE HOVER CHANGE COLOR [DELETE] <-----*/
  onLeaveDelete = () => {
    this.setState({
      ...this.state,
      deleteColor: 'black',
    });
  };
  /*-----> ON LEAVE HOVER CHANGE COLOR [DELETE] <-----*/

  /*-----> ON HOVER CHANGE COLOR [NAVIGATE] <-----*/
  onEnterNavigate = () => {
    this.setState({
      ...this.state,
      navigateColor: 'aqua',
    });
  };
  /*-----> ON HOVER CHANGE COLOR [NAVIGATE] <-----*/

  /*-----> ON LEAVE HOVER CHANGE COLOR [NAVIGATE] <-----*/
  onLeaveNavigate = () => {
    this.setState({
      ...this.state,
      navigateColor: 'black',
    });
  };
  /*-----> ON LEAVE HOVER CHANGE COLOR [NAVIGATE] <-----*/

  /*-----> HAS DATA BEEN DELETED? <-----*/
  deleteData = () => {
    this.setState({
      dataDeleted: true,
    });
  };
  /*-----> HAS DATA BEEN DELETED? <-----*/

  /*-----> PLACEHOLDER BEFORE LOAD <-----*/
  foundLocations = 0;
  /*-----> PLACEHOLDER BEFORE LOAD <-----*/

  /*-----> GET AMOUNT OF STOPS FOR LOCATION <-----*/
  getLocationsTotal = () => {
    this.setState(
      {
        ...this.state,
        hasLoaded: true,
      },
      () => {
        this.foundLocations = 0;
        for (let i = 0; i < this.props.store.trip_locations.length; i++) {
          if (
            this.props.trip.id === this.props.store.trip_locations[i].trip_id
          ) {
            this.foundLocations++;
          }
        }
      }
    );
  };
  /*-----> GET AMOUNT OF STOPS FOR LOCATION <-----*/

  render() {
    /*-----> IF DATA HAS NOT BEEN LOADED -> LOAD DATA <-----*/
    if (this.state.hasLoaded === false) {
      this.getLocationsTotal();
    }
    /*-----> IF DATA HAS NOT BEEN LOADED -> LOAD DATA <-----*/

    /*-----> DELETE TRIP <-----*/
    const clickDelete = () => {
      this.props.dispatch({
        type: 'DELETE_USER_TRIPS',
        payload: {
          trip_id: this.props.trip.id,
          id: this.props.store.user.id,
        },
      });
      this.deleteData();
    };
    /*-----> DELETE TRIP <-----*/

    /*-----> GO TO TRIP DETAILS <-----*/
    const clickNavigate = () => {
      this.props.dispatch({
        type: 'SET_CURRENT_EDIT',
        payload: this.props.trip.id,
      });
      this.props.dispatch({
        type: 'GET_USER_TRIPS',
        payload: this.props.store.user.id,
      });

      setTimeout(() => {
        this.props.superReducer({ call: 'SET', data: 'edit' });
      }, 250);
    };
    /*-----> GO TO TRIP DETAILS <-----*/
    if (this.state.dataDeleted === true) {
      return <></>;
    } else {
      return (
        <ListItem
          button
          style={{
            height: 50,
            fontSize: 40,
            marginTop: '8px',
            marginBottom: '-8px',
            borderBottom: '1px #222222 solid',
            borderTop: '1px #222222 solid',
          }}
        >
          <ListItemIcon style={{ minWidth: 10 }}>
            <DeleteIcon
              onMouseEnter={this.onEnterDelete}
              onMouseLeave={this.onLeaveDelete}
              style={{ color: this.state.deleteColor }}
              onClick={clickDelete}
            />
          </ListItemIcon>
          <ListItemText>
            <TextField
              disabled
              inputProps={{
                style: {
                  textAlign: 'left',
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: '#222222',
                  minWidth: '140px',
                  marginLeft: '5px',
                },
              }}
              value={this.props.trip.trip_name}
            />
          </ListItemText>
          <ListItemText>
            <TextField
              disabled
              inputProps={{
                style: {
                  textAlign: 'right',
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: '#222222',
                  minWidth: '120px',
                  marginLeft: '-30px',
                },
              }}
              value={' Stops: ' + this.foundLocations}
            />
          </ListItemText>
          <ListItemIcon style={{ minWidth: 10 }}>
            <NavigationIcon
              onMouseEnter={this.onEnterNavigate}
              onMouseLeave={this.onLeaveNavigate}
              style={{
                color: this.state.navigateColor,
                marginLeft: '32px',
                paddingRight: '-32px',
              }}
              onClick={clickNavigate}
            />
          </ListItemIcon>
        </ListItem>
      );
    }
  }
}

export default connect(mapStoreToProps)(MyTripsContent);
