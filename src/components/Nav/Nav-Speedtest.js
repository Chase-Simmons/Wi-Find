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

const speedtestToken = process.env.REACT_APP_SPEEDTEST_TOKEN;

let speedtest = new FastSpeedtest({
  token: speedtestToken, // required
  verbose: true, // default: false
  timeout: 10000, // default: 5000
  https: false, // default: true
  urlCount: 5, // default: 5
  bufferSize: 8, // default: 8
  unit: FastSpeedtest.UNITS.Mbps, // default: Bps
  proxy: 'http://localhost:3000',
});

class NavSpeedtest extends Component {
  getSpeed = () => {
    speedtest
      .getSpeed()
      .then((s) => {
        console.log(`Speed: ${s} Mbps`);
      })
      .catch((e) => {
        console.error(e.message);
      });
  };

  render() {
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
