import axios from "axios";
import { takeLatest, fork, all, put, call, delay } from "redux-saga/effects";
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
} from "../modules/user";

function logInApi(data) {
  return axios.post("http://localhost:7000/api/user/login", data);
}
function logOutApi() {
  return axios.get("http://localhost:7000/api/user/logout");
}

function* logIn(action) {
  const userData = yield call(logInApi, action.data);
  try {
    yield delay(1000);
    yield put({ type: LOG_IN_SUCCESS, data: userData });
  } catch (err) {
    yield delay(1000);
    yield put({ type: LOG_IN_FAILURE, data: err });
  }
}
function* logOut() {
  yield call(logOutApi);
  try {
    yield delay(1000);
    yield put({ type: LOG_OUT_SUCCESS });
  } catch (err) {
    yield delay(1000);
    yield put({ type: LOG_OUT_FAILURE, err });
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

export default function* loginSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut)]);
}
