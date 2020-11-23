import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import MapBox from '../MapBox/MapBox';

class LandingPage extends Component {
  render() {
    return <MapBox></MapBox>;
  }
}

export default connect(mapStoreToProps)(LandingPage);
