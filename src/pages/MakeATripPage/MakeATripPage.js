import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import './MakeATripPage.css';

class MakeATripPage extends Component {
  render() {
    return (
      <div className="fix-over-nav">
        <div className="make-a-trip">
          <div className="make-a-trip-content">
            <h1>Hello World!</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(MakeATripPage);
