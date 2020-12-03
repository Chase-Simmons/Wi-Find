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

import './Leaderboards.css';
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
      <div className="leaderboards-box">
        <ListItem
          button
          style={{
            backgroundColor: '#AC61B9',
            boxShadow: '0 8px 4px #00000033',
            marginTop: '-8px',
            marginBottom: '-8px',
            borderBottom: '3px solid #D5B0DC',
            color: '#F5EBF6',
          }}
          onClick={this.closeClick}
        >
          <ListItemIcon>
            <CancelIcon />
          </ListItemIcon>
          <ListItemText primary="Close" />
        </ListItem>
        <div className="leaderboards-box-content">
          <h2
            style={{
              marginTop: '33px',
              marginBottom: '25px',
              color: '#F5EBF6',
            }}
          >
            LEADERBOARDS
          </h2>
        </div>
        <span>
          <ListItem
            button
            onClick={this.changeToPoints}
            style={{
              textAlign: 'center',
              width: '50%',
              display: 'inline-block',
              borderTop: '2px #D5B0DC solid',
              borderRight: '1px #D5B0DC solid',
              backgroundColor: '#0A3D7B',
              boxShadow: '0 2px 12px #AC61B9',
              borderBottom: '2px solid #D5B0DC',
              color: '#F5EBF6',
            }}
          >
            <ListItemText primary="Points" />
          </ListItem>

          <ListItem
            button
            onClick={this.changeToAchievements}
            style={{
              textAlign: 'center',
              width: '50%',
              display: 'inline-block',
              borderTop: '2px #D5B0DC solid',
              borderLeft: '1px #D5B0DC solid',
              backgroundColor: '#0A3D7B',
              boxShadow: '0 2px 12px #AC61B9',
              borderBottom: '2px solid #D5B0DC',
              color: '#F5EBF6',
            }}
          >
            <ListItemText primary="Achievements" />
          </ListItem>
        </span>
        {this.Leaderboard}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Leaderboards);
