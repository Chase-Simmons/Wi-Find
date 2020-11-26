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
import ExploreIcon from '@material-ui/icons/Explore';
/*-----> MATERIAL-UI <-----*/

class NavSearch extends Component {
  dispatch = () => {
    this.props.dispatch({ type: 'SET_NAV_COMPONENT', payload: 'make' });
  };
  render() {
    return (
      <Link onClick={this.dispatch}>
        <ListItem button>
          <ListItemIcon>
            <ExploreIcon />
          </ListItemIcon>
          <ListItemText primary="Make A Trip" />
        </ListItem>
      </Link>
    );
  }
}

export default connect(mapStoreToProps)(NavSearch);
