/* eslint-disable no-underscore-dangle */
import {
  FILES_GET_LIST,
  FILES_GET_LIST_SUCCESS,
  FILES_GET_LIST_ERROR,
  FILES_ADD_ITEM,
  FILES_ADD_ITEM_SUCCESS,
  FILES_ADD_ITEM_ERROR,
  FILES_DELETE_ITEM_SUCCESS,
  FILES_DELETE_ITEM_ERROR,
} from '../contants';

const INIT_STATE = {
  allFilesItems: null,
  filesItems: null,
  error: '',
  loading: false,
  selectedItems: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FILES_GET_LIST:
      return { ...state, loading: false };

    case FILES_GET_LIST_SUCCESS:
      return {
        ...state,
        loading: true,
        allFilesItems: action.payload,
        filesItems: action.payload,
      };

    case FILES_DELETE_ITEM_SUCCESS:
      return {
        ...state,
        loading: true,
        allFilesItems: state.allFilesItems.filter(
          (news) => news._id !== action.payload
        ),
        filesItems: state.filesItems.filter(
          (news) => news._id !== action.payload
        ),
      };

    case FILES_GET_LIST_ERROR:
      return { ...state, loading: true, error: action.payload };

    case FILES_ADD_ITEM:
      return { ...state, loading: false };

    case FILES_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: true,
        allFilesItems: [...state.allFilesItems, action.payload],
        filesItems: [...state.filesItems, action.payload],
      };
    case FILES_DELETE_ITEM_ERROR:
    case FILES_ADD_ITEM_ERROR:
      return { ...state, loading: true, error: action.payload };

    default:
      return { ...state };
  }
};
