/*-----> CORE <-----*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import MapGL, { Marker } from 'react-map-gl';
/*-----> CORE <-----*/

const markerIcon = require('./mapbox-icon.png');

/*-----> MATERIAL-UI <-----*/

/*-----> MATERIAL-UI <-----*/

class MARKERS extends Component {
  getDetails = () => {
    console.log(this.props.item);
  };
  render() {
    return (
      <Marker
        key={this.props.index}
        longitude={this.props.item.long}
        latitude={this.props.item.lat}
        offsetTop={-this.props.size / 2}
        offsetLeft={-this.props.size / 2}
      >
        <img
          onClick={this.getDetails}
          className="onHoverMarker"
          src={markerIcon}
          style={{
            width: this.props.size,
            height: this.props.size,
          }}
        />
      </Marker>
    );
  }
}

export default connect(mapStoreToProps)(MARKERS);
