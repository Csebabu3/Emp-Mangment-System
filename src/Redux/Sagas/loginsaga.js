import { call, put, takeLatest } from "redux-saga/effects";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "../Types";
import { loginService } from "../Services/loginservices";
import { loginFailure, loginSuccess } from "../Actions/loginaction";

function* loginSaga(action) {
  try {
    const user = yield call(loginService, action.payload);
    yield put(loginSuccess(user));
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

export function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}
