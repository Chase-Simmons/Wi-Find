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
            speedNum: s,
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

      /*-----> ASSIGN SPEEDTEST TO LOCATION BY FILTERING <-----*/

      let match = false;
      for (let i = 0; i < this.props.store.locations.length; i++) {
        if (this.props.store.SSID === this.props.store.locations[i].wifi_name) {
          match = true;
          if (
            geocode.lng - this.props.store.locations[i].long > -0.001 &&
            0.001 > geocode.lng - this.props.store.locations[i].long
          ) {
            match = true;
            if (
              geocode.lat - this.props.store.locations[i].lat > -0.001 &&
              0.001 > geocode.lat - this.props.store.locations[i].lat
            ) {
              match = true;
              this.props.dispatch({
                type: 'POST_SPEEDTEST',
                payload: {
                  user_id: this.props.store.user.id,
                  location_id: this.props.store.locations[i].id,
                  speed: this.state.speedNum,
                },
              });

              this.props.dispatch({
                type: 'PUT_USER_STATS',
                payload: {
                  id: this.props.store.user.id,
                  avatar: this.props.store.user_stats.avatar,
                  points: this.props.store.user_stats.points + 1,
                  speedtest: this.props.store.user_stats.unique_speedtest,
                  connection: this.props.store.user_stats.unique_connection,
                },
              });
              return;
            } else {
              match = false;
            }
          } else {
            match = false;
          }
        } else {
          match = false;
        }
      }
      if (match === false) {
        this.props.dispatch({
          type: 'POST_LOCATION',
          payload: {
            long: geocode.lng,
            lat: geocode.lat,
            SSID: this.props.store.SSID,
            location_name: this.state.location_name,
            location_address: this.state.address,
            user_id: this.props.store.user.id,
            speed: this.state.speedNum,
          },
        });
        this.props.dispatch({
          type: 'PUT_USER_STATS',
          payload: {
            id: this.props.store.user.id,
            avatar: this.props.store.user_stats.avatar,
            points: this.props.store.user_stats.points + 10,
            speedtest: this.props.store.user_stats.unique_speedtest,
            connection: this.props.store.user_stats.unique_connection,
          },
        });
      }
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
          <div
            className="speedtest-loader"
            style={{
              borderBottom: '1px solid #D5B0DC',
              borderTop: '1px solid #D5B0DC',
            }}
          >
            <img src={loading} className="speedtest-gif" alt="loadingCircle" />
          </div>
        </>
      );
    } else if (this.state.testRan === 'true') {
      Content = (
        <>
          <div>
            <h3 style={{ color: '#F5EBF6' }}> {this.state.speed}</h3>
          </div>
          <div>
            <h4 style={{ color: '#F5EBF6' }}>
              Would you like to submit your speed?
            </h4>
          </div>
          <div style={{ marginTop: '30px' }}>
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
          <div
            style={{
              backgroundColor: '#283C5E',
              boxShadow: '0 8px 4px #00000033',
              borderBottom: '3px solid #D5B0DC',
              borderTop: '3px solid #D5B0DC',
            }}
          >
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
          <h3 style={{ color: '#F5EBF6' }}>Thank You!</h3>
        </div>
      );
    }
    return (
      <>
        <ListItem
          button
          style={{
            backgroundColor: '#AC61B9',
            boxShadow: '0 8px 4px #00000033',
            marginTop: '-8px',
            marginBottom: '-8px',
            borderBottom: '3px solid #D5B0DC',
            color: '#F5EBF6',
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
              <h2
                style={{
                  marginTop: '33px',
                  marginBottom: '25px',
                  color: '#F5EBF6',
                }}
              >
                SPEEDTEST
              </h2>
            </div>
            {Content}
          </div>
        </div>
      </>
    );
  }
}

export default connect(mapStoreToProps)(Speedtest);
