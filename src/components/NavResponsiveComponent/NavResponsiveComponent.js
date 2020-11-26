/*-----> CORE <-----*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
/*-----> CORE <-----*/

/*-----> MATERIAL-UI <-----*/
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
/*-----> MATERIAL-UI <-----*/

/*-----> COMPONENTS <-----*/
import MakeATrip from '../MakeATrip/MakeATrip';
/*-----> COMPONENTS <-----*/

class NavResponsiveComponent extends Component {
  state = {
    type: 'none',
    reload: true,
  };

  callReload = (data) => {
    this.setState({
      type: data.type,
      reload: true,
    });
  };
  render() {
    let ComponentToRender;

    if (this.state.reload === true) {
      setTimeout(() => {
        if (this.props.superReducer({ call: 'GET' }) === 'make') {
          this.callReload({ type: 'make' });
        } else {
          this.callReload({ type: 'none' });
        }
      }, 500);
    }

    if (this.state.type === 'make') {
      ComponentToRender = <MakeATrip />;
    } else if (this.state.type === 'none') {
      ComponentToRender = <></>;
    }
    return <>{ComponentToRender}</>;
  }
}

export default connect(mapStoreToProps)(NavResponsiveComponent);
