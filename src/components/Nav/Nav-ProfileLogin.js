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
import DashboardIcon from '@material-ui/icons/Dashboard';
/*-----> MATERIAL-UI <-----*/

class NavSearch extends Component {
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
    console.log(this.props.store.user.id);
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
  render() {
    return (
      <Link to={this.state.link}>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={this.state.text} />
        </ListItem>
      </Link>
    );
  }
}

export default connect(mapStoreToProps)(NavSearch);
