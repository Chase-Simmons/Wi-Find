import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getLeader_achievements(action) {
  try {
    const response = yield axios.get(`/api/leader_achievements`);
    yield put({
      type: 'SET_LEADER_ACHIEVEMENTS',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* getLeader_achievementsSaga() {
  yield takeLatest('GET_LEADER_ACHIEVEMENTS', getLeader_achievements);
}

export default getLeader_achievementsSaga;
