// eslint-disable-next-line import/no-cycle
import {
  ADVS_LIST_GET_LIST,
  ADVS_LIST_GET_LIST_SUCCESS,
  ADVS_LIST_GET_LIST_ERROR,
  ADVS_LIST_GET_LIST_BY_TRACKING,
  ADVS_LIST_GET_LIST_BY_TRACKING_SUCCESS,
  ADVS_LIST_GET_LIST_BY_TRACKING_ERROR,
  ADVS_LIST_GET_LIST_WITH_FILTER,
  ADVS_LIST_GET_LIST_WITH_ORDER,
  ADVS_LIST_GET_LIST_SEARCH,
  ADVS_LIST_ADD_ITEM,
  ADVS_LIST_ADD_ITEM_SUCCESS,
  ADVS_LIST_ADD_ITEM_ERROR,
  ADVS_LIST_UPDATE_ITEM,
  ADVS_LIST_UPDATE_ITEM_SUCCESS,
  ADVS_LIST_UPDATE_ITEM_ERROR,
  ADVS_LIST_DELETE_ITEM,
  ADVS_LIST_DELETE_ITEM_SUCCESS,
  ADVS_LIST_DELETE_ITEM_ERROR,
  ADVS_LIST_SELECTED_ITEMS_CHANGE,
  ADVS_LIST_GET_LIST_WITH_TWO_FILTER,
} from '../contants';

export const getAdvsListByTracking = (tracking) => ({
  type: ADVS_LIST_GET_LIST_BY_TRACKING,
  payload: tracking,
});

export const getAdvsListByTrackingSuccess = (items) => ({
  type: ADVS_LIST_GET_LIST_BY_TRACKING_SUCCESS,
  payload: items,
});

export const getAdvsListByTrackingError = (error) => ({
  type: ADVS_LIST_GET_LIST_BY_TRACKING_ERROR,
  payload: error,
});
export const getAdvsList = () => ({
  type: ADVS_LIST_GET_LIST,
});

export const getAdvsListSuccess = (items) => ({
  type: ADVS_LIST_GET_LIST_SUCCESS,
  payload: items,
});

export const getAdvsListError = (error) => ({
  type: ADVS_LIST_GET_LIST_ERROR,
  payload: error,
});

export const getAdvsListWithFilter = (column, value) => ({
  type: ADVS_LIST_GET_LIST_WITH_FILTER,
  payload: { column, value },
});

export const getAdvsListWithTowFilter = (column, value, column1, value1) => ({
  type: ADVS_LIST_GET_LIST_WITH_TWO_FILTER,
  payload: { column, value, column1, value1 },
});
export const getAdvsListWithOrder = (column) => ({
  type: ADVS_LIST_GET_LIST_WITH_ORDER,
  payload: column,
});

export const getAdvsListSearch = (keyword) => ({
  type: ADVS_LIST_GET_LIST_SEARCH,
  payload: keyword,
});

export const addAdvsItem = (item) => ({
  type: ADVS_LIST_ADD_ITEM,
  payload: item,
});

export const addAdvsItemSuccess = (items) => ({
  type: ADVS_LIST_ADD_ITEM_SUCCESS,
  payload: items,
});

export const addAdvsItemError = (error) => ({
  type: ADVS_LIST_ADD_ITEM_ERROR,
  payload: error,
});

export const updateAdvsItem = (item) => ({
  type: ADVS_LIST_UPDATE_ITEM,
  payload: item,
});

export const updateAdvsItemSuccess = (item) => ({
  type: ADVS_LIST_UPDATE_ITEM_SUCCESS,
  payload: item,
});

export const updateAdvsItemError = (error) => ({
  type: ADVS_LIST_UPDATE_ITEM_ERROR,
  payload: error,
});

export const deleteAdvsItem = (id) => ({
  type: ADVS_LIST_DELETE_ITEM,
  payload: id,
});

export const deleteAdvsItemSuccess = (id) => ({
  type: ADVS_LIST_DELETE_ITEM_SUCCESS,
  payload: id,
});

export const deleteAdvsItemError = (error) => ({
  type: ADVS_LIST_DELETE_ITEM_ERROR,
  payload: error,
});

export const selectedAdvsItemsChange = (selectedItems) => ({
  type: ADVS_LIST_SELECTED_ITEMS_CHANGE,
  payload: selectedItems,
});
