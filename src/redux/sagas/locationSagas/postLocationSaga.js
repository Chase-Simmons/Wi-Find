import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* postLocation(action) {
  try {
    const response = yield axios.post('/api/location', action.payload);
    console.log(response);
    yield put({
      type: 'GET_LOCATION',
    });

    yield put({
      type: 'POST_SPEEDTEST',
      payload: {
        user_id: response.data.user_id,
        location_id: response.data.result.id,
        speed: response.data.speed,
      },
    });
  } catch (err) {
    console.log(err);
  }
}

function* postLocationSaga() {
  yield takeLatest('POST_LOCATION', postLocation);
}

export default postLocationSaga;
