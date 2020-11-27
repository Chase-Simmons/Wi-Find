import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

let responseHolder;
function* currentMakeATrip(action) {
  try {
    if (action.payload.call === 'POST') {
      yield axios
        .post(`/api/user_trips/${action.payload.user}`, action.payload)
        .then((response) => {
          responseHolder = response;
        })
        .catch((err) => {
          console.log('error in CURRENT_TRIP_HANDLER', err);
        });
      yield put({
        type: 'SET_TRIP_TITLE',
        payload: { data: action.payload.data, id: responseHolder.data.id },
      });
    }

    if (action.payload.call === 'DELETE') {
      if (action.payload.id !== null) {
        yield axios
          .delete(`/api/user_trips/${action.payload.id}`)
          .then((response) => {
            responseHolder = response;
          })
          .catch((err) => {
            console.log('error in CURRENT_TRIP_HANDLER', err);
          });
        yield put({
          type: 'SET_TRIP_TITLE',
          payload: { data: '', id: null, call: 'NONE' },
        });
      }
    }

    if (action.payload.call === 'POST_LOCATION') {
      yield axios
        .post(`/api/trip_location/${action.payload.id}`, action.payload)
        .then((response) => {
          responseHolder = response;
        })
        .catch((err) => {
          console.log('error in CURRENT_TRIP_HANDLER', err);
        });
      yield put({
        type: 'SET_TRIP_LOCATION',
        payload: { data: action.payload.data, id: responseHolder.data.id },
      });
    }

    if (action.payload.call === 'DELETE_LOCATION') {
      if (action.payload.id !== null) {
        yield axios
          .delete(`/api/trip_location/${action.payload.id}`)
          .then((response) => {
            responseHolder = response;
          })
          .catch((err) => {
            console.log('error in CURRENT_TRIP_HANDLER', err);
          });
        yield put({
          type: 'SET_TRIP_LOCATION',
          payload: { data: '', id: null, call: 'NONE' },
        });
      }
      yield put({ type: 'GET_USER_TRIPS', payload: action.payload.data.id });
    }
  } catch (err) {
    console.log(err);
  }
}

function* currentMakeATripSaga() {
  yield takeLatest('HANDLE_CURRENT_TRIP', currentMakeATrip);
}

export default currentMakeATripSaga;
