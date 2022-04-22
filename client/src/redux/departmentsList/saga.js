import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { Url } from 'constants/defaultValues';

import {
  DEPARTMENTS_LIST_GET_LIST,
  DEPARTMENTS_LIST_ADD_ITEM,
  DEPARTMENTS_LIST_UPDATE_ITEM,
} from '../contants';

import {
  getDepartmentsListSuccess,
  getDepartmentsListError,
  addDepartmentItemSuccess,
  addDepartmentItemError,
  updateDepartmentItemSuccess,
  updateDepartmentItemError,
} from './actions';

const getDepartmentsListRequest = async (url) =>
  // eslint-disable-next-line no-return-await
  await axios.get(`${Url}api/departments/byfaculty/${url}`);

function* getDepartmentsListItems({ payload }) {
  try {
    const response = yield call(getDepartmentsListRequest, payload);
    yield put(getDepartmentsListSuccess(response.data));
  } catch (error) {
    yield put(getDepartmentsListError(error));
  }
}

const addDepartmentsItemRequest = async (item) =>
  // eslint-disable-next-line no-return-await
  await axios.post(`${Url}api/departments`, item);

function* addDepartmentsItem({ payload }) {
  try {
    const response = yield call(addDepartmentsItemRequest, payload);
    yield put(addDepartmentItemSuccess(response.data));
  } catch (error) {
    yield put(addDepartmentItemError(error));
  }
}

const updateDepartmentsItemRequest = async (item) =>
  // eslint-disable-next-line no-return-await
  await axios.put(`${Url}api/departments/${item.id}`, item);

function* updateDepartmentsItem({ payload }) {
  try {
    const response = yield call(updateDepartmentsItemRequest, payload);
    yield put(updateDepartmentItemSuccess(response.data));
  } catch (error) {
    yield put(updateDepartmentItemError(error));
  }
}

// const addUpdatePlansByDepartmentRequest = async (id) =>
//   // eslint-disable-next-line no-return-await
//   await axios.get(`${Url}api/Departments/department/${id}`);

// function* updatePlansByDepartment({ payload }) {
//   try {
//     const response = yield call(addUpdatePlansByDepartmentRequest, payload);
//     yield put(addDepartmentItemSuccess(response.data));
//   } catch (error) {
//     yield put(addDepartmentItemError(error));
//   }
// }

// const uploadDepartmentsItemRequest = async ({
//   file,
//   departmentName,
//   department,
// }) => {
//   const formData = new FormData();
//   formData.append('Departments', file);
//   formData.append('departmentName', departmentName);
//   formData.append('department', department);
//   // eslint-disable-next-line no-return-await
//   return await axios.post(`${Url}api/Departments/uploadDepartments`, formData);
// };
// function* uploadDepartmentsFileSaga({ payload }) {
//   try {
//     const response = yield call(uploadDepartmentsItemRequest, payload);
//     yield put(uploadDepartmentsListSuccess(response.data));
//   } catch (error) {
//     yield put(getDepartmentsListError(error));
//   }
// }

export function* watchGetList() {
  yield takeEvery(DEPARTMENTS_LIST_GET_LIST, getDepartmentsListItems);
}

export function* wathcAddItem() {
  yield takeEvery(DEPARTMENTS_LIST_ADD_ITEM, addDepartmentsItem);
}

// export function* wathcUpdatePlans() {
//   yield takeEvery(SUBJECT_UPDATE_PLAN, updatePlansByDepartment);
// }

// export function* wathcUploadStudents() {
//   yield takeEvery(SUBJECT_UPLOAD_FILE, uploadDepartmentsFileSaga);
// }

export function* wathcUpdateSubject() {
  yield takeEvery(DEPARTMENTS_LIST_UPDATE_ITEM, updateDepartmentsItem);
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(wathcAddItem), fork(wathcUpdateSubject)]);
}
