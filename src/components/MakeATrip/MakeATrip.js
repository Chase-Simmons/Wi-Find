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
import MakeATripItem from './MakeATripItem';
import MakeATripTitle from './MakeATripTitle';
/*-----> COMPONENT <-----*/

import './MakeATrip.css';

class NavSearch extends Component {
  state = {
    tripStarted: false,
    render: false,
  };
  closeClick = () => {
    this.props.superReducer({ call: 'SET', data: 'none' });
  };

  updateState() {
    this.setState({
      ...this.state,
      tripStarted: true,
      render: true,
    });
  }

  updateTrip() {
    this.setState({
      ...this.state,
      tripStarted: true,
    });
  }

  falseState() {
    this.setState({
      ...this.state,
      render: false,
    });
  }
  updateStateByProp = (data) => {
    if (data.case === 'UPDATE') {
      this.setState({
        ...this.state,
        [data.key]: data.location,
      });
    } else if (data.case === 'DELETE') {
      this.setState({
        ...this.state,
        [data.key]: 'null',
      });
    }
  };

  ComponentToRender;
  ButtonToRender;

  render() {
    const AddLocationItem = () => {
      this.updateState();
    };

    if (this.state.tripStarted === false) {
      this.ButtonToRender = (
        <ListItem
          button
          style={{ backgroundColor: '#b5fffe', textAlign: 'center' }}
          onClick={AddLocationItem}
        >
          <ListItemText primary="Begin Trip!" />
        </ListItem>
      );
    } else {
      this.ButtonToRender = (
        <ListItem
          button
          style={{ backgroundColor: '#b5fffe', textAlign: 'center' }}
          onClick={AddLocationItem}
        >
          <ListItemText primary="Add Location" />
        </ListItem>
      );
    }

    if (this.state.render === true) {
      this.ComponentToRender = (
        <>
          <MakeATripItem updateStateByProp={this.updateStateByProp} />
          {this.ComponentToRender}
        </>
      );
      this.falseState();
    } else {
      this.ComponentToRender = this.ComponentToRender;
    }
    return (
      <>
        <ListItem
          button
          style={{ backgroundColor: '#ffc8b5', marginTop: '-8px' }}
          onClick={this.closeClick}
        >
          <ListItemIcon>
            <CancelIcon />
          </ListItemIcon>
          <ListItemText primary="Close" />
        </ListItem>
        <MakeATripTitle />
        {this.ComponentToRender}

        {this.ButtonToRender}
        <ListItem
          button
          style={{ backgroundColor: '#b5ffb6', textAlign: 'center' }}
          onClick={AddLocationItem}
        >
          <ListItemText primary="Save" />
        </ListItem>
      </>
    );
  }
}

export default connect(mapStoreToProps)(NavSearch);
