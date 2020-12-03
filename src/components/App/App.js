/*-----> CORE <-----*/
import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
/*-----> CORE <-----*/

/*-----> COMPONENTS <-----*/
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
/*-----> COMPONENTS <-----*/

/*-----> SECURITY <-----*/
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import InvertedProtectedRoute from '../ProtectedRoute/InvertedProtectedRoute.js';
/*-----> SECURITY <-----*/

/*-----> PAGES <-----*/
import LandingPage from '../../pages/LandingPage/LandingPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import RegisterPage from '../../pages/RegisterPage/RegisterPage';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
/*-----> PAGES <-----*/

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './App.css';

const customTheme = createMuiTheme({
  overrides: {
    MuiDrawer: {
      paperAnchorDockedLeft: {
        boxShadow: '0 2px 12px #ac61b9',
        borderRight: '1px solid #F5EBF6',
      },
      paper: {
        color: '#E4E8F3',
        backgroundColor: '#081C3E',
      },
    },
    MuiAppBar: {
      colorDefault: {
        color: '#fff',
        backgroundColor: '#283C5E',
        boxShadow: '2px 2px 12px #ac61b9',
        borderBottom: '1px solid #F5EBF6',
      },
    },
    MuiInputBase: {
      root: {
        color: '#E4E8F3',
      },
    },
    MuiFormLabel: {
      root: {
        '&$focused': {
          color: '#ac61b9',
          fontWeight: 'bold',
          borderBottom: '2px solid #ac61b9',
        },
        color: '#E4E8F3',
      },
    },
    MuiInput: {
      underline: {
        '&:hover:not($disabled):after': {
          borderBottom: '2px solid #ac61b9',
        },
        '&:hover:not($disabled):before': {
          borderBottom: '1px solid #F5EBF6',
        },
        '&:before': {
          borderBottom: '1px solid #F5EBF6',
        },
        '&:after': {
          color: '#ac61b9',
          fontWeight: 'bold',
          borderBottom: '2px solid #ac61b9',
        },
      },
      input: {
        color: '#E4E8F3',
      },
    },
    MuiFilledInput: {
      underline: {
        '&:hover:not($disabled):after': {
          borderBottom: '2px solid #ac61b9',
        },
        '&:hover:not($disabled):before': {
          borderBottom: '1px solid #F5EBF6',
        },
        '&:before': {
          borderBottom: '1px solid #F5EBF6',
        },
        '&:after': {
          color: '#ac61b9',
          fontWeight: 'bold',
          borderBottom: '2px solid #ac61b9',
        },
      },
      input: {
        color: '#E4E8F3',
      },
    },
    MuiListItemIcon: {
      root: {
        marginLeft: '7px',
      },
    },
    MuiButton: {
      containedPrimary: {
        backgroundColor: '#AC61B9',
        boxShadow: '0 0px 4px #ac61b9',
        marginTop: '-8px',
        marginBottom: '-8px',
        border: '2px solid #D5B0DC',
        borderBottom: '3px solid #D5B0DC',
        color: '#F5EBF6',
        '&:hover': {
          backgroundColor: '#B675C2 !important',
          boxShadow: '0 0px 8px #ac61b9',
        },
      },
    },
    MuiSvgIcon: {
      root: {
        color: '#F5EBF6',
      },
    },
  },
});

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
    this.props.dispatch({ type: 'GET_LOCATION' });
  }

  render() {
    return (
      <ThemeProvider theme={customTheme}>
        <Router>
          <div>
            <Nav />

            <Switch>
              <Redirect exact from="/" to="/home" />

              <Route exact path="/home" component={LandingPage} />

              <InvertedProtectedRoute
                exact
                path="/profile"
                component={ProfilePage}
                authRedirect="/home"
              />
              <ProtectedRoute
                exact
                path="/login"
                component={LoginPage}
                authRedirect="/home"
              />
              <ProtectedRoute
                exact
                path="/registration"
                component={RegisterPage}
                authRedirect="/home"
              />

              {/* If none of the other routes matched, we will show a 404. */}

              <Route render={() => <h1>404</h1>} />
            </Switch>

            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    );
  }
}

export default connect()(App);
