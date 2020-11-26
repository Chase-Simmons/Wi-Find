/*-----> CORE <-----*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
/*-----> CORE <-----*/

/*-----> MATERIAL-UI <-----*/
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
/*-----> MATERIAL-UI <-----*/

class NavProfileLogin extends Component {
  state = {
    isAuth: false,
    text: 'Login',
    link: '/login',
  };

  changeState = (event) => {
    this.setState({
      isAuth: true,
      text: 'Profile',
      link: '/profile',
    });
  };

  onLoad = () => {
    if (this.props.store.user.id !== undefined) {
      this.changeState();
    } else {
    }
  };

  componentDidUpdate() {
    if (this.state.isAuth === false) {
      this.onLoad();
    }
    if (this.props.store.user.id === undefined) {
      if (this.state.isAuth === true) {
        this.setState({
          isAuth: false,
          text: 'Login',
          link: '/login',
        });
      }
    }
  }

  clearSuperReducer = () => {
    console.log('hello');
    this.props.superReducer({ call: 'SET', data: 'none' });
  };
  render() {
    return (
      <Link to={this.state.link}>
        <ListItem button onClick={this.clearSuperReducer}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary={this.state.text} />
        </ListItem>
      </Link>
    );
  }
}

export default connect(mapStoreToProps)(NavProfileLogin);
