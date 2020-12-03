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

  /*-----> SWITCH FROM LOGIN BUTTON -> PROFILE BUTTON  <-----*/
  changeState = (event) => {
    this.setState({
      isAuth: true,
      text: 'Profile',
      link: '/profile',
    });
  };
  /*-----> SWITCH FROM LOGIN BUTTON -> PROFILE BUTTON <-----*/

  /*-----> CHANGE STATE ON LOAD <-----*/
  onLoad = () => {
    if (this.props.store.user.id !== undefined) {
      this.changeState();
    } else {
    }
  };
  /*-----> CHANGE STATE ON LOAD <-----*/

  componentDidUpdate() {
    /*-----> IF LOGGED IN CHANGE STATE <-----*/
    if (this.state.isAuth === false) {
      this.onLoad();
    }

    /*-----> IF LOGGED IN CHANGE STATE <-----*/

    /*-----> IF NOT LOGGED IN CHANGE STATE <-----*/
    if (this.props.store.user.id === undefined) {
      if (this.state.isAuth === true) {
        this.setState({
          isAuth: false,
          text: 'Login',
          link: '/login',
        });
      }
    }
    /*-----> IF NOT LOGGED IN CHANGE STATE <-----*/
  }

  render() {
    return (
      <Link to={this.state.link}>
        <ListItem button>
          <ListItemIcon>
            <AccountCircleIcon
              style={{
                color: '#F5EBF6',
              }}
            />
          </ListItemIcon>
          <ListItemText primary={this.state.text} />
        </ListItem>
      </Link>
    );
  }
}

export default connect(mapStoreToProps)(NavProfileLogin);
