/*-----> CORE <-----*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
/*-----> CORE <-----*/

/*-----> MATERIAL-UI <-----*/
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
/*-----> MATERIAL-UI <-----*/

import './ProfilePage.css';

class ProfilePage extends Component {
  state = {
    stats: null,
  };
  /*-----> ON LOAD SET STATE <-----*/
  componentDidMount() {
    this.loadData();
  }
  /*-----> ON LOAD SET STATE <-----*/

  /*-----> REDUCER -> STATE <-----*/
  loadData() {
    this.setState({
      stats: this.props.store.user_stats,
    });
  }
  /*-----> REDUCER -> STATE <-----*/
  render() {
    /*-----> PROGRESSION CALCULATION <-----*/
    console.log(this.props.store.user_stats.points);
    let userPoints = this.props.store.user_stats.points;
    let userSpeedtest = this.props.store.user_stats.unique_speedtest;
    let userConnection = this.props.store.user_stats.unique_connection;
    let pointsTier = 1;
    let speedtestTier = 1;
    let connectionTier = 1;
    let pointsNeeded = 20;
    let lastPointsNeeded = 0;
    let speedtestNeeded = 5;
    let lastSpeedtestNeeded = 0;
    let connectionNeeded = 8;
    let lastConnectionNeeded = 0;

    const TierHandler = () => {
      if (userPoints >= pointsNeeded) {
        pointsTier++;
        lastPointsNeeded = pointsNeeded;
        pointsNeeded = parseInt(pointsNeeded ** 1.01 + 10);
        TierHandler();
      }
      if (userSpeedtest >= speedtestNeeded) {
        speedtestTier++;
        lastSpeedtestNeeded = speedtestNeeded;
        speedtestNeeded = parseInt(speedtestNeeded ** 1.01 + 2);
        TierHandler();
      }
      if (userConnection >= connectionNeeded) {
        connectionTier++;
        lastConnectionNeeded = connectionNeeded;
        connectionNeeded = parseInt(connectionNeeded ** 1.01 + 3);
        TierHandler();
      }
    };
    TierHandler();
    const pointProgress = Math.floor(
      ((userPoints - lastPointsNeeded) / (pointsNeeded - lastPointsNeeded)) *
        100
    );
    const speedtestProgress = Math.floor(
      ((userSpeedtest - lastSpeedtestNeeded) /
        (speedtestNeeded - lastSpeedtestNeeded)) *
        100
    );
    const connectionProgress = Math.floor(
      ((userConnection - lastConnectionNeeded) /
        (connectionNeeded - lastConnectionNeeded)) *
        100
    );

    /*-----> PROGRESSION CALCULATION <-----*/
    return (
      <>
        {/*  */}
        <ListItem>
          <ListItemText>
            <Box
              style={{
                display: 'inline-block',
                alignItems: 'center',
                width: '100%',
              }}
              mr={1}
            >
              <Box className="profile-list-item-block">
                <Box style={{ width: '20%' }}>
                  <h4>Points</h4>
                </Box>
                <Box style={{ width: '10%' }}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{
                      marginLeft: '10px',
                      fontWeight: 'bold',
                      verticalAlign: 'middle',
                      height: '15px',
                      marginTop: '22px',
                    }}
                  >
                    {`${this.props.store.user_stats.points} / ${pointsNeeded}`}
                  </Typography>
                </Box>
                <Box style={{ width: '65%' }}>
                  <p className="profile-stats-tier">Tier : {pointsTier}</p>
                  <LinearProgress
                    color="primary"
                    style={{
                      backgroundColor: '#75757580',
                      verticalAlign: 'middle',
                      height: '15px',
                      marginTop: '24px',
                      border: '2px solid #222222',
                      borderRadius: '10px',
                    }}
                    variant="determinate"
                    value={pointProgress}
                  />
                </Box>
                <Box style={{ width: '5%' }}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{
                      marginLeft: '10px',
                      fontWeight: 'bold',
                      verticalAlign: 'middle',
                      height: '15px',
                      marginTop: '21px',
                    }}
                  >{`${Math.round(pointProgress)}%`}</Typography>
                </Box>
              </Box>
            </Box>
          </ListItemText>
        </ListItem>
        {/*  */}
        <ListItem>
          <ListItemText>
            <Box
              style={{
                display: 'inline-block',
                alignItems: 'center',
                width: '100%',
              }}
              mr={1}
            >
              <Box className="profile-list-item-block">
                <Box style={{ width: '20%' }}>
                  <h4>Unique Speedtest</h4>
                </Box>
                <Box style={{ width: '10%' }}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{
                      marginLeft: '10px',
                      fontWeight: 'bold',
                      verticalAlign: 'middle',
                      height: '15px',
                      marginTop: '22px',
                    }}
                  >
                    {`${this.props.store.user_stats.unique_speedtest} / ${speedtestNeeded}`}
                  </Typography>
                </Box>
                <Box style={{ width: '65%' }}>
                  <p className="profile-stats-tier">Tier : {speedtestTier}</p>
                  <LinearProgress
                    color="primary"
                    style={{
                      backgroundColor: '#75757580',
                      verticalAlign: 'middle',
                      height: '15px',
                      marginTop: '24px',
                      border: '2px solid #222222',
                      borderRadius: '10px',
                    }}
                    variant="determinate"
                    value={speedtestProgress}
                  />
                </Box>
                <Box style={{ width: '5%' }}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{
                      marginLeft: '10px',
                      fontWeight: 'bold',
                      verticalAlign: 'middle',
                      height: '15px',
                      marginTop: '21px',
                    }}
                  >{`${Math.round(speedtestProgress)}%`}</Typography>
                </Box>
              </Box>
            </Box>
          </ListItemText>
        </ListItem>
        {/* */}
        <ListItem>
          <ListItemText>
            <Box
              style={{
                display: 'inline-block',
                alignItems: 'center',
                width: '100%',
              }}
              mr={1}
            >
              <Box className="profile-list-item-block">
                <Box style={{ width: '20%' }}>
                  <h4 style={{ fontWeight: 'bold' }}>Unique Connection</h4>
                </Box>
                <Box style={{ width: '10%' }}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{
                      marginLeft: '10px',
                      fontWeight: 'bold',
                      verticalAlign: 'middle',
                      height: '15px',
                      marginTop: '23px',
                    }}
                  >
                    {`${this.props.store.user_stats.unique_connection} / ${connectionNeeded}`}
                  </Typography>
                </Box>
                <Box style={{ width: '65%' }}>
                  <p className="profile-stats-tier">Tier : {connectionTier}</p>
                  <LinearProgress
                    color="primary"
                    style={{
                      backgroundColor: '#75757580',
                      verticalAlign: 'middle',
                      height: '15px',
                      marginTop: '25px',
                      border: '2px solid #222222',
                      borderRadius: '10px',
                    }}
                    variant="determinate"
                    value={connectionProgress}
                  />
                </Box>
                <Box style={{ width: '5%' }}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{
                      marginLeft: '10px',
                      fontWeight: 'bold',
                      verticalAlign: 'middle',
                      height: '15px',
                      marginTop: '22px',
                    }}
                  >{`${Math.round(connectionProgress)}%`}</Typography>
                </Box>
              </Box>
            </Box>
          </ListItemText>
        </ListItem>
        {/*  */}
      </>
    );
  }
}

export default connect(mapStoreToProps)(ProfilePage);
