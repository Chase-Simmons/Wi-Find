import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import LogOutButton from '../../components/LogOutButton/LogOutButton';
import Grid from '@material-ui/core/Grid';
import { FixedSizeList } from 'react-window';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import './ProfilePage.css';
import { authorize } from 'passport';

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

  render() {
    const hasData = this.state.trips;
    let trips;

    if (hasData) {
      trips = this.state.trips.map((trip, key) => (
        <div key={key}>
          <p>{trip.trip_name}</p>
        </div>
      ));
    } else {
      trips = <p>no data</p>;
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
                  {/* <FixedSizeList
                    height={363}
                    width={'100%'}
                    itemSize={36}
                    itemCount={10}
                  ></FixedSizeList> */}
                  {trips}
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
