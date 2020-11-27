import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import LogOutButton from '../../components/LogOutButton/LogOutButton';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import './ProfilePage.css';

import TripDelete from './unique_components/Profile-TripDelete';
import TripGo from './unique_components/Profile-TripGo';
import TripStops from './unique_components/Profile-TripStops';

class ProfilePage extends Component {
  state = {
    stats: null, //This is what our data will eventually be loaded into
    trips: null,
  };

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    this.setState({
      stats: this.props.store.user_stats,
      trips: this.props.store.user_trips,
    });
  }

  clickDelete = (trip) => () => {
    this.props.dispatch({
      type: 'DELETE_USER_TRIPS',
      payload: {
        trip_id: trip.id,
        id: this.props.store.user.id,
      },
    });
    setTimeout(() => {
      this.loadData();
    }, 250);
  };

  clickGo = (trip) => () => {
    console.log('go', trip);
  };
  render() {
    const hasData = this.state.trips;
    let trips;

    if (hasData) {
      trips = this.state.trips.map((trip, key) => (
        <ListItem button key={key}>
          <ListItemText>
            <div className="profile-list-item-block">
              <div className="profile-icon">
                <TripDelete clickDelete={this.clickDelete} trip={trip} />
              </div>
              <div className="profile-list-item-text">
                <p>{trip.trip_name}</p>
              </div>
              <div className="profile-list-item-text">
                <TripStops
                  locations={this.props.store.trip_locations}
                  trip={trip}
                />
              </div>
              <div className="profile-icon">
                <TripGo clickGo={this.clickGo} trip={trip} />
              </div>
            </div>
          </ListItemText>
        </ListItem>
      ));
    } else {
      trips = (
        <ListItem>
          <ListItemText>
            <p>no data</p>
          </ListItemText>
        </ListItem>
      );
    }

    return (
      <div className="fix-over-nav">
        <div className="profile">
          <div className="profile-content">
            <Grid container>
              <Grid container className="profile-details">
                <Grid item xs={2}>
                  <AccountCircleIcon style={{ fontSize: 125 }} />
                </Grid>
                <Grid item xs={7}>
                  <h1 id="welcome">
                    Welcome, {this.props.store.user.username}!
                  </h1>
                  <h4>Title: </h4>
                </Grid>
                <Grid item xs={3}>
                  <h1 id="rank">Rank: {this.props.store.user_stats.rank}</h1>
                  <LogOutButton className="log-in" />
                </Grid>
              </Grid>
              <Grid container className="profile-my-trips">
                <Grid item xs={12}>
                  <h1>My Trips</h1>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} className="profile-trips">
                  <List>{trips}</List>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ProfilePage);
