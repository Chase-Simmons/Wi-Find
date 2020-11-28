import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* putUser_trips(action) {
  console.log(action.payload);
  try {
    yield axios.put(`/api/user_trips/${action.payload.id}`, action.payload);

    yield put({ type: 'GET_USER_TRIPS', payload: action.payload.user_id });
  } catch (err) {
    console.log(err);
  }
}

function* putUser_tripsSaga() {
  yield takeLatest('PUT_USER_TRIPS', putUser_trips);
}

export default putUser_tripsSaga;
