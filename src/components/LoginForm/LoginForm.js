import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

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
        <h2 style={{ marginTop: '-10px', color: '#E4E8F3' }}>Login</h2>
        {this.props.store.errors.loginMessage && (
          <h3 className="alert" role="alert">
            {this.props.store.errors.loginMessage}
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
        <Button onClick={this.login} variant="contained" color="primary">
          Log In
        </Button>
      </form>
    );
  }
}

export default connect(mapStoreToProps)(LoginForm);
