import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Grid from '@material-ui/core/Grid';

import './SpeedtestPage.css';

class SpeedtestPage extends Component {
  render() {
    return (
      <div className="fix-over-nav">
        <div className="speedtest">
          <div className="speedtest-content">
            <h1>Speedtest!</h1>
            <button>Start!</button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(SpeedtestPage);
