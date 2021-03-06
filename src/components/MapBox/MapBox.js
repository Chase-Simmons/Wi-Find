/*-----> CORE <-----*/
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import * as React from 'react';
import { Component } from 'react';
/*-----> CORE <-----*/

/*-----> REACT-MAP-GL <-----*/
import MapGL from 'react-map-gl';
/*-----> REACT-MAP-GL <-----*/

import './mapbox-gl.css';
import MarkerComponent from './Marker';

/*-----> TOKEN/MARKER IMG <-----*/
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
/*-----> TOKEN/MARKER IMG <-----*/

class MapBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationArray: [],
      viewport: {
        latitude: 39.0997,
        longitude: -94.5786,
        zoom: 8,
        width: '100vw',
        height: '100vh',
        bearing: 0,
        pitch: 45,
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
  };

  render() {
    if (this.props.store.cordReducer.updateNeeded) {
      this.forceUpdate();
    }

    let size;

    if (this.state.viewport.zoom < 9) {
      size = 0;
    } else {
      size = (this.state.viewport.zoom - 5) ** 2 / 4 + 25;
    }

    const MARKERS = this.props.store.locations.map((item, index) => {
      return <MarkerComponent item={item} key={index} size={size} />;
    });
    // console.log(size, this.state.viewport.zoom);
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
          {MARKERS}
        </MapGL>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(MapBox);
