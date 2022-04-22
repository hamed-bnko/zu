import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { Url } from 'constants/defaultValues';

import { FILES_GET_LIST, FILES_ADD_ITEM, FILES_DELETE_ITEM } from '../contants';

import {
  getFilesListSuccess,
  getFilesListError,
  addFileItemSuccess,
  addFileItemError,
  deleteFileItemSuccess,
  deleteFileItemError,
} from './actions';

const getAdvsListRequest = async (tracking) =>
  // eslint-disable-next-line no-return-await
  await axios.get(`${Url}api/files/${tracking}`);

function* getFileListItems({ payload }) {
  try {
    const response = yield call(getAdvsListRequest, payload);
    yield put(getFilesListSuccess(response.data));
  } catch (error) {
    yield put(getFilesListError(error));
  }
}

const addFileItemRequest = async (item) =>
  // eslint-disable-next-line no-return-await
  await axios.post(`${Url}api/files`, item);

function* addFileItem({ payload }) {
  try {
    const response = yield call(addFileItemRequest, payload);
    yield put(addFileItemSuccess(response.data));
  } catch (error) {
    yield put(addFileItemError(error));
  }
}

const deleteFileItemRequest = async (id) =>
  // eslint-disable-next-line no-return-await
  await axios.delete(`${Url}api/files/${id}`);

function* deleteFileItem({ payload }) {
  try {
    yield call(deleteFileItemRequest, payload);
    yield put(deleteFileItemSuccess(payload));
  } catch (error) {
    yield put(deleteFileItemError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(FILES_GET_LIST, getFileListItems);
}

export function* wathcAddItem() {
  yield takeEvery(FILES_ADD_ITEM, addFileItem);
}

export function* wathcDeleteItem() {
  yield takeEvery(FILES_DELETE_ITEM, deleteFileItem);
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(wathcAddItem), fork(wathcDeleteItem)]);
}
