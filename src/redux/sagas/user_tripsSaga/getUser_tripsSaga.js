import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getUser_trips(action) {
  try {
    const response = yield axios.get(`/api/user_trips/${action.payload}`);
    yield put({
      type: 'SET_USER_TRIPS',
      payload: response.data,
    });
    yield put({ type: 'GET_TRIP_LOCATIONS', payload: action.payload });
  } catch (err) {
    console.log(err);
  }
}

function* getUser_tripsSaga() {
  yield takeLatest('GET_USER_TRIPS', getUser_trips);
}

export default getUser_tripsSaga;
