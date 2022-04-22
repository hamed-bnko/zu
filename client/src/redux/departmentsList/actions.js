// eslint-disable-next-line import/no-cycle
import {
  DEPARTMENTS_LIST_GET_LIST,
  DEPARTMENTS_LIST_GET_LIST_SUCCESS,
  DEPARTMENTS_LIST_GET_LIST_ERROR,
  DEPARTMENTS_LIST_ADD_ITEM,
  DEPARTMENTS_LIST_ADD_ITEM_SUCCESS,
  DEPARTMENTS_LIST_ADD_ITEM_ERROR,
  DEPARTMENTS_LIST_UPDATE_ITEM,
  DEPARTMENTS_LIST_UPDATE_ITEM_SUCCESS,
  DEPARTMENTS_LIST_UPDATE_ITEM_ERROR,
  DEPARTMENTS_LIST_SELECTED_ITEMS_CHANGE,
} from '../contants';

export const getDepartmentsList = (url) => ({
  type: DEPARTMENTS_LIST_GET_LIST,
  payload: url,
});

export const getDepartmentsListSuccess = (items) => ({
  type: DEPARTMENTS_LIST_GET_LIST_SUCCESS,
  payload: items,
});

export const getDepartmentsListError = (error) => ({
  type: DEPARTMENTS_LIST_GET_LIST_ERROR,
  payload: error,
});

export const addDepartmentItem = (item) => ({
  type: DEPARTMENTS_LIST_ADD_ITEM,
  payload: item,
});

export const addDepartmentItemSuccess = (items) => ({
  type: DEPARTMENTS_LIST_ADD_ITEM_SUCCESS,
  payload: items,
});

export const addDepartmentItemError = (error) => ({
  type: DEPARTMENTS_LIST_ADD_ITEM_ERROR,
  payload: error,
});

export const updateDepartmentItem = (item) => ({
  type: DEPARTMENTS_LIST_UPDATE_ITEM,
  payload: item,
});

export const updateDepartmentItemSuccess = (item) => ({
  type: DEPARTMENTS_LIST_UPDATE_ITEM_SUCCESS,
  payload: item,
});

export const updateDepartmentItemError = (error) => ({
  type: DEPARTMENTS_LIST_UPDATE_ITEM_ERROR,
  payload: error,
});

export const selectedFacultiesItemsChange = (selectedItems) => ({
  type: DEPARTMENTS_LIST_SELECTED_ITEMS_CHANGE,
  payload: selectedItems,
});
