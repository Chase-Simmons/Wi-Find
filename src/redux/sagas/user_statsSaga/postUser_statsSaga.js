import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* postUser_stats(action) {
  try {
    yield axios
      .post(`/api/user_stats/${action.payload}`)
      .then()
      .catch((err) => {
        console.log('error in POST_USER_STATS', err);
      });
    yield put({
      type: 'GET_USER_STATS',
      payload: action.payload,
    });
  } catch (err) {
    console.log(err);
  }
}

function* postUser_statsSaga() {
  yield takeLatest('POST_USER_STATS', postUser_stats);
}

export default postUser_statsSaga;
