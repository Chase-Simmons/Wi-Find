import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import LogOutButton from '../../components/LogOutButton/LogOutButton';
import Grid from '@material-ui/core/Grid';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import './ProfilePage.css';
import { authorize } from 'passport';

class ProfilePage extends Component {
  state = {
    stats: null, //This is what our data will eventually be loaded into
  };

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    this.setState({
      stats: this.props.store.user_stats,
    });
  }

  render() {
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
                  <h2>Title: </h2>
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
                  <h1>Trips</h1>
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
