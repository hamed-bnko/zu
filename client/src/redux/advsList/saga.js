import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { Url } from 'constants/defaultValues';

import {
  ADVS_LIST_GET_LIST,
  ADVS_LIST_ADD_ITEM,
  ADVS_LIST_UPDATE_ITEM,
  ADVS_LIST_DELETE_ITEM,
  ADVS_LIST_GET_LIST_BY_TRACKING,
} from '../contants';

import {
  getAdvsListSuccess,
  getAdvsListError,
  addAdvsItemSuccess,
  addAdvsItemError,
  updateAdvsItemSuccess,
  updateAdvsItemError,
  deleteAdvsItemSuccess,
  deleteAdvsItemError,
  getAdvsListByTrackingError,
  getAdvsListByTrackingSuccess,
} from './actions';

const getAdvsListRequest = async () =>
  // eslint-disable-next-line no-return-await
  await axios.get(`${Url}api/advs`);

function* getAdvsListItems() {
  try {
    const response = yield call(getAdvsListRequest);
    yield put(getAdvsListSuccess(response.data));
  } catch (error) {
    yield put(getAdvsListError(error));
  }
}

const addAdvsItemRequest = async (item) =>
  // eslint-disable-next-line no-return-await
  await axios.post(`${Url}api/advs`, item);

function* addAdvsItem({ payload }) {
  try {
    const response = yield call(addAdvsItemRequest, payload);
    yield put(addAdvsItemSuccess(response.data));
  } catch (error) {
    yield put(addAdvsItemError(error));
  }
}

const updateAdvsItemRequest = async (item) =>
  // eslint-disable-next-line no-return-await
  await axios.put(`${Url}api/advs/${item.id}`, item);

function* updateAdvsItem({ payload }) {
  try {
    const response = yield call(updateAdvsItemRequest, payload);
    yield put(updateAdvsItemSuccess(response.data));
  } catch (error) {
    yield put(updateAdvsItemError(error));
  }
}
const deleteAdvsItemRequest = async (id) =>
  // eslint-disable-next-line no-return-await
  await axios.delete(`${Url}api/advs/${id}`);

function* deleteAdvsItem({ payload }) {
  try {
    yield call(deleteAdvsItemRequest, payload);
    yield put(deleteAdvsItemSuccess(payload));
  } catch (error) {
    yield put(deleteAdvsItemError(error));
  }
}
const getAdvsItemByTrackingRequest = async (tracking) =>
  // eslint-disable-next-line no-return-await
  await axios.get(`${Url}api/advs/tracking/${tracking}`);

function* getAdvsListItemsByTracking({ payload }) {
  try {
    const response = yield call(getAdvsItemByTrackingRequest, payload);
    yield put(getAdvsListByTrackingSuccess(response.data));
  } catch (error) {
    yield put(getAdvsListByTrackingError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(ADVS_LIST_GET_LIST, getAdvsListItems);
}

export function* wathcAddItem() {
  yield takeEvery(ADVS_LIST_ADD_ITEM, addAdvsItem);
}

export function* wathcUpdateItem() {
  yield takeEvery(ADVS_LIST_UPDATE_ITEM, updateAdvsItem);
}

export function* wathcDeleteItem() {
  yield takeEvery(ADVS_LIST_DELETE_ITEM, deleteAdvsItem);
}
export function* watchGetListByTracking() {
  yield takeEvery(ADVS_LIST_GET_LIST_BY_TRACKING, getAdvsListItemsByTracking);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(wathcAddItem),
    fork(wathcUpdateItem),
    fork(wathcDeleteItem),
    fork(watchGetListByTracking),
  ]);
}
