import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import getLocationSaga from './locationSagas/getLocation';
import openCageSaga from './opencage.saga';
import getUser_statsSaga from './user_statsSaga/getUser_statsSaga';
import getUser_tripsSaga from './user_tripsSaga/getUser_tripsSaga';
import getTrip_locationsSaga from './trip_locationSaga/getTrip_locationSaga';
import handleCurrentTripSaga from './makeATripSaga/currentMakeHandlerSaga';
import deleteUser_tripsSaga from './user_tripsSaga/deleteUser_tripsSaga';
import putUser_tripsSaga from './user_tripsSaga/putUser_tripsSaga';
import putTrip_locationSaga from './trip_locationSaga/putTrip_locationSaga';
import postUser_statsSaga from './user_statsSaga/postUser_statsSaga';
import getLeader_pointsSaga from './leaderboardSagas/leader_pointsSaga';
import getLeader_achievementsSaga from './leaderboardSagas/leader_achievementsSaga';
import getSSIDSaga from './getSSID.saga';
import postLocationSaga from './locationSagas/postLocationSaga';
// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    getLocationSaga(),
    openCageSaga(),
    getUser_statsSaga(),
    getUser_tripsSaga(),
    getTrip_locationsSaga(),
    handleCurrentTripSaga(),
    deleteUser_tripsSaga(),
    putUser_tripsSaga(),
    putTrip_locationSaga(),
    postUser_statsSaga(),
    getLeader_pointsSaga(),
    getLeader_achievementsSaga(),
    getSSIDSaga(),
    postLocationSaga(),
  ]);
}
