import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import TextField from '@material-ui/core/TextField';
import { Marker } from 'react-map-gl';

class MapMarkerMap extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'GET_LOCATION' });
  }
  render() {
    return <></>;
  }
}

export default connect(mapStoreToProps)(MapMarkerMap);
