import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import './ProfilePage.css';

class ProfilePage extends Component {
  render() {
    return (
      <div className="fix-over-nav">
        <div className="profile">
          <div className="profile-content">
            <h1>Hello Worldefgwgegg!</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ProfilePage);
