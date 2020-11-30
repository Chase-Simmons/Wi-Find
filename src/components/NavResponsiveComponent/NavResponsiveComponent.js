/*-----> CORE <-----*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
/*-----> CORE <-----*/

/*-----> COMPONENTS <-----*/
import MakeATrip from '../MakeATrip/MakeATrip';
import EditATrip from '../EditATrip/EditATrip';
import MyTrips from '../MyTrips/MyTrips';
import Leaderboards from '../Leaderboards/Leaderboards';
/*-----> COMPONENTS <-----*/

class NavResponsiveComponent extends Component {
  state = {
    type: 'none',
    reload: true,
  };

  /*-----> CALLS FOR STATE UPDATE <-----*/
  callReload = (data) => {
    this.setState({
      type: data.type,
      reload: true,
    });
  };
  /*-----> CALLS FOR STATE UPDATE <-----*/
  render() {
    /*-----> DETERMINES WHAT WILL RENDER <-----*/
    let ComponentToRender;
    /*-----> DETERMINES WHAT WILL RENDER <-----*/

    /*-----> CHECKS SUPERREDUCER COMPONENT TO SEE IF A UPDATE IS NEEDED <-----*/
    if (this.state.reload === true) {
      setTimeout(() => {
        if (this.props.superReducer({ call: 'GET' }) === 'make') {
          this.callReload({ type: 'make' });
        } else if (this.props.superReducer({ call: 'GET' }) === 'edit') {
          this.callReload({ type: 'edit' });
        } else if (this.props.superReducer({ call: 'GET' }) === 'my_trips') {
          this.callReload({ type: 'my_trips' });
        } else if (
          this.props.superReducer({ call: 'GET' }) === 'leaderboards'
        ) {
          this.callReload({ type: 'leaderboards' });
        } else {
          this.callReload({ type: 'none' });
        }
      }, 250);
    }
    /*-----> CHECKS SUPER-REDUCER COMPONENT TO SEE IF A UPDATE IS NEEDED <-----*/

    /*-----> CONDITION RENDER FROM SUPER-REDUCER <-----*/
    if (this.state.type === 'make') {
      ComponentToRender = <MakeATrip superReducer={this.props.superReducer} />;
    } else if (this.state.type === 'edit') {
      ComponentToRender = <EditATrip superReducer={this.props.superReducer} />;
    } else if (this.state.type === 'my_trips') {
      ComponentToRender = <MyTrips superReducer={this.props.superReducer} />;
    } else if (this.state.type === 'leaderboards') {
      ComponentToRender = (
        <Leaderboards superReducer={this.props.superReducer} />
      );
    } else if (this.state.type === 'none') {
      ComponentToRender = <></>;
    }
    return <>{ComponentToRender}</>;
    /*-----> CONDITION RENDER FROM SUPER-REDUCER <-----*/
  }
}

export default connect(mapStoreToProps)(NavResponsiveComponent);
