import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import * as React from 'react';
import { Component } from 'react';
import { render } from 'react-dom';
import { Marker } from 'react-map-gl';
import MapGL from 'react-map-gl';

import './mapbox-gl.css';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

class MapBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationArray: [],
      viewport: {
        latitude: 39.0997,
        longitude: -94.5786,
        zoom: 9,
        width: '100vw',
        height: '100vh',
        bearing: 0,
        pitch: 0,
      },
    };
  }

  viewportChange = (change) => {
    this.setState({
      ...this.state,
      viewport: change,
    });
  };

  clickMap = (event) => {
    console.log(event.lngLat);
  };

  forceUpdate() {
    this.props.dispatch({ type: 'MAP_FORCE_UPDATE_ENFORCED' });
    this.setState({
      ...this.state,
      markersLoaded: false,
      locationArray: this.props.store.locations,
      viewport: {
        ...this.state.viewport,
        latitude: this.props.store.cordReducer.lat,
        longitude: this.props.store.cordReducer.lng,
      },
    });
  }
  componentDidMount() {
    this.props.dispatch({ type: 'GET_LOCATION' });
  }
  getMarkers = () => {
    this.setState({
      ...this.state,
      locationArray: [this.props.store.locations],
    });
    console.log(this.state.locationArray);
  };

  render() {
    if (this.props.store.cordReducer.updateNeeded) {
      this.forceUpdate();
    }

    // const getMarkers = this.state.locationArray.map(function (item, index) {
    //   if (this.props.store.cordReducer.updateNeeded) {
    //     return (
    //       <Marker
    //         key={index}
    //         latitude={item.latitude}
    //         longitude={item.longitude}
    //       >
    //         <div>Wi-FI</div>
    //       </Marker>
    //     );
    //   }
    // });
    return (
      <div className="mapbox-container" onClick={this.getMarkers}>
        <MapGL
          {...this.state.viewport}
          width="100vw"
          height="100vh"
          mapStyle="mapbox://styles/hiraeth/ckho0ufkv1dwd19lf96s6vfu8"
          onViewportChange={this.viewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onClick={this.clickMap}
        >
          {/* {getMarkers} */}
        </MapGL>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(MapBox);
