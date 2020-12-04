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
  state = {
    hover: false,
    change: false,
  };

  mouseEnter = () => {
    this.setState({
      ...this.state,
      hover: true,
    });
  };

  mouseLeave = () => {
    this.setState({
      ...this.state,
      hover: false,
    });
  };

  changeClick = () => {
    if (!this.state.change) {
      this.setState({
        ...this.state,
        change: true,
      });
    } else {
      this.setState({
        ...this.state,
        change: false,
      });
    }
  };

  selectAvatar = (event) => {
    this.props.dispatch({
      type: 'POST_USER_AVATAR',
      payload: {
        id: this.props.store.user.id,
        avatar: parseInt(event.target.id),
      },
    });
  };

  render() {
    /*-----> CALCULATES USER'S RANK <-----*/
    let rank;
    for (let i = 0; i < this.props.store.leader_points.length; i++) {
      if (this.props.store.leader_points[i].id === this.props.store.user.id) {
        rank = i + 1;
      }
    }
    /*-----> CALCULATES USER'S RANK <-----*/
    let ChangeAvatarOption = <></>;
    let ChangeAvatarBox = <div className="change-avatar-box-null"></div>;
    let AvatarIcons = <></>;
    let classAdded = '';
    let imageInFolder = null;
    for (let i = 0; i < 50; i++) {
      imageInFolder = require(`./ProfileImages/${i + 1}.png`);
      AvatarIcons = (
        <>
          {AvatarIcons}
          <div
            className="avatar-icon"
            style={{ width: '25px', height: '25px' }}
          >
            <img
              id={i}
              onClick={this.selectAvatar}
              src={imageInFolder}
              style={{
                width: '22px',
                height: '22px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              className="avatar-image"
            />
          </div>
        </>
      );
    }
    if (this.state.hover) {
      ChangeAvatarOption = (
        <div className="profile-image-text-circle">
          <p disabled className="profile-image-text" onClick={this.changeClick}>
            Change
          </p>
        </div>
      );
      classAdded = 'profile-image-icon-hover';
    }
    if (this.state.change) {
      ChangeAvatarBox = <div className="change-avatar-box">{AvatarIcons}</div>;
    }

    let AvatarImage = (
      <AccountCircleIcon
        style={{
          fontSize: 134,
          marginTop: '-13px',
          marginLeft: '-14px',
          borderRadius: '50%',
          overflow: 'hidden',
        }}
        className={`profile-image-icon ${classAdded}`}
      />
    );

    if (this.props.store.user_stats.avatar !== 0) {
      imageInFolder = require(`./ProfileImages/${this.props.store.user_stats.avatar}.png`);
      AvatarImage = (
        <img
          src={imageInFolder}
          style={{
            fontSize: 134,
            borderRadius: '50%',
            overflow: 'hidden',
            backgroundColor: '#f5ebf6',
          }}
          className={`profile-image-icon ${classAdded}`}
        />
      );
    }
    return (
      <div className="fix-over-nav">
        <div className="profile">
          <div className="profile-content">
            <Grid container>
              <Grid container className="profile-details">
                <Grid item xs={2}>
                  <div
                    className="profile-image"
                    onMouseEnter={this.mouseEnter}
                    onMouseLeave={this.mouseLeave}
                  >
                    {ChangeAvatarOption}
                    {AvatarImage}
                  </div>
                  {ChangeAvatarBox}
                </Grid>
                <Grid className="name-title" item xs={7}>
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
