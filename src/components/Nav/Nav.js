/*-----> CORE <-----*/
import React from 'react';
import { connect } from 'react-redux';
import './Nav.css';
/*-----> CORE <-----*/

/*-----> MATERIAL-UI IMPORTS FOR NAV <-----*/
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
/*-----> MATERIAL-UI IMPORTS FOR NAV <-----*/

/*-----> COMPONENT <-----*/
import NavSearch from './Nav-Search';
// import NavDrawerMain from './Nav-DrawerMain';
import NavResponsiveComponent from '../NavResponsiveComponent/NavResponsiveComponent';
import NavProfileLogin from './Nav-ProfileLogin';
import NavMakeATrip from './Nav-MakeATrip';
import NavHome from './Nav-Home';
import NavNearMe from './Nav-NearMe';
import NavSpeedtest from './Nav-Speedtest';
import NavLeaderboard from './Nav-Leaderboards';
import NavDrawerClose from './Nav-DrawerClose';
/*-----> COMPONENT <-----*/

const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  let superState = 'none';
  const superReducer = (data) => {
    switch (data.call) {
      case 'GET':
        return superState;
      case 'SET':
        superState = data.data;
        return superState;
    }
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            <NavSearch />
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <NavDrawerClose close={handleDrawerClose}></NavDrawerClose>
        </div>
        <Divider style={{ backgroundColor: '#222222', height: 1 }} />
        {/* NAVBAR */}
        <List>
          <NavHome superReducer={superReducer} />
          <NavProfileLogin superReducer={superReducer} />
          <NavMakeATrip
            superReducer={superReducer}
            openDrawer={handleDrawerOpen}
          />
          <NavNearMe superReducer={superReducer} />
          <NavSpeedtest superReducer={superReducer} />
          <NavLeaderboard superReducer={superReducer} />
        </List>
        <Divider style={{ backgroundColor: '#222222', height: 3 }} />
        {/* COMPONENTS */}
        <List>
          <NavResponsiveComponent superReducer={superReducer} />
        </List>
      </Drawer>
    </div>
  );
}

export default connect()(Dashboard);
