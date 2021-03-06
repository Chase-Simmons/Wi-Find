import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import LoginForm from '../../components/LoginForm/LoginForm';

class LoginPage extends Component {
  render() {
    return (
      <div className="fix-over-nav">
        <div className="profile">
          <div
            className="profile-content"
            style={{ backgroundColor: '#85A3C6' }}
          >
            <div style={{ marginTop: '150px' }}>
              <LoginForm />
              <center>
                <button
                  type="button"
                  className="btn btn_asLink"
                  onClick={() => {
                    this.props.history.push('/registration');
                  }}
                >
                  Register
                </button>
              </center>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LoginPage);
