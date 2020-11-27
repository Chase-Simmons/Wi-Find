import React, { Component } from 'react';

export default class TripStops extends Component {
  render() {
    const Props = this.props;
    let foundLocations = 0;

    for (let i = 0; i < Props.locations.length; i++) {
      if (Props.locations[i].trip_id === Props.trip.id) {
        foundLocations++;
      }
    }

    return <p>Stops: {foundLocations}</p>;
  }
}
