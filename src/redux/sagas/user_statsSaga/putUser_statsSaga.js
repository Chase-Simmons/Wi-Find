import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* putUserStats(action) {
  try {
    yield axios
      .put(`/api/user_stats/${action.payload.id}`, {
        avatar: action.payload.avatar,
        points: action.payload.points,
        speedtest: action.payload.speedtest,
        connection: action.payload.connection,
      })
      .then()
      .catch((err) => {
        console.log('error in PUT_USER_STATS', err);
      });
    yield put({
      type: 'GET_USER_STATS',
      payload: action.payload.id,
    });
  } catch (err) {
    console.log(err);
  }
}

function* putUserStatsSaga() {
  yield takeLatest('PUT_USER_STATS', putUserStats);
}

export default putUserStatsSaga;
