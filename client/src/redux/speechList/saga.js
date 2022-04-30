/* eslint-disable import/no-unresolved */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { Url } from 'constants/defaultValues';

import {
  SPEECH_GET_LIST,
  SPEECH_ADD_ITEM,
  SPEECH_DELETE_ITEM,
} from '../contants';

import {
  getSpeechListSuccess,
  getSpeechListError,
  addSpeechItemSuccess,
  addSpeechItemError,
  deleteSpeechItemSuccess,
  deleteSpeechItemError,
} from './actions';

const getSpeechListRequest = async (tracking) =>
  // eslint-disable-next-line no-return-await
  await axios.get(`${Url}api/speech/${tracking}`);

function* getSpeechListItems({ payload }) {
  try {
    const response = yield call(getSpeechListRequest, payload);
    yield put(getSpeechListSuccess(response.data));
  } catch (error) {
    yield put(getSpeechListError(error));
  }
}

const addSpeechItemRequest = async (item) =>
  // eslint-disable-next-line no-return-await
  await axios.post(`${Url}api/speech`, item);

function* addSpeechItem({ payload }) {
  try {
    const response = yield call(addSpeechItemRequest, payload);
    yield put(addSpeechItemSuccess(response.data));
  } catch (error) {
    yield put(addSpeechItemError(error));
  }
}

const deleteSpeechItemRequest = async (id) =>
  // eslint-disable-next-line no-return-await
  await axios.delete(`${Url}api/speech/${id}`);

function* deleteSpeechItem({ payload }) {
  try {
    yield call(deleteSpeechItemRequest, payload);
    yield put(deleteSpeechItemSuccess(payload));
  } catch (error) {
    yield put(deleteSpeechItemError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(SPEECH_GET_LIST, getSpeechListItems);
}

export function* wathcAddItem() {
  yield takeEvery(SPEECH_ADD_ITEM, addSpeechItem);
}

export function* wathcDeleteItem() {
  yield takeEvery(SPEECH_DELETE_ITEM, deleteSpeechItem);
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(wathcAddItem), fork(wathcDeleteItem)]);
}
