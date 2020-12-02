import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* postLocation(action) {
  try {
    yield axios.post('/api/location', action.payload);

    yield put({
      type: 'GET_LOCATION',
    });
  } catch (err) {
    console.log(err);
  }
}

function* postLocationSaga() {
  yield takeLatest('POST_LOCATION', postLocation);
}

export default postLocationSaga;
