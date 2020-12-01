/*-----> CORE <-----*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
/*-----> CORE <-----*/

/*-----> MATERIAL-UI <-----*/
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
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
    /*-----> PROGRESSION CALCULATION [NOT COMPLETE] <-----*/
    const tier1 = 200;
    const pointProgress = (this.props.store.user_stats.points / tier1) * 100;
    const connectionProgress =
      (this.props.store.user_stats.unique_connection / tier1) * 100;
    const speedtestProgress =
      (this.props.store.user_stats.unique_speedtest / tier1) * 100;
    /*-----> PROGRESSION CALCULATION [NOT COMPLETE] <-----*/
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
                  <h4>Points UniqueTest </h4>
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
                    {`${this.props.store.user_stats.points} / ${tier1}`}
                  </Typography>
                </Box>
                <Box style={{ width: '65%' }}>
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
                    {`${this.props.store.user_stats.unique_speedtest} / ${tier1}`}
                  </Typography>
                </Box>
                <Box style={{ width: '65%' }}>
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
                    {`${this.props.store.user_stats.unique_connection} / ${tier1}`}
                  </Typography>
                </Box>
                <Box style={{ width: '65%' }}>
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
