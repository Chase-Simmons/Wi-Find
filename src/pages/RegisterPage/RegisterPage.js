import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// CUSTOM COMPONENTS
import RegisterForm from '../../components/RegisterForm/RegisterForm';

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
  };

  render() {
    return (
      <div className="fix-over-nav">
        <div className="profile">
          <div
            className="profile-content"
            style={{ backgroundColor: '#85A3C6' }}
          >
            <div style={{ marginTop: '150px' }}>
              <RegisterForm />
              <center>
                <button
                  type="button"
                  className="btn btn_asLink"
                  onClick={() => {
                    this.props.history.push('/login');
                  }}
                >
                  Login
                </button>
              </center>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RegisterPage);
