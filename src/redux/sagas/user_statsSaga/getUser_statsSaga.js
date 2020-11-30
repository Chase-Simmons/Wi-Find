import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getUser_stats(action) {
  try {
    const response = yield axios.get(`/api/user_stats/${action.payload}`);
    yield put({
      type: 'SET_USER_STATS',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* getUser_statsSaga() {
  yield takeLatest('GET_USER_STATS', getUser_stats);
}

export default getUser_statsSaga;
