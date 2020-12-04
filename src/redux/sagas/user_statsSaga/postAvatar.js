import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* postUser_avatar(action) {
  try {
    yield axios
      .put(`/api/user_stats/${action.payload.id}`, {
        avatar: action.payload.avatar,
      })
      .then()
      .catch((err) => {
        console.log('error in POST_USER_AVATAR', err);
      });
    yield put({
      type: 'GET_USER_STATS',
      payload: action.payload.id,
    });
  } catch (err) {
    console.log(err);
  }
}

function* postUser_avatarSaga() {
  yield takeLatest('POST_USER_AVATAR', postUser_avatar);
}

export default postUser_avatarSaga;
