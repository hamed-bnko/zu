// eslint-disable-next-line import/no-cycle
import {
  NEWS_LIST_GET_LIST,
  NEWS_LIST_GET_LIST_SUCCESS,
  NEWS_LIST_GET_LIST_ERROR,
  NEWS_LIST_GET_LIST_BY_TRACKING,
  NEWS_LIST_GET_LIST_BY_TRACKING_SUCCESS,
  NEWS_LIST_GET_LIST_BY_TRACKING_ERROR,
  NEWS_LIST_GET_LIST_WITH_FILTER,
  NEWS_LIST_GET_LIST_WITH_ORDER,
  NEWS_LIST_GET_LIST_SEARCH,
  NEWS_LIST_ADD_ITEM,
  NEWS_LIST_ADD_ITEM_SUCCESS,
  NEWS_LIST_ADD_ITEM_ERROR,
  NEWS_LIST_UPDATE_ITEM,
  NEWS_LIST_UPDATE_ITEM_SUCCESS,
  NEWS_LIST_UPDATE_ITEM_ERROR,
  NEWS_LIST_DELETE_ITEM,
  NEWS_LIST_DELETE_ITEM_SUCCESS,
  NEWS_LIST_DELETE_ITEM_ERROR,
  NEWS_LIST_SELECTED_ITEMS_CHANGE,
  NEWS_LIST_GET_LIST_WITH_TWO_FILTER,
} from '../contants';

export const getNewsListByTracking = (tracking) => ({
  type: NEWS_LIST_GET_LIST_BY_TRACKING,
  payload: tracking,
});

export const getNewsListByTrackingSuccess = (items) => ({
  type: NEWS_LIST_GET_LIST_BY_TRACKING_SUCCESS,
  payload: items,
});

export const getNewsListByTrackingError = (error) => ({
  type: NEWS_LIST_GET_LIST_BY_TRACKING_ERROR,
  payload: error,
});

export const getNewsList = () => ({
  type: NEWS_LIST_GET_LIST,
});

export const getNewsListSuccess = (items) => ({
  type: NEWS_LIST_GET_LIST_SUCCESS,
  payload: items,
});

export const getNewsListError = (error) => ({
  type: NEWS_LIST_GET_LIST_ERROR,
  payload: error,
});

export const getNewsListWithFilter = (column, value) => ({
  type: NEWS_LIST_GET_LIST_WITH_FILTER,
  payload: { column, value },
});

export const getNewsListWithTowFilter = (column, value, column1, value1) => ({
  type: NEWS_LIST_GET_LIST_WITH_TWO_FILTER,
  payload: { column, value, column1, value1 },
});
export const getNewsListWithOrder = (column) => ({
  type: NEWS_LIST_GET_LIST_WITH_ORDER,
  payload: column,
});

export const getNewsListSearch = (keyword) => ({
  type: NEWS_LIST_GET_LIST_SEARCH,
  payload: keyword,
});

export const addNewsItem = (item) => ({
  type: NEWS_LIST_ADD_ITEM,
  payload: item,
});

export const addNewsItemSuccess = (items) => ({
  type: NEWS_LIST_ADD_ITEM_SUCCESS,
  payload: items,
});

export const addNewsItemError = (error) => ({
  type: NEWS_LIST_ADD_ITEM_ERROR,
  payload: error,
});

export const updateNewsItem = (item) => ({
  type: NEWS_LIST_UPDATE_ITEM,
  payload: item,
});

export const updateNewsItemSuccess = (item) => ({
  type: NEWS_LIST_UPDATE_ITEM_SUCCESS,
  payload: item,
});

export const updateNewsItemError = (error) => ({
  type: NEWS_LIST_UPDATE_ITEM_ERROR,
  payload: error,
});

export const deleteNewsItem = (id) => ({
  type: NEWS_LIST_DELETE_ITEM,
  payload: id,
});

export const deleteNewsItemSuccess = (id) => ({
  type: NEWS_LIST_DELETE_ITEM_SUCCESS,
  payload: id,
});

export const deleteNewsItemError = (error) => ({
  type: NEWS_LIST_DELETE_ITEM_ERROR,
  payload: error,
});

export const selectedNewsItemsChange = (selectedItems) => ({
  type: NEWS_LIST_SELECTED_ITEMS_CHANGE,
  payload: selectedItems,
});
