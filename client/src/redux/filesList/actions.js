// eslint-disable-next-line import/no-cycle
import {
  FILES_GET_LIST,
  FILES_GET_LIST_SUCCESS,
  FILES_GET_LIST_ERROR,
  FILES_ADD_ITEM,
  FILES_ADD_ITEM_SUCCESS,
  FILES_ADD_ITEM_ERROR,
  FILES_DELETE_ITEM,
  FILES_DELETE_ITEM_SUCCESS,
  FILES_DELETE_ITEM_ERROR,
} from '../contants';

export const getFilesList = (tracking) => ({
  type: FILES_GET_LIST,
  payload: tracking,
});

export const getFilesListSuccess = (items) => ({
  type: FILES_GET_LIST_SUCCESS,
  payload: items,
});

export const getFilesListError = (error) => ({
  type: FILES_GET_LIST_ERROR,
  payload: error,
});

export const addFileItem = (item) => ({
  type: FILES_ADD_ITEM,
  payload: item,
});

export const addFileItemSuccess = (items) => ({
  type: FILES_ADD_ITEM_SUCCESS,
  payload: items,
});

export const addFileItemError = (error) => ({
  type: FILES_ADD_ITEM_ERROR,
  payload: error,
});

export const deleteFileItem = (id) => ({
  type: FILES_DELETE_ITEM,
  payload: id,
});

export const deleteFileItemSuccess = (id) => ({
  type: FILES_DELETE_ITEM_SUCCESS,
  payload: id,
});

export const deleteFileItemError = (error) => ({
  type: FILES_DELETE_ITEM_ERROR,
  payload: error,
});
