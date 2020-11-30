import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* putTrip_location(action) {
  console.log(action.payload);
  try {
    yield axios.put(`/api/trip_location/${action.payload.id}`, action.payload);

    yield put({ type: 'GET_USER_TRIPS', payload: action.payload.user_id });
  } catch (err) {
    console.log(err);
  }
}

function* putTrip_locationSaga() {
  yield takeLatest('PUT_TRIP_LOCATION', putTrip_location);
}

export default putTrip_locationSaga;
