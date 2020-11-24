import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Marker } from 'react-map-gl';
import * as React from 'react';
import { Component } from 'react';
import { render } from 'react-dom';
import MapGL from 'react-map-gl';

import './MapBox.css';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

class MapBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 39.0997,
        longitude: -94.5786,
        zoom: 6,
        width: '100vw',
        height: '100vh',
        bearing: 0,
        pitch: 0,
      },
    };
  }

  componentDidMount() {
    this.props.dispatch({ type: 'GET_LOCATION' });
  }
  render() {
    console.log(this.props.store.locations[1]);
    return (
      <div className="mapbox-container">
        <MapGL
          {...this.state.viewport}
          width="100vw"
          height="100vh"
          mapStyle="mapbox://styles/hiraeth/ckho0ufkv1dwd19lf96s6vfu8"
          onViewportChange={(viewport) => this.setState({ viewport })}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        >
          {/* {this.props.store.locations.map((item, index) => (
            <Marker key={index} item={item} onClick={this.onClick}>
              <div>Wi-Fi</div>
            </Marker>
          ))} */}
        </MapGL>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(MapBox);
