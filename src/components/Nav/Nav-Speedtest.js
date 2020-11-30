/*-----> CORE <-----*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
/*-----> CORE <-----*/

/*-----> MATERIAL-UI <-----*/
// import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SpeedIcon from '@material-ui/icons/Speed';
/*-----> MATERIAL-UI <-----*/

const FastSpeedtest = require('fast-speedtest-api');

const speedtestToken = process.env;

let speedtest = new FastSpeedtest({
  token: 'YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm', // required
  verbose: true, // default: false
  timeout: 10000, // default: 5000
  https: true, // default: true
  urlCount: 5, // default: 5
  bufferSize: 8, // default: 8
  unit: FastSpeedtest.UNITS.Mbps, // default: Bps
  proxy: 'https://api.fast.com',
});

class NavSpeedtest extends Component {
  getSpeed = () => {
    speedtest
      .getSpeed({ mode: 'no-cors' })
      .then((s) => {
        console.log(`Speed: ${s} Mbps`);
      })
      .catch((e) => {
        console.error(e.message);
      });
  };
  render() {
    console.log(speedtestToken);
    console.log(speedtest.getSpeed);

    return (
      <ListItem button onClick={this.getSpeed}>
        <ListItemIcon>
          <SpeedIcon />
        </ListItemIcon>
        <ListItemText primary="Speedtest" />
      </ListItem>
    );
  }
}

export default connect(mapStoreToProps)(NavSpeedtest);
