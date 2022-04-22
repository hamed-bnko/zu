import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { auth } from 'helpers/Firebase';
import { adminRoot, currentUser } from 'constants/defaultValues';
import { setCurrentUser } from 'helpers/Utils';
import { Url } from '../../constants/defaultValues';

import {
  USER_LOADED,
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
} from '../contants';

import {
  loadUserSuccess,
  loadUserError,
  loginUserSuccess,
  loginUserError,
  registerUserSuccess,
  registerUserError,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPasswordSuccess,
  resetPasswordError,
} from './actions';
import setAuthToken from '../utils/setAuthToken';

export function* watchLoadUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(USER_LOADED, userLoadWithEmailPassword);
}

const userLoadWithEmailPasswordAsync = async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  // eslint-disable-next-line no-return-await
  return await axios.get(`${Url}api/auth`);
};

function* userLoadWithEmailPassword() {
  try {
    const loginUser = yield call(userLoadWithEmailPasswordAsync);
    if (!loginUser.message) {
      yield put(loadUserSuccess(loginUser.data));
    } else {
      yield put(loadUserError(loginUser.message));
    }
  } catch (error) {
    yield put(loadUserError(error));
  }
}

export function* watchLoginUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

const loginWithEmailPasswordAsync = async (user) =>
  // eslint-disable-next-line no-return-await
  await axios.post(`${Url}api/auth`, user);

function* loginWithEmailPassword({ payload }) {
  try {
    const response = yield call(loginWithEmailPasswordAsync, payload.user);
    if (!response.message) {
      yield put(loginUserSuccess(response.data));
    } else {
      yield put(loginUserError(response.data));
    }
  } catch (error) {
    yield put(loginUserError('خطأ في إسم المستخدم او كلمة المرور '));
    console.log(error);
  }
}

export function* watchRegisterUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

const registerWithEmailPasswordAsync = async (FormData) =>
  // eslint-disable-next-line no-return-await
  await axios.post(`${Url}api/students`, FormData);

function* registerWithEmailPassword({ payload }) {
  const { history } = payload;
  try {
    const registerUser = yield call(registerWithEmailPasswordAsync, payload);
    if (!registerUser.message) {
      const item = { uid: registerUser.user.uid, ...currentUser };
      setCurrentUser(item);
      yield put(registerUserSuccess(item));
      history.push(adminRoot);
    } else {
      yield put(registerUserError(registerUser.message));
    }
  } catch (error) {
    yield put(registerUserError(error));
  }
}

export function* watchLogoutUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(LOGOUT_USER, logout);
}

const logoutAsync = async (history) => {
  history.push(adminRoot);
};

function* logout({ payload }) {
  const { history } = payload;
  setCurrentUser();
  yield call(logoutAsync, history);
}

export function* watchForgotPassword() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}

const forgotPasswordAsync = async (email) => {
  // eslint-disable-next-line no-return-await
  return await auth
    .sendPasswordResetEmail(email)
    .then((user) => user)
    .catch((error) => error);
};

function* forgotPassword({ payload }) {
  const { email } = payload.forgotUserMail;
  try {
    const forgotPasswordStatus = yield call(forgotPasswordAsync, email);
    if (!forgotPasswordStatus) {
      yield put(forgotPasswordSuccess('success'));
    } else {
      yield put(forgotPasswordError(forgotPasswordStatus.message));
    }
  } catch (error) {
    yield put(forgotPasswordError(error));
  }
}

export function* watchResetPassword() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(RESET_PASSWORD, resetPassword);
}

const resetPasswordAsync = async (resetPasswordCode, newPassword) => {
  // eslint-disable-next-line no-return-await
  return await auth
    .confirmPasswordReset(resetPasswordCode, newPassword)
    .then((user) => user)
    .catch((error) => error);
};

function* resetPassword({ payload }) {
  const { newPassword, resetPasswordCode } = payload;
  try {
    const resetPasswordStatus = yield call(
      resetPasswordAsync,
      resetPasswordCode,
      newPassword
    );
    if (!resetPasswordStatus) {
      yield put(resetPasswordSuccess('success'));
    } else {
      yield put(resetPasswordError(resetPasswordStatus.message));
    }
  } catch (error) {
    yield put(resetPasswordError(error));
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchLoadUser),
    fork(watchRegisterUser),
    fork(watchForgotPassword),
    fork(watchResetPassword),
  ]);
}
