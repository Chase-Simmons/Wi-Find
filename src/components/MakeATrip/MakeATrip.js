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

class NavSearch extends Component {
  dispatch = () => {
    this.props.dispatch({ type: 'SET_NAV_COMPONENT', payload: 'make' });
  };
  render() {
    return (
      <ListItem
        button
        style={{ backgroundColor: '#ffc8b5', marginTop: '-8px' }}
      >
        <ListItemIcon>
          <CancelIcon />
        </ListItemIcon>
        <ListItemText primary="Close" />
      </ListItem>
    );
  }
}

export default connect(mapStoreToProps)(NavSearch);
