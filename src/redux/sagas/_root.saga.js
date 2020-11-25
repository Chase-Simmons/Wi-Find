import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import getLocationSaga from './locationSagas/getLocation';
import openCageSaga from './opencage.saga';
import getUser_statsSaga from './user_statsSaga/getUser_statsSaga';
import getUser_tripsSaga from './user_tripsSaga/getUser_tripsSaga';

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
  ]);
}
