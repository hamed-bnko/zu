import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { Url } from 'constants/defaultValues';

import {
  NEWS_LIST_GET_LIST,
  NEWS_LIST_ADD_ITEM,
  NEWS_LIST_UPDATE_ITEM,
  NEWS_LIST_DELETE_ITEM,
  NEWS_LIST_GET_LIST_BY_TRACKING,
} from '../contants';

import {
  getNewsListSuccess,
  getNewsListError,
  addNewsItemSuccess,
  addNewsItemError,
  updateNewsItemSuccess,
  updateNewsItemError,
  deleteNewsItemSuccess,
  deleteNewsItemError,
  getNewsListByTrackingError,
  getNewsListByTrackingSuccess,
} from './actions';

const getNewsListRequest = async () =>
  // eslint-disable-next-line no-return-await
  await axios.get(`${Url}api/news`);

function* getNewsListItems() {
  try {
    const response = yield call(getNewsListRequest);
    yield put(getNewsListSuccess(response.data));
  } catch (error) {
    yield put(getNewsListError(error));
  }
}

const addNewsItemRequest = async (item) =>
  // eslint-disable-next-line no-return-await
  await axios.post(`${Url}api/news`, item);

function* addNewsItem({ payload }) {
  try {
    const response = yield call(addNewsItemRequest, payload);
    yield put(addNewsItemSuccess(response.data));
  } catch (error) {
    yield put(addNewsItemError(error));
  }
}

const updateNewsItemRequest = async (item) =>
  // eslint-disable-next-line no-return-await
  await axios.put(`${Url}api/news/${item.id}`, item);

function* updateNewsItem({ payload }) {
  try {
    const response = yield call(updateNewsItemRequest, payload);
    yield put(updateNewsItemSuccess(response.data));
  } catch (error) {
    yield put(updateNewsItemError(error));
  }
}
const deleteNewsItemRequest = async (id) =>
  // eslint-disable-next-line no-return-await
  await axios.delete(`${Url}api/news/${id}`);

function* deleteNewsItem({ payload }) {
  try {
    yield call(deleteNewsItemRequest, payload);
    yield put(deleteNewsItemSuccess(payload));
  } catch (error) {
    yield put(deleteNewsItemError(error));
  }
}

const getNewsListItemsByTrackingRequest = async (tracking) =>
  // eslint-disable-next-line no-return-await
  await axios.get(`${Url}api/news/tracking/${tracking}`);

function* getNewsListItemsByTracking({ payload }) {
  try {
    const response = yield call(getNewsListItemsByTrackingRequest, payload);
    yield put(getNewsListByTrackingSuccess(response.data));
  } catch (error) {
    yield put(getNewsListByTrackingError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(NEWS_LIST_GET_LIST, getNewsListItems);
}

export function* wathcAddItem() {
  yield takeEvery(NEWS_LIST_ADD_ITEM, addNewsItem);
}

export function* wathcUpdateSubject() {
  yield takeEvery(NEWS_LIST_UPDATE_ITEM, updateNewsItem);
}

export function* wathcDeleteSubject() {
  yield takeEvery(NEWS_LIST_DELETE_ITEM, deleteNewsItem);
}

export function* wathcGetListByTracking() {
  yield takeEvery(NEWS_LIST_GET_LIST_BY_TRACKING, getNewsListItemsByTracking);
}
export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(wathcAddItem),
    fork(wathcUpdateSubject),
    fork(wathcDeleteSubject),
    fork(wathcGetListByTracking),
  ]);
}
