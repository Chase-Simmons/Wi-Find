import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import LogOutButton from '../../components/LogOutButton/LogOutButton';
import Grid from '@material-ui/core/Grid';

import './ProfilePage.css';

class ProfilePage extends Component {
  render() {
    return (
      <div className="fix-over-nav">
        <div className="profile">
          <div className="profile-content">
            <Grid container>
              <Grid item xs={2}></Grid>
              <Grid item xs={7}>
                <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1>
                <h2>Title</h2>
              </Grid>
              <Grid item xs={3}>
                <h1 id="rank">Rank: 0</h1>
                <LogOutButton className="log-in" />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ProfilePage);
