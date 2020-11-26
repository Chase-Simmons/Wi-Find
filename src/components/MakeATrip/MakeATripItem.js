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

class MakeATripTitle extends Component {
  state = {
    isContentAccepted: false,
    isContentsDeleted: false,
    disabled: false,
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
      });
    } else {
      this.setState({
        ...this.state,
        isContentAccepted: false,
        disabled: false,
      });
    }
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
        <ListItem>
          <ListItemIcon>
            <DeleteIcon onClick={this.deleteContents} className="onHover" />
          </ListItemIcon>
          <ListItemText>
            <TextField
              disabled={this.state.disabled}
              primary="location"
              onChange={this.onChange}
              placeholder="STOP LOCATION"
            />
          </ListItemText>
          <ListItemIcon>
            <this.AcceptOrEdit
              style={{ marginLeft: 30 }}
              onClick={this.acceptEdit}
              className="onHover"
            />
          </ListItemIcon>
        </ListItem>
      );
    }
  }
}

export default connect(mapStoreToProps)(MakeATripTitle);
