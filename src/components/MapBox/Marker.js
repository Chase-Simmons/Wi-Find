/*-----> CORE <-----*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Marker } from 'react-map-gl';
/*-----> CORE <-----*/

const markerIcon = require('./mapbox-icon.png');

/*-----> MATERIAL-UI <-----*/

/*-----> MATERIAL-UI <-----*/

class MARKERS extends Component {
  state = {
    popup: false,
  };
  getDetails = () => {
    console.log(this.props.item);
    if (this.state.popup === false) {
      this.setState({
        popup: true,
      });
    } else {
      this.setState({
        popup: false,
      });
    }
  };
  render() {
    let PopUp = <></>;

    if (this.state.popup === true) {
      PopUp = (
        <div
          className="marker-popup"
          style={{
            marginLeft: -this.props.size * 2.5,
            marginTop: -this.props.size * 4,
            width: this.props.size * 6,
            height: this.props.size * 4,
          }}
        >
          <p>hello</p>
        </div>
      );
    }

    return (
      <Marker
        key={this.props.key}
        longitude={this.props.item.long}
        latitude={this.props.item.lat}
        offsetTop={-this.props.size / 2}
        offsetLeft={-this.props.size / 2}
      >
        {PopUp}
        <img
          alt={this.props.key}
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
