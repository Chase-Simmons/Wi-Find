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

/*-----> COMPONENT <-----*/
import LeaderboardPoints from './LeaderboardPoints';
import LeaderboardAchievements from './LeaderboardAchievements';
/*-----> COMPONENT <-----*/

class Leaderboards extends Component {
  state = {
    leaderType: 'points',
  };

  closeClick = () => {
    this.props.superReducer({ call: 'SET', data: 'none' });
  };

  changeToPoints = () => {
    this.setState({
      leaderType: 'points',
    });
  };

  changeToAchievements = () => {
    this.setState({
      leaderType: 'achievements',
    });
  };
  Leaderboard;
  render() {
    if (this.state.leaderType === 'points') {
      this.Leaderboard = this.props.store.leader_points.map((item, key) => {
        return <LeaderboardPoints item={item} key={key} rank={key + 1} />;
      });
    } else if (this.state.leaderType === 'achievements') {
      this.Leaderboard = this.props.store.leader_achievements.map(
        (item, key) => {
          return (
            <LeaderboardAchievements item={item} key={key} rank={key + 1} />
          );
        }
      );
    }
    return (
      <>
        <ListItem
          button
          style={{
            backgroundColor: '#ffc8b5',
            marginTop: '-8px',
            marginBottom: '-8px',
          }}
          onClick={this.closeClick}
        >
          <ListItemIcon>
            <CancelIcon />
          </ListItemIcon>
          <ListItemText primary="Close" />
        </ListItem>
        <ListItem
          style={{
            marginTop: '8px',
            textAlign: 'center',
            width: '100%',
            borderBottom: '1px #222222 solid',
            borderTop: '2px #222222 solid',
          }}
        >
          <ListItemText primary="LEADERBOARDS" />
        </ListItem>
        <span>
          <ListItem
            button
            onClick={this.changeToPoints}
            style={{
              backgroundColor: '#b5fffe',
              textAlign: 'center',
              width: '50%',
              display: 'inline-block',
              borderBottom: '2px #222222 solid',
              borderTop: '1px #222222 solid',
              borderRight: '1px #222222 solid',
            }}
          >
            <ListItemText primary="Points" />
          </ListItem>

          <ListItem
            button
            onClick={this.changeToAchievements}
            style={{
              backgroundColor: '#b5fffe',
              textAlign: 'center',
              width: '50%',
              display: 'inline-block',

              borderBottom: '2px #222222 solid',
              borderTop: '1px #222222 solid',
              borderLeft: '1px #222222 solid',
            }}
          >
            <ListItemText primary="Achievements" />
          </ListItem>
        </span>
        {this.Leaderboard}
      </>
    );
  }
}

export default connect(mapStoreToProps)(Leaderboards);
