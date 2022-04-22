import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { Url } from 'constants/defaultValues';

import { getFacultyDetailSuccess, getFacultyDetailError } from './actions';

import { FACULTY_GET_DETAILS } from '../contants';

const getFacultyDetailRequest = async (url) =>
  // eslint-disable-next-line no-return-await
  await axios.get(`${Url}api/faculties/${url}`);

function* getFacultyDetailItems({ payload }) {
  try {
    const response = yield call(getFacultyDetailRequest, payload);
    yield put(getFacultyDetailSuccess(response.data));
  } catch (error) {
    yield put(getFacultyDetailError(error));
  }
}

export function* watchGetDetail() {
  yield takeEvery(FACULTY_GET_DETAILS, getFacultyDetailItems);
}

export default function* rootSaga() {
  yield all([fork(watchGetDetail)]);
}
