import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import MAP from 'react-map-gl';

import './MapBox.css';

function MapBox() {
  const [viewport, setViewport] = useState({
    latitude: 39.0997,
    longitude: 94.5786,
    zoom: 2,
    width: '100vw',
    height: '100vh',
  });

  return (
    <div className="mapbox-container">
      <MAP
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
        mapStyle="mapbox://styles/hiraeth/ckho0ufkv1dwd19lf96s6vfu8"
      ></MAP>
    </div>
  );
}

export default connect(mapStoreToProps)(MapBox);
