/*-----> CORE <-----*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
/*-----> CORE <-----*/

/*-----> MATERIAL-UI <-----*/
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BarChartIcon from '@material-ui/icons/BarChart';
/*-----> MATERIAL-UI <-----*/

class NavLeaderboard extends Component {
  /*-----> OPEN DRAWER IF CLOSED <-----*/
  open = () => {
    this.props.openDrawer();
    setTimeout(() => {
      this.dispatch();
    }, 100);
  };
  /*-----> OPEN DRAWER IF CLOSED <-----*/

  /*-----> CALL FOR UPDATE TO SUPERREDCUER <-----*/
  dispatch = () => {
    this.props.superReducer({ call: 'SET', data: 'leaderboards' });
  };
  /*-----> CALL FOR UPDATE TO SUPERREDCUER <-----*/
  render() {
    return (
      <ListItem button onClick={this.open}>
        <ListItemIcon>
          <BarChartIcon
            style={{
              color: '#F5EBF6',
            }}
          />
        </ListItemIcon>
        <ListItemText primary="Leaderboards" />
      </ListItem>
    );
  }
}

export default connect(mapStoreToProps)(NavLeaderboard);
