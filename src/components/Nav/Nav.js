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
import MenuIcon from '@material-ui/icons/Menu';
/*-----> MATERIAL-UI IMPORTS FOR NAV <-----*/

/*-----> COMPONENT <-----*/
import NavSearch from './Nav-Search';
// import NavDrawerMain from './Nav-DrawerMain'; COMPONENT NOT WORKING YET
import NavResponsiveComponent from '../NavResponsiveComponent/NavResponsiveComponent';
import NavProfileLogin from './Nav-ProfileLogin';
import NavMakeATrip from './Nav-MakeATrip';
import NavHome from './Nav-Home';
import NavNearMe from './Nav-NearMe';
import NavSpeedtest from './Nav-Speedtest';
import NavLeaderboard from './Nav-Leaderboards';
import NavDrawerClose from './Nav-DrawerClose';
import NavMyTrips from './Nav-MyTrips';
/*-----> COMPONENT <-----*/

const logo = require('./wfindlogo.png');
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
    border: '0px',
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
  noBorder: {
    paperAnchorDockedLeft: {
      borderLeftWidth: '0',
    },
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
      default:
        return;
    }
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        color="default"
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
            <MenuIcon
              style={{
                color: '#F5EBF6',
              }}
            />
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
            <img
              src={logo}
              alt="Wi-Find"
              style={{ marginLeft: '18px', width: '80px', height: '40px' }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        style={{ backgroundColor: '#b7c1de', height: '100vh' }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <NavDrawerClose close={handleDrawerClose}></NavDrawerClose>
        </div>
        <Divider
          style={{
            backgroundImage:
              'linear-gradient(#B675C2,#D5B0DC, #F5EBF6, #D5B0DC,#B675C2)',
            height: 3,
            marginTop: '-1px',
            boxShadow: '0 2px 8px #ac61b9',
          }}
        />
        {/* NAVBAR */}
        <List style={{ paddingBottom: 0 }}>
          <NavHome superReducer={superReducer} />
          <NavProfileLogin superReducer={superReducer} />
          <NavMyTrips
            superReducer={superReducer}
            openDrawer={handleDrawerOpen}
          />
          <NavMakeATrip
            superReducer={superReducer}
            openDrawer={handleDrawerOpen}
          />
          <NavNearMe superReducer={superReducer} />
          <NavSpeedtest
            superReducer={superReducer}
            openDrawer={handleDrawerOpen}
          />
          <NavLeaderboard
            superReducer={superReducer}
            openDrawer={handleDrawerOpen}
          />
        </List>
        <Divider
          style={{
            backgroundImage:
              'linear-gradient(#B675C2,#D5B0DC, #F5EBF6, #D5B0DC,#B675C2)',
            height: 3,
            marginTop: '10px',
            boxShadow: '0 2px 8px #ac61b9',
          }}
        />
        <List style={{ paddingBottom: 0 }}>
          <NavResponsiveComponent superReducer={superReducer} />
        </List>
      </Drawer>
    </div>
  );
}

export default connect()(Dashboard);
