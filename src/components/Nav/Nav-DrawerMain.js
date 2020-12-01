/*-----> CORE <-----*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
/*-----> CORE <-----*/

/*-----> MATERIAL-UI <-----*/
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
/*-----> MATERIAL-UI <-----*/

/*-----> COMPONENTS <-----*/
import NavResponsiveComponent from '../NavResponsiveComponent/NavResponsiveComponent';
import NavProfileLogin from './Nav-ProfileLogin';
import NavMakeATrip from './Nav-MakeATrip';
import NavHome from './Nav-Home';
import NavNearMe from './Nav-NearMe';
import NavSpeedtest from './Nav-Speedtest';
import NavLeaderboard from './Nav-Leaderboards';
import NavDrawerClose from './Nav-DrawerClose';
/*-----> COMPONENTS <-----*/

class NavDrawerMain extends Component {
  /*-----> COMPONENT NOT IN USE AND NOT WORKING :( <-----*/
  render() {
    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <NavDrawerClose close={handleDrawerClose}></NavDrawerClose>
        </div>
        <Divider style={{ backgroundColor: '#222222', height: 1 }} />
        {/* NAVBAR */}
        <List>
          <NavHome superReducer={superReducer} />
          <NavProfileLogin superReducer={superReducer} />
          <NavMakeATrip superReducer={superReducer} />
          <NavNearMe superReducer={superReducer} />
          <NavSpeedtest superReducer={superReducer} />
          <NavLeaderboard superReducer={superReducer} />
        </List>
        <Divider style={{ backgroundColor: '#222222', height: 3 }} />
        {/* COMPONENTS */}
        <List>
          <NavResponsiveComponent superReducer={superReducer} />
        </List>
      </Drawer>
    );
  }
}

export default connect(mapStoreToProps)(NavDrawerMain);
