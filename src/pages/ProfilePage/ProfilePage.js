/*-----> CORE <-----*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
/*-----> CORE <-----*/

/*-----> MATERIAL-UI <-----*/
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import List from '@material-ui/core/List';
/*-----> MATERIAL-UI <-----*/

/*-----> COMPONENTS <-----*/
import LogOutButton from '../../components/LogOutButton/LogOutButton';
import ProfileStats from './ProfilePageStats';
/*-----> COMPONENTS <-----*/

import './ProfilePage.css';

class ProfilePage extends Component {
  render() {
    /*-----> CALCULATES USER'S RANK <-----*/
    let rank;
    for (let i = 0; i < this.props.store.leader_points.length; i++) {
      if (this.props.store.leader_points[i].id === this.props.store.user.id) {
        rank = i + 1;
      }
    }
    /*-----> CALCULATES USER'S RANK <-----*/

    return (
      <div className="fix-over-nav">
        <div className="profile">
          <div className="profile-content">
            <Grid container>
              <Grid container className="profile-details">
                <Grid item xs={2}>
                  <AccountCircleIcon
                    style={{ fontSize: 125 }}
                    className="onHover"
                  />
                </Grid>
                <Grid item xs={7}>
                  <h1 id="welcome">
                    Welcome, {this.props.store.user.username}!
                  </h1>
                  <h4>Title: The Newcomer </h4>
                </Grid>
                <Grid item xs={3}>
                  <h1 id="rank">Rank: {rank}</h1>
                  <LogOutButton className="log-in" />
                </Grid>
              </Grid>
              <Grid container className="profile-my-trips">
                <Grid item xs={12}>
                  <h1>My Stats</h1>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} className="profile-trips">
                  <List style={{ marginTop: '45px' }}>
                    <ProfileStats />
                  </List>
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
