/*-----> CORE <-----*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
/*-----> CORE <-----*/

/*-----> MATERIAL-UI <-----*/
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import EditIcon from '@material-ui/icons/Edit';
/*-----> MATERIAL-UI <-----*/

import swal from 'sweetalert';
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
    if (this.state.location !== '') {
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
    } else {
      swal('Please make sure the Trip has a name before submitting');
    }
  };

  dispatch = () => {
    this.props.dispatch({
      type: 'HANDLE_CURRENT_TRIP',
      payload: {
        data: this.state.location,
        user: this.props.store.user.id,
        call: 'POST',
      },
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
        <ListItem
          style={{
            boxShadow: '0 2px 12px #AC61B9',
            backgroundColor: '#283C5E',
            borderTop: '2px solid #D5B0DC',
            borderBottom: '2px solid #D5B0DC',
            height: 75,
            fontSize: 40,
            marginTop: '8px',
          }}
        >
          <ListItemIcon></ListItemIcon>
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
