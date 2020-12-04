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

// import swal from 'sweetalert';
import './EditATrip.css';

class NavSearch extends Component {
  state = {
    tripStarted: false,
    render: false,
  };
  closeClick = () => {
    this.props.superReducer({ call: 'SET', data: 'none' });
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
            <EditATripItem location={this.props.store.trip_locations[i]} />
          </>
        );
      }
    }

    this.ButtonToRender = (
      <span>
        <ListItem
          button
          style={{
            backgroundColor: '#56315C',
            textAlign: 'center',
            width: '100%',
            display: 'inline-block',
            boxShadow: '0 2px 2px #ac61b9',
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

    if (this.state.render === true) {
      this.ComponentToRender = (
        <>
          <EditATripItem updateStateByProp={this.updateStateByProp} />
          {this.ComponentToRender}
        </>
      );
      this.falseState();
    }
    return (
      <div
        style={{
          boxShadow: '0 2px 8px #AC61B9',
          borderBottom: '1px solid #D5B0DC',
          backgroundColor: '#283C5E',
        }}
      >
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
        <EditATripTitle superReducer={this.props.superReducer} />
        {this.ComponentToRender}

        {this.ButtonToRender}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(NavSearch);
