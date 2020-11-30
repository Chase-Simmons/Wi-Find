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

import swal from 'sweetalert';

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
  // proxy: 'http://localhost:3000',
});

let speed = 'running test...';

class NavSpeedtest extends Component {
  state = {
    speedAlert: false,
  };
  getSpeedAlerter = () => {
    this.setState(
      {
        speedAlert: true,
      },
      () => {
        this.getSpeed();
      }
    );
  };

  getSpeed = () => {
    speedtest
      .getSpeed()
      .then((s) => {
        speed = `Speed: ${s} Mbps`;
        console.log(speed);
      })
      .catch((e) => {
        console.error(e.message);
      });
  };

  render() {
    let speedbox = <></>;
    if (this.state.speedAlert === true) {
      speedbox = () => (
        <div className="speedAlert">
          <h1>hello</h1>
        </div>
      );
    } else {
      speedbox = () => (
        <div
          style={{
            width: '400px',
            height: '250px',
            border: '2px solid black',
            background: 'black',
          }}
        ></div>
      );
    }
    return (
      <>
        {speedbox}
        <ListItem button onClick={this.getSpeedAlerter}>
          <ListItemIcon>
            <SpeedIcon />
          </ListItemIcon>
          <ListItemText primary="Speedtest" />
        </ListItem>
      </>
    );
  }
}

export default connect(mapStoreToProps)(NavSpeedtest);
