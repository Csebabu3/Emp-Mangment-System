import { put, takeLatest } from "redux-saga/effects";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "../Types";

const defaultCredentials = {
  admin: { username: "admin", password: "admin123" },
  employee: { username: "employee", password: "emp123" },
};

function* loginSaga(action) {
  try {
    const { username, password } = action.payload;

    if (username === defaultCredentials.admin.username && password === defaultCredentials.admin.password) {
      yield put({ type: LOGIN_SUCCESS, payload: { username, role: "admin" } });
    } else if (username === defaultCredentials.employee.username && password === defaultCredentials.employee.password) {
      yield put({ type: LOGIN_SUCCESS, payload: { username, role: "employee" } });
    } else {
      yield put({ type: LOGIN_FAILURE, payload: "Invalid credentials!" });
    }
  } catch (error) {
    yield put({ type: LOGIN_FAILURE, payload: error.message });
  }
}

export function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}
