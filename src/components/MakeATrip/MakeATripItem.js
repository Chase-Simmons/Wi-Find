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

import swal from 'sweetalert';
import './MakeATrip.css';

class MakeATripItem extends Component {
  state = {
    lookingForID: false,
    id: null,
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
    this.setState(
      {
        ...this.state,
        isContentsDeleted: true,
      },
      () => {
        this.props.dispatch({
          type: 'HANDLE_CURRENT_TRIP',
          payload: {
            data: '',
            id: this.state.id,
            call: 'DELETE_LOCATION',
          },
        });
      }
    );
  };

  acceptEdit = (event) => {
    if (this.state.location !== '') {
      if (this.state.isContentAccepted === false) {
        this.setState({
          ...this.state,
          lookingForID: true,
          isContentAccepted: true,
          disabled: true,
          size: 0,
        });
        this.dispatch();
      } else {
        this.setState({
          ...this.state,
          lookingForID: false,
          isContentAccepted: false,
          disabled: false,
        });
      }
    } else {
      swal('Please make sure the location has a name before submitting');
    }
  };

  dispatch = () => {
    this.props.dispatch({
      type: 'HANDLE_CURRENT_TRIP',
      payload: {
        data: this.state.location,
        id: this.props.store.make_a_trip_title.id,
        call: 'POST_LOCATION',
      },
    });
  };
  AcceptOrEdit;
  render() {
    if (this.state.lookingForID === true) {
      setTimeout(() => {
        this.setState({
          ...this.state,
          lookingForID: false,
          id: this.props.store.make_a_trip_location.id,
        });
      }, 250);
    }
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
              inputProps={{
                style: {
                  textAlign: 'center',
                  fontSize: 14,
                },
              }}
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
