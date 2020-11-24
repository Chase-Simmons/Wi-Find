import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import LogOutButton from '../../components/LogOutButton/LogOutButton';
import Grid from '@material-ui/core/Grid';

import './SpeedtestPage.css';

class SpeedtestPage extends Component {
  state = {
    stats: null, //This is what our data will eventually be loaded into
  };

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    this.setState({
      stats: this.props.store.user_stats,
    });
  }

  render() {
    console.log(this.state);
    if (this.state.stats === null) {
      return <div />;
    }

    return (
      <div className="fix-over-nav">
        <div className="speedtest">
          <div className="speedtest-content">
            <Grid container>
              <Grid container>
                <Grid item xs={2}></Grid>
                <Grid item xs={7}>
                  <h1 id="welcome">
                    Welcome, {this.props.store.user.username}!
                  </h1>
                  <h2>Title</h2>
                </Grid>
                <Grid item xs={3}>
                  <h1 id="rank">Rank: {this.props.store.user_stats.rank}</h1>
                  <LogOutButton className="log-in" />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <h1>My Trips:</h1>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <h1>Trips</h1>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(SpeedtestPage);
