import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class RegisterForm extends Component {
  state = {
    username: '',
    password: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    this.props.dispatch({
      type: 'REGISTER',
      payload: {
        username: this.state.username,
        password: this.state.password,
      },
    });
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <form
        className="formPanel"
        style={{
          textAlign: 'center',
          width: '400px',
          height: '275px',
          backgroundColor: '#052346',
          border: '2px solid #F5EBF6',
        }}
      >
        <h2 style={{ marginTop: '-10px', color: '#E4E8F3' }}>Register User</h2>
        {this.props.store.errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {this.props.store.errors.registrationMessage}
          </h3>
        )}
        <div>
          <TextField
            label="Username"
            type="username"
            name="username"
            required
            value={this.state.username}
            onChange={this.handleInputChangeFor('username')}
            style={{
              textAlign: 'center',
              color: '#E4E8F3',
              height: '50px',
              width: '70%',
            }}
          />
        </div>
        <div>
          <TextField
            label="Password"
            type="password"
            name="password"
            required
            value={this.state.password}
            onChange={this.handleInputChangeFor('password')}
            style={{
              color: '#E4E8F3',
              height: '70px',
              width: '70%',
            }}
          />
        </div>
        <div>
          <Button
            onClick={this.registerUser}
            variant="contained"
            color="primary"
          >
            Log In
          </Button>
        </div>
      </form>
    );
  }
}

export default connect(mapStoreToProps)(RegisterForm);
