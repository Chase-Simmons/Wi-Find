import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import locations from './location.reducer';
import cordReducer from './cord.reducer';
import user_stats from './user_stats.reducer';
import user_trips from './user_trips.reducer';
import trip_locations from './trip_locations.reducer';
import nav_responsive_component from './nav_responsive_component.reducer';
import make_a_trip_title from './make_a_trip_title.reducer';
import make_a_trip_location from './make_a_trip_location.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  locations,
  cordReducer,
  user_stats,
  user_trips,
  trip_locations,
  nav_responsive_component,
  make_a_trip_title,
  make_a_trip_location,
});

export default rootReducer;
