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
    if (this.props.store.user.id) {
      if (this.state.isAuth === false) {
        this.changeState();
      } else {
      }
    } else {
    }
  };

  componentDidUpdate() {
    this.onLoad();
  }
  render() {
    return (
      <Link to={this.state.link} onClick={this.changeState}>
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
