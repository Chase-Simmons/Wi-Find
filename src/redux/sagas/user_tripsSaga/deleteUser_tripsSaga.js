import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* deleteUser_trips(action) {
  try {
    yield axios
      .delete(`/api/user_trips/${action.payload.trip_id}`)
      .then()
      .catch((err) => {
        console.log('error in DELETE_USER_TRIPS', err);
      });
    yield put({ type: 'GET_USER_TRIPS', payload: action.payload.id });
    yield put({ type: 'GET_TRIP_LOCATIONS', payload: action.payload.id });
  } catch (err) {
    console.log(err);
  }
}

function* deleteUser_tripsSaga() {
  yield takeLatest('DELETE_USER_TRIPS', deleteUser_trips);
}

export default deleteUser_tripsSaga;
