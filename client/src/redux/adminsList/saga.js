import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { Url } from 'constants/defaultValues';

import {
  ADMINS_LIST_GET_LIST,
  ADMINS_LIST_ADD_ITEM,
  ADMINS_LIST_DELETE_ITEM,
} from '../contants';

import {
  getAdminsListSuccess,
  getAdminsListError,
  addAdminItemSuccess,
  addAdminItemError,
  deleteAdminItemSuccess,
} from './actions';

const getAdminsListRequest = async () =>
  // eslint-disable-next-line no-return-await
  await axios.get(`${Url}api/users`);

function* getAdminsListItems() {
  try {
    const response = yield call(getAdminsListRequest);
    yield put(getAdminsListSuccess(response.data));
  } catch (error) {
    yield put(getAdminsListError(error));
  }
}

const addAdminItemRequest = async (FormData) =>
  // eslint-disable-next-line no-return-await
  await axios.post(`${Url}api/users/fromdash`, FormData);

function* addAdminItem({ payload }) {
  try {
    const response = yield call(addAdminItemRequest, payload);
    yield put(addAdminItemSuccess(response.data));
  } catch (error) {
    yield put(addAdminItemError(error));
  }
}

const deleteAdminItemRequest = async (id) =>
  // eslint-disable-next-line no-return-await
  await axios.delete(`${Url}api/users/${id}`);

function* deleteAdminItem({ payload }) {
  try {
    const response = yield call(deleteAdminItemRequest, payload);
    if (response.status === 200) yield put(deleteAdminItemSuccess(payload));
  } catch (error) {
    yield put(addAdminItemError(error));
  }
}

export function* watchGetAdminsList() {
  yield takeEvery(ADMINS_LIST_GET_LIST, getAdminsListItems);
}

export function* wathcAddAdminItem() {
  yield takeEvery(ADMINS_LIST_ADD_ITEM, addAdminItem);
}

export function* wathcDeleteAdminItem() {
  yield takeEvery(ADMINS_LIST_DELETE_ITEM, deleteAdminItem);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetAdminsList),
    fork(wathcAddAdminItem),
    fork(wathcDeleteAdminItem),
  ]);
}
