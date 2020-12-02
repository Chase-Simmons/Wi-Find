import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* getLocation(action) {
  try {
    const response = yield axios.get('/api/location');
    yield put({
      type: 'SET_LOCATIONS',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* getLocationSaga() {
  yield takeLatest('GET_LOCATION', getLocation);
}

export default getLocationSaga;
