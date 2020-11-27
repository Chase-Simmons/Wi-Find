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
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
/*-----> MATERIAL-UI <-----*/

import './MyTrips.css';

class MyTripsContent extends Component {
  state = {
    trips: null,
    deleteColor: 'black',
    navigateColor: 'black',
    hasLoaded: false,
  };

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    this.setState({
      ...this.state,
      trips: this.props.store.user_trips,
    });
  }

  onEnterDelete = () => {
    this.setState({
      ...this.state,
      deleteColor: 'red',
    });
  };
  onLeaveDelete = () => {
    this.setState({
      ...this.state,
      deleteColor: 'black',
    });
  };

  onEnterNavigate = () => {
    this.setState({
      ...this.state,
      navigateColor: 'aqua',
    });
  };
  onLeaveNavigate = () => {
    this.setState({
      ...this.state,
      navigateColor: 'black',
    });
  };

  deleteData = () => {
    this.setState({
      dataDeleted: true,
    });
  };

  foundLocations = 0;
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

  render() {
    if (this.state.hasLoaded === false) {
      this.getLocationsTotal();
    }

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
