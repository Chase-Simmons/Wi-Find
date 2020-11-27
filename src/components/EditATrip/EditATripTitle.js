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
import NavigationIcon from '@material-ui/icons/Navigation';
/*-----> MATERIAL-UI <-----*/

/*-----> MISC <-----*/
import swal from 'sweetalert';
import './EditATrip.css';
/*-----> MISC <-----*/

/*-----> VARS <-----*/
let TripTitle = 'Loading...';
let TripId = null;
/*-----> VARS <-----*/

class MakeATripItem extends Component {
  /*-----> THIS STATE <-----*/
  state = {
    isContentAccepted: true,
    isContentsDeleted: false,
    disabled: true,
    trip: '',
    size: 24,
  };
  /*-----> THIS STATE <-----*/

  /*-----> HANDLES ON CHANGE FOR INPUT <-----*/
  onChange = (event) => {
    this.setState({
      ...this.state,
      trip: event.target.value,
    });
  };
  /*-----> HANDLES ON CHANGE FOR INPUT <-----*/

  /*-----> SWITCH STATE FROM EDIT MODE OR DELETE CONTENT <-----*/
  editOrDeleteContents = () => {
    if (this.state.isContentAccepted === true) {
      this.setState({
        ...this.state,
        isContentAccepted: false,
        disabled: false,
      });
    } else {
      this.props.superReducer({ call: 'SET', data: 'none' });
      this.setState(
        {
          ...this.state,
          isContentsDeleted: true,
          disabled: true,
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
    }
  };
  /*-----> SWITCH STATE FROM EDIT MODE OR DELETE CONTENT <-----*/

  /*-----> HANDLES ACCEPT EDITED CONTENT <-----*/
  acceptNavigate = (event) => {
    if (this.state.isContentAccepted === false) {
      if (TripTitle !== '' || TripTitle !== 'Loading...') {
        this.setState({
          ...this.state,
          isContentAccepted: true,
          disabled: true,
        });
        this.dispatch();
      } else {
        swal('Please make sure the Trip has a name before submitting');
      }
    } else {
      this.setState({
        ...this.state,
        isContentAccepted: false,
        disabled: false,
      });
    }
  };
  /*-----> HANDLES ACCEPT EDITED CONTENT <-----*/

  /*-----> CALL TO DISPATCH <-----*/
  dispatch = () => {
    // this.props.dispatch({
    //   type: 'HANDLE_CURRENT_TRIP',
    //   payload: {
    //     data: TripId,
    //     user: this.props.store.user.id,
    //     call: 'POST',
    //   },
    // });
  };
  /*-----> CALL TO DISPATCH <-----*/

  /*-----> HAS CONTENT LOADED? <-----*/
  hasLoaded = () => {
    this.setState({
      ...this.state,
      hasLoaded: true,
    });
  };
  /*-----> HAS CONTENT LOADED? <-----*/

  /*-----> DOES PAGE NEED TO BE LOADED? <-----*/
  callNewLoad = () => {
    this.setState({
      ...this.state,
      hasLoaded: false,
    });
  };
  /*-----> DOES PAGE NEED TO BE LOADED? <-----*/

  /*-----> CHANGEABLE ICON COMPONENTS <-----*/
  AcceptOrNavigate;
  EditOrDelete;
  /*-----> CHANGEABLE ICON COMPONENTS <-----*/
  render() {
    /*-----> DOES CONTENT NEED TO BE LOADED? <-----*/
    if (TripId !== this.props.store.current_edit) {
      this.callNewLoad();
    }
    /*-----> DOES CONTENT NEED TO BE LOADED? <-----*/

    /*-----> CONTENT NEEDS TO BE LOADED -> HERE IS THE CONTENT <-----*/
    if (this.state.hasLoaded !== true) {
      for (let i = 0; i !== this.props.store.user_trips.length; i++) {
        if (
          this.props.store.current_edit === this.props.store.user_trips[i].id
        ) {
          TripTitle = this.props.store.user_trips[i].trip_name;
          TripId = this.props.store.user_trips[i].id;
        }
      }
      /*-----> CONTENT NO LONGER NEEDS TO BE LOADED <-----*/
      this.hasLoaded();
      /*-----> CONTENT NO LONGER NEEDS TO BE LOADED <-----*/
    }
    /*-----> CONTENT NEEDS TO BE LOADED -> HERE IS THE CONTENT <-----*/

    /*-----> ICON COMPONENT CONTROLLER <-----*/
    if (this.state.isContentAccepted === true) {
      this.EditOrDelete = EditIcon;
      this.AcceptOrNavigate = NavigationIcon;
    } else {
      this.EditOrDelete = DeleteIcon;
      this.AcceptOrNavigate = CheckBoxIcon;
    }
    /*-----> ICON COMPONENT CONTROLLER <-----*/

    /*-----> HAS DATA BEEN DELETED? <-----*/
    if (this.state.isContentsDeleted === true) {
      return <></>;
      /*-----> HAS DATA BEEN DELETED? <-----*/
    } else {
      /*-----> CONTENT! <-----*/
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
            <this.EditOrDelete
              onClick={this.editOrDeleteContents}
              className="onHover"
            />
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
              value={TripTitle}
            />
          </ListItemText>
          <ListItemIcon>
            <this.AcceptOrNavigate
              style={{ marginLeft: 30, fontSize: this.state.size }}
              onClick={this.acceptNavigate}
              className="onHover"
            />
          </ListItemIcon>
        </ListItem>
      );
      /*-----> CONTENT! <-----*/
    }
  }
}

export default connect(mapStoreToProps)(MakeATripItem);
