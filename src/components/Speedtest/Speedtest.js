/*-----> CORE <-----*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
/*-----> CORE <-----*/

/*-----> MATERIAL-UI <-----*/
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
/*-----> MATERIAL-UI <-----*/

import './Speedtest.css';

/*-----> COMPONENTS <-----*/

/*-----> COMPONENTS <-----*/

const loading = require('./loading.gif');
/*-----> SPEEDTEST-API <-----*/
const FastSpeedtest = require('fast-speedtest-api');
const speedtestToken = process.env.REACT_APP_SPEEDTEST_TOKEN;
let speedtest = new FastSpeedtest({
  token: speedtestToken, // required
  verbose: true, // default: false
  timeout: 5000, // default: 5000
  https: true, // default: true
  urlCount: 5, // default: 5
  bufferSize: 8, // default: 8
  unit: FastSpeedtest.UNITS.Mbps, // default: Bps
});
/*-----> SPEEDTEST-API <-----*/

class Speedtest extends Component {
  state = {
    speed: 'running test...',
    testRan: 'false',
  };
  /*-----> ON CLICK CLOSE CONTENT WINDOW <-----*/
  closeClick = () => {
    this.props.superReducer({ call: 'SET', data: 'none' });
  };
  /*-----> ON CLICK CLOSE CONTENT WINDOW <-----*/

  /*-----> SET STATE TO ALERT MODE -> RUN SPEEDTEST <-----*/
  getSpeedAlerter = () => {
    this.setState(
      {
        testRan: 'running',
      },
      () => {
        this.getSpeed();
      }
    );
  };
  /*-----> SET STATE TO ALERT MODE -> RUN SPEEDTEST <-----*/

  /*-----> SPEEDTEST FUNCTION <-----*/
  getSpeed = () => {
    speedtest
      .getSpeed()
      .then((s) => {
        this.setState(
          {
            testRan: 'true',
            speed: `Your speed is: ${s} Mbps`,
          },
          () => {
            console.log(this.state.speed);
          }
        );
      })
      .catch((e) => {
        console.error(e.message);
      });
  };
  /*-----> SPEEDTEST FUNCTION <-----*/

  render() {
    let Content;
    if (this.state.testRan === 'false') {
      Content = (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={this.getSpeedAlerter}
          >
            {' '}
            START TEST{' '}
          </Button>
        </div>
      );
    } else if (this.state.testRan === 'running') {
      Content = (
        <>
          <div className="speedtest-loader">
            <img src={loading} className="speedtest-gif" />
          </div>
        </>
      );
    } else {
      Content = (
        <>
          <div>
            <h3>{this.state.speed}</h3>
          </div>
          <div>
            <h4>Would you like to submit your speed?</h4>
          </div>
          <div>
            <Button variant="contained" color="primary">
              {' '}
              YES{' '}
            </Button>
            <span> </span>
            <Button
              variant="contained"
              color="primary"
              onClick={this.closeClick}
            >
              {' '}
              NO{' '}
            </Button>
          </div>
        </>
      );
    }
    return (
      <>
        <ListItem
          button
          style={{
            backgroundColor: '#ffc8b5',
            marginTop: '-8px',
            marginBottom: '-8px',
            borderBottom: '1px #222222 solid',
          }}
          onClick={this.closeClick}
        >
          <ListItemIcon>
            <CancelIcon />
          </ListItemIcon>
          <ListItemText primary="Close" />
        </ListItem>
        <div className="speedtest-box">
          <div className="speedtest-box-content">
            <div>
              <h2 style={{ marginTop: '25px' }}>SPEEDTEST</h2>
            </div>
            {Content}
          </div>
        </div>
      </>
    );
  }
}

export default connect(mapStoreToProps)(Speedtest);
