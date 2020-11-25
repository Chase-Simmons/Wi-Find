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
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import MakeATripPage from '../../pages/MakeATripPage/MakeATripPage';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import SpeedtestPage from '../../pages/SpeedtestPage/SpeedtestPage';
/*-----> PAGES <-----*/

import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
    this.props.dispatch({ type: 'GET_LOCATION' });
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />

          <Switch>
            <Redirect exact from="/" to="/home" />

            <Route exact path="/home" component={LandingPage} />

            <Route exact path="/make_a_trip" component={MakeATripPage} />

            <Route exact path="/speedtest" component={SpeedtestPage} />

            <Route exact path="/about" component={AboutPage} />

            <InvertedProtectedRoute
              exact
              path="/profile"
              component={ProfilePage}
              authRedirect="/home"
            />

            <ProtectedRoute exact path="/user" component={UserPage} />

            <ProtectedRoute exact path="/info" component={InfoPage} />

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
    );
  }
}

export default connect()(App);
