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
import TextField from '@material-ui/core/TextField';
/*-----> MATERIAL-UI <-----*/

import axios from 'axios';
import './Speedtest.css';

/*-----> COMPONENTS <-----*/

/*-----> COMPONENTS <-----*/

const loading = require('./loading.gif');
/*-----> SPEEDTEST-API <-----*/
const FastSpeedtest = require('fast-speedtest-api');
const speedtestToken = process.env.REACT_APP_SPEEDTEST_TOKEN;
let speedtest = new FastSpeedtest({
  token: speedtestToken, // required
  verbose: false, // default: false
  timeout: 5000, // default: 5000
  https: false, // default: true
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

  /*-----> CHANGE TO SUBMIT <-----*/
  changeToSubmit = () => {
    this.setState({
      ...this.state,
      testRan: 'submit',
    });
  };
  /*-----> CHANGE TO SUBMIT <-----*/

  /*-----> ON SUBMIT <-----*/
  submitLocation = () => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const search_url = encodeURI(this.state.address);
    const openCageURL = `https://api.opencagedata.com/geocode/v1/json?q=${search_url}&key=${process.env.REACT_APP_OPEN_CAGE}&language=en&pretty=1`;

    axios.get(openCageURL, config).then((response) => {
      const geocode = response.data.results[0].geometry;

      console.log(
        geocode,
        this.props.store.SSID,
        this.props.store.locations,
        this.state.location_name
      );

      this.props.dispatch({
        type: 'POST_LOCATION',
        payload: {
          long: geocode.lng,
          lat: geocode.lat,
          SSID: this.props.store.SSID,
          location_name: this.state.location_name,
        },
      });

      /*-----> WIP CONDITIONAL <-----*/
      // for (let i = 0; i < this.props.store.locations.length; i++) {
      //   if (
      //     geocode.lng - this.props.store.locations[i].long < -0.01 ||
      //     0.01 > geocode.lng - this.props.store.locations[i].long
      //   ) {
      //     if (
      //       geocode.lat - this.props.store.locations[i].lat < -0.01 ||
      //       0.01 > geocode.lat - this.props.store.locations[i].lat
      //     ) {
      //       // console.log(geocode.lng - this.props.store.locations[i].long);
      //       // console.log(geocode.lat - this.props.store.locations[i].lat);

      //       if (
      //         this.props.store.SSID !== this.props.store.locations[i].wifi_name
      //       ) {
      //       }
      //     }
      //   }
      // }
    });

    this.setState(
      {
        testRan: 'thank',
      },
      () => {
        setTimeout(() => {
          this.setState({
            testRan: 'false',
          });
        }, 2000);
      }
    );
  };

  /*-----> ON SUBMIT <-----*/

  /*-----> INPUT CHANGE <-----*/
  inputChange = (key) => (event) => {
    this.setState({
      ...this.state,
      [key]: event.target.value,
    });
  };
  /*-----> INPUT CHANGE <-----*/

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
    } else if (this.state.testRan === 'true') {
      Content = (
        <>
          <div>
            <h3>{this.state.speed}</h3>
          </div>
          <div>
            <h4>Would you like to submit your speed?</h4>
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={this.changeToSubmit}
            >
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
    } else if (this.state.testRan === 'submit') {
      Content = (
        <>
          <div>
            <h3>{this.state.speed}</h3>
          </div>
          <div>
            <TextField
              label="Enter Name of Location"
              variant="filled"
              onChange={this.inputChange('location_name')}
            ></TextField>
          </div>
          <div>
            <TextField
              label="Enter Full Address"
              variant="filled"
              onChange={this.inputChange('address')}
            ></TextField>
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={this.submitLocation}
              style={{ marginTop: '10px' }}
            >
              {' '}
              SUBMIT{' '}
            </Button>
          </div>
        </>
      );
    } else if (this.state.testRan === 'thank') {
      Content = (
        <div>
          <h3>Thank You!</h3>
        </div>
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
