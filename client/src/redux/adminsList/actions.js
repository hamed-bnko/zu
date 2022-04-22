// eslint-disable-next-line import/no-cycle
import {
  ADMINS_LIST_GET_LIST,
  ADMINS_LIST_GET_LIST_SUCCESS,
  ADMINS_LIST_GET_LIST_ERROR,
  ADMINS_LIST_GET_LIST_WITH_FILTER,
  ADMINS_LIST_GET_LIST_WITH_ORDER,
  ADMINS_LIST_GET_LIST_SEARCH,
  ADMINS_LIST_ADD_ITEM,
  ADMINS_LIST_ADD_ITEM_SUCCESS,
  ADMINS_LIST_ADD_ITEM_ERROR,
  ADMINS_LIST_DELETE_ITEM,
  ADMINS_LIST_DELETE_ITEM_SUCCESS,
  ADMINS_LIST_SELECTED_ITEMS_CHANGE,
} from '../contants';

export const getAdminsList = () => ({
  type: ADMINS_LIST_GET_LIST,
});

export const getAdminsListSuccess = (items) => ({
  type: ADMINS_LIST_GET_LIST_SUCCESS,
  payload: items,
});

export const getAdminsListError = (error) => ({
  type: ADMINS_LIST_GET_LIST_ERROR,
  payload: error,
});

export const getAdminsListWithFilter = (column, value) => ({
  type: ADMINS_LIST_GET_LIST_WITH_FILTER,
  payload: { column, value },
});

export const getAdminsListWithOrder = (column) => ({
  type: ADMINS_LIST_GET_LIST_WITH_ORDER,
  payload: column,
});

export const getAdminsListSearch = (keyword) => ({
  type: ADMINS_LIST_GET_LIST_SEARCH,
  payload: keyword,
});

export const addAdminItem = (item) => ({
  type: ADMINS_LIST_ADD_ITEM,
  payload: item,
});

export const addAdminItemSuccess = (items) => ({
  type: ADMINS_LIST_ADD_ITEM_SUCCESS,
  payload: items,
});

export const addAdminItemError = (error) => ({
  type: ADMINS_LIST_ADD_ITEM_ERROR,
  payload: error,
});

export const deleteAdminItem = (id) => ({
  type: ADMINS_LIST_DELETE_ITEM,
  payload: id,
});

export const deleteAdminItemSuccess = (id) => ({
  type: ADMINS_LIST_DELETE_ITEM_SUCCESS,
  payload: id,
});
export const selectedAdminsItemsChange = (selectedItems) => ({
  type: ADMINS_LIST_SELECTED_ITEMS_CHANGE,
  payload: selectedItems,
});
