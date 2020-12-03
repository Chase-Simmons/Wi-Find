import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* postSpeedtest(action) {
  try {
    yield axios.post('/api/speedtest', action.payload);

    yield put({
      type: 'GET_LOCATION',
    });
  } catch (err) {
    console.log(err);
  }
}

function* postSpeedtestSaga() {
  yield takeLatest('POST_SPEEDTEST', postSpeedtest);
}

export default postSpeedtestSaga;
