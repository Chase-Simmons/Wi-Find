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
import EditATripItem from './EditATripItem';
import EditATripTitle from './EditATripTitle';
/*-----> COMPONENT <-----*/

import swal from 'sweetalert';
import './EditATrip.css';
import MakeATripItem from '../MakeATrip/MakeATripItem';

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
  render() {
    this.ComponentToRender = <></>;
    for (let i = 0; i < this.props.store.trip_locations.length; i++) {
      if (
        this.props.store.current_edit ===
        this.props.store.trip_locations[i].trip_id
      ) {
        console.log(this.props.store.trip_locations[i]);
        this.ComponentToRender = (
          <>
            {this.ComponentToRender}
            <MakeATripItem location={this.props.store.trip_locations[i]} />
          </>
        );
      }
    }

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
              backgroundColor: '#b5ffb6',
              textAlign: 'center',

              borderBottom: '2px #222222 solid',
              borderTop: '2px #222222 solid',
              borderLeft: '1px #222222 solid',
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
          <EditATripItem updateStateByProp={this.updateStateByProp} />
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
            backgroundColor: '#ffc8b5',
            marginTop: '-8px',
            marginBottom: '-8px',
          }}
          onClick={this.closeClick}
        >
          <ListItemIcon>
            <CancelIcon />
          </ListItemIcon>
          <ListItemText primary="Close" />
        </ListItem>
        <EditATripTitle superReducer={this.props.superReducer} />
        {this.ComponentToRender}

        {this.ButtonToRender}
      </>
    );
  }
}

export default connect(mapStoreToProps)(NavSearch);
