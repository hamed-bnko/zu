// eslint-disable-next-line import/no-cycle
import {
  ARTICLES_GET_LIST,
  ARTICLES_GET_LIST_SUCCESS,
  ARTICLES_GET_LIST_ERROR,
  ARTICLES_GET_LIST_BY_TRACKING,
  ARTICLES_GET_LIST_BY_TRACKING_SUCCESS,
  ARTICLES_GET_LIST_BY_TRACKING_ERROR,
  ARTICLES_ADD_ITEM,
  ARTICLES_ADD_ITEM_SUCCESS,
  ARTICLES_ADD_ITEM_ERROR,
  ARTICLES_DELETE_ITEM,
  ARTICLES_DELETE_ITEM_SUCCESS,
  ARTICLES_DELETE_ITEM_ERROR,
} from '../contants';

export const getArticlesList = () => ({
  type: ARTICLES_GET_LIST,
});

export const getArticlesListSuccess = (items) => ({
  type: ARTICLES_GET_LIST_SUCCESS,
  payload: items,
});

export const getArticlesListError = (error) => ({
  type: ARTICLES_GET_LIST_ERROR,
  payload: error,
});
export const getArticlesListByTracking = (tracking) => ({
  type: ARTICLES_GET_LIST_BY_TRACKING,
  payload: tracking,
});

export const getArticlesListByTrackingSuccess = (items) => ({
  type: ARTICLES_GET_LIST_BY_TRACKING_SUCCESS,
  payload: items,
});

export const getArticlesListByTrackingError = (error) => ({
  type: ARTICLES_GET_LIST_BY_TRACKING_ERROR,
  payload: error,
});

export const addArticlesItem = (item) => ({
  type: ARTICLES_ADD_ITEM,
  payload: item,
});

export const addArticlesItemSuccess = (items) => ({
  type: ARTICLES_ADD_ITEM_SUCCESS,
  payload: items,
});

export const addArticlesItemError = (error) => ({
  type: ARTICLES_ADD_ITEM_ERROR,
  payload: error,
});

export const deleteArticlesItem = (id) => ({
  type: ARTICLES_DELETE_ITEM,
  payload: id,
});

export const deleteArticlesItemSuccess = (id) => ({
  type: ARTICLES_DELETE_ITEM_SUCCESS,
  payload: id,
});

export const deleteArticlesItemError = (error) => ({
  type: ARTICLES_DELETE_ITEM_ERROR,
  payload: error,
});
