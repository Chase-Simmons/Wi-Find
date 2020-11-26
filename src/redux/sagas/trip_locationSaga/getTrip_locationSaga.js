import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getTrip_location(action) {
  try {
    const response = yield axios.get(`/api/trip_location/${action.payload}`);
    console.log(response.data);
    yield put({
      type: 'SET_TRIP_LOCATIONS',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* getTrip_locationSaga() {
  yield takeLatest('GET_TRIP_LOCATIONS', getTrip_location);
}

export default getTrip_locationSaga;
