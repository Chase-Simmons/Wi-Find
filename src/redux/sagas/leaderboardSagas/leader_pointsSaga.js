import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getLeader_points(action) {
  try {
    const response = yield axios.get(`/api/leader_points`);
    yield put({
      type: 'SET_LEADER_POINTS',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* getLeader_pointsSaga() {
  yield takeLatest('GET_LEADER_POINTS', getLeader_points);
}

export default getLeader_pointsSaga;
