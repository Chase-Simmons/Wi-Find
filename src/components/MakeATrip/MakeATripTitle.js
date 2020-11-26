/*-----> CORE <-----*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
/*-----> CORE <-----*/

/*-----> MATERIAL-UI <-----*/
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import EditIcon from '@material-ui/icons/Edit';
/*-----> MATERIAL-UI <-----*/

import './MakeATrip.css';

class MakeATripItem extends Component {
  state = {
    isContentAccepted: false,
    isContentsDeleted: false,
    disabled: false,
    location: '',
    size: 24,
  };
  onChange = (event) => {
    this.setState({
      ...this.state,
      location: event.target.value,
    });
  };

  deleteContents = () => {
    this.setState({
      ...this.state,
      isContentsDeleted: true,
    });
  };

  acceptEdit = (event) => {
    if (this.state.isContentAccepted === false) {
      this.setState({
        ...this.state,
        isContentAccepted: true,
        disabled: true,
        size: 0,
      });
      this.dispatch();
    } else {
      this.setState({
        ...this.state,
        isContentAccepted: false,
        disabled: false,
      });
    }
  };

  dispatch = () => {
    console.log('hit');
    this.props.dispatch({
      type: 'SET_TRIP_TITLE',
      payload: this.state.location,
    });
  };
  AcceptOrEdit;
  render() {
    if (this.state.isContentAccepted === true) {
      this.AcceptOrEdit = EditIcon;
    } else {
      this.AcceptOrEdit = CheckBoxIcon;
    }
    if (this.state.isContentsDeleted === true) {
      return <></>;
    } else {
      return (
        <ListItem style={{ height: 75, fontSize: 40, marginTop: '8px' }}>
          <ListItemIcon></ListItemIcon>
          <ListItemText>
            <TextField
              disabled={this.state.disabled}
              primary="Title"
              onChange={this.onChange}
              placeholder="TRIP NAME"
            />
          </ListItemText>
          <ListItemIcon>
            <this.AcceptOrEdit
              style={{ marginLeft: 30, fontSize: this.state.size }}
              onClick={this.acceptEdit}
              className="onHover"
            />
          </ListItemIcon>
        </ListItem>
      );
    }
  }
}

export default connect(mapStoreToProps)(MakeATripItem);
