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
import './EditATrip.css';

let TripTitle = 'Loading...';
let TripId = null;

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
    this.props.superReducer({ call: 'SET', data: 'none' });
    this.setState(
      {
        ...this.state,
        isContentsDeleted: true,
      },
      () => {
        this.props.dispatch({
          type: 'HANDLE_CURRENT_TRIP',
          payload: {
            data: { id: this.props.store.user.id },
            id: TripId,
            call: 'DELETE',
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
          isContentAccepted: true,
          disabled: true,
        });
        this.dispatch();
      } else {
        this.setState({
          ...this.state,
          isContentAccepted: false,
          disabled: false,
        });
      }
    } else {
      swal('Please make sure the Trip has a name before submitting');
    }
  };

  dispatch = () => {
    this.props.dispatch({
      type: 'HANDLE_CURRENT_TRIP',
      payload: {
        data: TripId,
        user: this.props.store.user.id,
        call: 'POST',
      },
    });
  };

  hasLoaded = () => {
    this.setState({
      ...this.state,
      hasLoaded: true,
    });
  };

  callNewLoad = () => {
    this.setState({
      ...this.state,
      hasLoaded: false,
    });
  };

  AcceptOrEdit;
  render() {
    if (TripId !== this.props.store.current_edit) {
      this.callNewLoad();
    }
    if (this.state.hasLoaded !== true) {
      for (let i = 0; i !== this.props.store.user_trips.length; i++) {
        if (
          this.props.store.current_edit === this.props.store.user_trips[i].id
        ) {
          TripTitle = this.props.store.user_trips[i].trip_name;
          TripId = this.props.store.user_trips[i].id;
        }
      }
      this.hasLoaded();
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
        <ListItem
          style={{
            height: 75,
            fontSize: 40,
            marginTop: '8px',
            borderBottom: '2px #222222 solid',
            borderTop: '2px #222222 solid',
          }}
        >
          <ListItemIcon>
            <DeleteIcon onClick={this.deleteContents} className="onHover" />
          </ListItemIcon>
          <ListItemText>
            <TextField
              inputProps={{
                style: {
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 24,
                },
              }}
              disabled={this.state.disabled}
              primary="Title"
              onChange={this.onChange}
              placeholder={TripTitle}
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
