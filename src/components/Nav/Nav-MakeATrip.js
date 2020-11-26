/*-----> CORE <-----*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
/*-----> CORE <-----*/

/*-----> MATERIAL-UI <-----*/
// import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExploreIcon from '@material-ui/icons/Explore';
/*-----> MATERIAL-UI <-----*/

class NavMakeATrip extends Component {
  state = {
    load: 0,
  };

  open = () => {
    this.props.openDrawer();

    setTimeout(() => {
      this.dispatch();
    }, 100);
  };
  dispatch = () => {
    this.props.superReducer({ call: 'SET', data: 'make' });
  };
  render() {
    return (
      <ListItem button onClick={this.open}>
        <ListItemIcon>
          <ExploreIcon />
        </ListItemIcon>
        <ListItemText primary="Make A Trip" />
      </ListItem>
    );
  }
}

export default connect(mapStoreToProps)(NavMakeATrip);
