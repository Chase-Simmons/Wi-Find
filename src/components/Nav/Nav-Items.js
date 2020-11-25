/*-----> MATERIAL-UI <-----*/
import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BarChartIcon from '@material-ui/icons/BarChart';
import MapIcon from '@material-ui/icons/Map';
import ExploreIcon from '@material-ui/icons/Explore';
import RoomIcon from '@material-ui/icons/Room';
import SpeedIcon from '@material-ui/icons/Speed';
/*-----> MATERIAL-UI <-----*/

/*-----> COMPONENTS <-----*/
import NavProfileLogin from './Nav-ProfileLogin';
/*-----> COMPONENTS <-----*/

export const mainListItems = (
  <div>
    <Link to="/home">
      <ListItem button>
        <ListItemIcon>
          <MapIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </Link>
    <NavProfileLogin />
    <Link to="/make_a_trip">
      <ListItem button>
        <ListItemIcon>
          <ExploreIcon />
        </ListItemIcon>
        <ListItemText primary="Make A Trip" />
      </ListItem>
    </Link>
    <ListItem button>
      <ListItemIcon>
        <RoomIcon />
      </ListItemIcon>
      <ListItemText primary="Near Me" />
    </ListItem>
    <Link to="/speedtest">
      <ListItem button>
        <ListItemIcon>
          <SpeedIcon />
        </ListItemIcon>
        <ListItemText primary="Speedtest" />
      </ListItem>
    </Link>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Leaderboards" />
    </ListItem>
  </div>
);

export const secondaryListItems = <div></div>;
