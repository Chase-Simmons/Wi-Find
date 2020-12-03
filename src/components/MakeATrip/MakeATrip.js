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

import swal from 'sweetalert';
import './MakeATrip.css';

class NavSearch extends Component {
  state = {
    tripStarted: false,
    render: false,
  };
  closeClick = () => {
    this.props.superReducer({ call: 'SET', data: 'none' });
    this.props.dispatch({
      type: 'HANDLE_CURRENT_TRIP',
      payload: {
        data: '',
        id: this.props.store.make_a_trip_title.id,
        call: 'DELETE',
      },
    });
  };

  saveClick = () => {
    this.props.dispatch({
      type: 'SET_CURRENT_EDIT',
      payload: this.props.store.make_a_trip_title.id,
    });
    this.props.dispatch({
      type: 'GET_USER_TRIPS',
      payload: this.props.store.user.id,
    });

    setTimeout(() => {
      this.props.superReducer({ call: 'SET', data: 'none' });
    }, 250);
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
      if (this.props.store.make_a_trip_title !== '') {
        this.updateState();
      } else {
        swal('Please set a Trip name before continuing!');
      }
    };

    if (this.state.tripStarted === false) {
      this.ButtonToRender = <></>;
      if (this.props.store.make_a_trip_title.data !== '') {
        AddLocationItem();
      }
    } else {
      this.ButtonToRender = (
        <span>
          <ListItem
            button
            style={{
              backgroundColor: '#56315C',
              textAlign: 'center',
              width: '50%',
              display: 'inline-block',
              boxShadow: '0 2px 8px #ac61b9',
              borderBottom: '2px #D5B0DC solid',
              borderTop: '2px #D5B0DC solid',
              borderRight: '1px #D5B0DC solid',
            }}
            onClick={AddLocationItem}
          >
            <ListItemText primary="Add Location" />
          </ListItem>

          <ListItem
            button
            style={{
              backgroundColor: '#56315C',
              textAlign: 'center',
              width: '50%',
              display: 'inline-block',
              boxShadow: '0 2px 8px #ac61b9',
              borderBottom: '2px #D5B0DC solid',
              borderTop: '2px #D5B0DC solid',
              borderLeft: '1px #D5B0DC solid',
            }}
            onClick={this.saveClick}
          >
            <ListItemText primary="Save" />
          </ListItem>
        </span>
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
          style={{
            backgroundColor: '#AC61B9',
            boxShadow: '0 8px 4px #00000033',
            marginTop: '-8px',
            marginBottom: '-8px',
            borderBottom: '3px solid #D5B0DC',
          }}
          onClick={this.closeClick}
        >
          <ListItemIcon>
            <CancelIcon />
          </ListItemIcon>
          <ListItemText primary="Close" />
        </ListItem>
        <div className="leaderboards-box-content">
          <h2
            style={{
              marginTop: '33px',
              marginBottom: '25px',
              color: '#F5EBF6',
            }}
          >
            MAKE A TRIP
          </h2>
        </div>
        <MakeATripTitle />
        {this.ComponentToRender}
        {this.ButtonToRender}
      </>
    );
  }
}

export default connect(mapStoreToProps)(NavSearch);
