import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { Url } from 'constants/defaultValues';

import {
  FACULTIES_LIST_GET_LIST,
  FACULTIES_LIST_ADD_ITEM,
  FACULTIES_LIST_UPDATE_ITEM,
} from '../contants';

import {
  getFacultiesListSuccess,
  getFacultiesListError,
  addFacultiesItemSuccess,
  addFacultiesItemError,
  updateFacultiesItemSuccess,
  updateFacultiesItemError,
} from './actions';

const getFacultiesListRequest = async () =>
  // eslint-disable-next-line no-return-await
  await axios.get(`${Url}api/faculties`);

function* getFacultiesListItems() {
  try {
    const response = yield call(getFacultiesListRequest);
    yield put(getFacultiesListSuccess(response.data));
  } catch (error) {
    yield put(getFacultiesListError(error));
  }
}

const addFacultiesItemRequest = async (item) =>
  // eslint-disable-next-line no-return-await
  await axios.post(`${Url}api/faculties`, item);

function* addFacultiesItem({ payload }) {
  try {
    const response = yield call(addFacultiesItemRequest, payload);
    yield put(addFacultiesItemSuccess(response.data));
  } catch (error) {
    yield put(addFacultiesItemError(error));
  }
}

const updateFacultiesItemRequest = async (item) =>
  // eslint-disable-next-line no-return-await
  await axios.put(`${Url}api/faculties/${item.id}`, item);

function* updateFacultiesItem({ payload }) {
  try {
    const response = yield call(updateFacultiesItemRequest, payload);
    yield put(updateFacultiesItemSuccess(response.data));
  } catch (error) {
    yield put(updateFacultiesItemError(error));
  }
}

// const addUpdatePlansByDepartmentRequest = async (id) =>
//   // eslint-disable-next-line no-return-await
//   await axios.get(`${Url}api/faculties/department/${id}`);

// function* updatePlansByDepartment({ payload }) {
//   try {
//     const response = yield call(addUpdatePlansByDepartmentRequest, payload);
//     yield put(addFacultiesItemSuccess(response.data));
//   } catch (error) {
//     yield put(addFacultiesItemError(error));
//   }
// }

// const uploadfacultiesItemRequest = async ({
//   file,
//   departmentName,
//   department,
// }) => {
//   const formData = new FormData();
//   formData.append('faculties', file);
//   formData.append('departmentName', departmentName);
//   formData.append('department', department);
//   // eslint-disable-next-line no-return-await
//   return await axios.post(`${Url}api/faculties/uploadfaculties`, formData);
// };
// function* uploadfacultiesFileSaga({ payload }) {
//   try {
//     const response = yield call(uploadfacultiesItemRequest, payload);
//     yield put(uploadfacultiesListSuccess(response.data));
//   } catch (error) {
//     yield put(getFacultiesListError(error));
//   }
// }

export function* watchGetList() {
  yield takeEvery(FACULTIES_LIST_GET_LIST, getFacultiesListItems);
}

export function* wathcAddItem() {
  yield takeEvery(FACULTIES_LIST_ADD_ITEM, addFacultiesItem);
}

// export function* wathcUpdatePlans() {
//   yield takeEvery(SUBJECT_UPDATE_PLAN, updatePlansByDepartment);
// }

// export function* wathcUploadStudents() {
//   yield takeEvery(SUBJECT_UPLOAD_FILE, uploadfacultiesFileSaga);
// }

export function* wathcUpdateSubject() {
  yield takeEvery(FACULTIES_LIST_UPDATE_ITEM, updateFacultiesItem);
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(wathcAddItem), fork(wathcUpdateSubject)]);
}
