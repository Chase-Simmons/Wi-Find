import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getSSID(action) {
  try {
    const response = yield axios.get(`/api/wifind`);
    yield put({
      type: 'SET_SSID',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* getSSIDSaga() {
  yield takeLatest('GET_SSID', getSSID);
}

export default getSSIDSaga;
