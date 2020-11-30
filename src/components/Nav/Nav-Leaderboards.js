/*-----> CORE <-----*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
/*-----> CORE <-----*/

/*-----> MATERIAL-UI <-----*/
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BarChartIcon from '@material-ui/icons/BarChart';
/*-----> MATERIAL-UI <-----*/

class NavLeaderboard extends Component {
  open = () => {
    this.props.openDrawer();
    setTimeout(() => {
      this.dispatch();
    }, 100);
  };
  dispatch = () => {
    this.props.superReducer({ call: 'SET', data: 'leaderboards' });
  };
  render() {
    return (
      <ListItem button onClick={this.open}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Leaderboards" />
      </ListItem>
    );
  }
}

export default connect(mapStoreToProps)(NavLeaderboard);
