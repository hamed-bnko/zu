/* eslint-disable import/no-unresolved */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { Url } from 'constants/defaultValues';

import {
  ARTICLES_GET_LIST,
  ARTICLES_ADD_ITEM,
  ARTICLES_DELETE_ITEM,
  ARTICLES_GET_LIST_BY_TRACKING,
} from '../contants';

import {
  getArticlesListByTrackingSuccess,
  getArticlesListByTrackingError,
  getArticlesListSuccess,
  getArticlesListError,
  addArticlesItemSuccess,
  addArticlesItemError,
  deleteArticlesItemSuccess,
  deleteArticlesItemError,
} from './actions';

const getArticlesByTrackingListRequest = async (tracking) =>
  // eslint-disable-next-line no-return-await
  await axios.get(`${Url}api/Articles/${tracking}`);

function* getArticlesListByTrackingItems({ payload }) {
  try {
    const response = yield call(getArticlesByTrackingListRequest, payload);
    yield put(getArticlesListByTrackingSuccess(response.data));
  } catch (error) {
    yield put(getArticlesListByTrackingError(error));
  }
}
const getArticlesListRequest = async () =>
  // eslint-disable-next-line no-return-await
  await axios.get(`${Url}api/Articles`);

function* getArticlesListItems() {
  try {
    const response = yield call(getArticlesListRequest);
    yield put(getArticlesListSuccess(response.data));
  } catch (error) {
    yield put(getArticlesListError(error));
  }
}

const addArticlesItemRequest = async (item) =>
  // eslint-disable-next-line no-return-await
  await axios.post(`${Url}api/Articles`, item);

function* addArticlesItem({ payload }) {
  try {
    const response = yield call(addArticlesItemRequest, payload);
    yield put(addArticlesItemSuccess(response.data));
  } catch (error) {
    yield put(addArticlesItemError(error));
  }
}

const deleteArticlesItemRequest = async (id) =>
  // eslint-disable-next-line no-return-await
  await axios.delete(`${Url}api/Articles/${id}`);

function* deleteArticlesItem({ payload }) {
  try {
    yield call(deleteArticlesItemRequest, payload);
    yield put(deleteArticlesItemSuccess(payload));
  } catch (error) {
    yield put(deleteArticlesItemError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(ARTICLES_GET_LIST, getArticlesListItems);
}
export function* watchGetListByTracking() {
  yield takeEvery(
    ARTICLES_GET_LIST_BY_TRACKING,
    getArticlesListByTrackingItems
  );
}

export function* wathcAddItem() {
  yield takeEvery(ARTICLES_ADD_ITEM, addArticlesItem);
}

export function* wathcDeleteItem() {
  yield takeEvery(ARTICLES_DELETE_ITEM, deleteArticlesItem);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(wathcAddItem),
    fork(wathcDeleteItem),
    fork(watchGetListByTracking),
  ]);
}
