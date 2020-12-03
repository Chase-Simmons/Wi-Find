/*-----> CORE <-----*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Marker } from 'react-map-gl';
/*-----> CORE <-----*/

import './mapbox-gl.css';

/*-----> MATERIAL-UI <-----*/

/*-----> MATERIAL-UI <-----*/

const markerIcon = require('./mapbox-icon.png');

class MARKERS extends Component {
  state = {
    popup: false,
    speed: 0,
  };

  componentDidMount() {
    let total = 0;
    for (let i = 0; i < this.props.item.avg_speed.length; i++) {
      total = total + this.props.item.avg_speed[i];
    }
    total = total / this.props.item.avg_speed.length;
    this.setState({
      ...this.state,
      speed: total.toFixed(2),
    });
  }
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

  openGoogle = () => {
    window.open(
      `https://www.google.com/maps/place/${this.props.item.location_address}`
    );
  };
  render() {
    let PopUp = <></>;
    let Style = {};

    if (this.state.popup === true) {
      Style = {
        filter: 'grayscale(100%)',
        filter: 'brightness(100)',
        border: '2px solid #e6e6e600',
      };
      PopUp = (
        <div
          className="marker-popup"
          style={{
            marginLeft: -this.props.size * 4,
            marginTop: -this.props.size * 6,
            width: this.props.size * 9,
            height: this.props.size * 6,
            zIndex: this.props.key,
          }}
        >
          <div
            className="popup-content"
            style={{ marginTop: `${this.props.size * 0.5}px` }}
          >
            <div>
              <h5
                style={{
                  fontSize: this.props.size / 3.5 + 2,
                  marginBottom: `${this.props.size * 1.4}px`,
                }}
                className="popup-item"
              >
                LOCATION : {this.props.item.location_name}
              </h5>
            </div>
            <div>
              <h5
                style={{
                  fontSize: this.props.size / 3.5 + 2,
                  marginBottom: `${this.props.size * 1.4}px`,
                }}
                className="popup-item"
                onClick={this.openGoogle}
              >
                ADDRESS :{' '}
                <span style={{ color: 'blue' }} className="linkHover">
                  {this.props.item.location_address}
                </span>
              </h5>
            </div>
            <div>
              <h5
                style={{ fontSize: this.props.size / 3.5 + 2 }}
                className="popup-item"
              >
                AVERAGE WI-FI SPEED : {this.state.speed} Mbps
              </h5>
            </div>
          </div>
        </div>
      );
    }

    return (
      <Marker
        key={this.props.item.id}
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
            ...Style,
            width: this.props.size,
            height: this.props.size,
          }}
        />
      </Marker>
    );
  }
}

export default connect(mapStoreToProps)(MARKERS);
