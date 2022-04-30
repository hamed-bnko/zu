/* eslint-disable no-underscore-dangle */
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
  ARTICLES_DELETE_ITEM_SUCCESS,
  ARTICLES_DELETE_ITEM_ERROR,
} from '../contants';

const INIT_STATE = {
  allArticlesItems: null,
  ArticlesItems: null,
  error: '',
  loading: false,
  selectedItems: [],
  filter: null,
  searchKeyword: '',
  orderColumn: null,
  orderColumns: [
    { column: 'name', label: 'اسم الكاتب' },
    { column: 'title', label: ' العنوان' },
  ],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ARTICLES_GET_LIST_BY_TRACKING:
    case ARTICLES_GET_LIST:
      return { ...state, loading: false };

    case ARTICLES_GET_LIST_SUCCESS:
      return {
        ...state,
        loading: true,
        allArticlesItems: action.payload,
        ArticlesItems: action.payload,
      };
    case ARTICLES_GET_LIST_BY_TRACKING_SUCCESS:
    case ARTICLES_DELETE_ITEM_SUCCESS:
      return {
        ...state,
        loading: true,
        allArticlesItems: state.allArticlesItems.filter(
          (news) => news._id !== action.payload
        ),
        ArticlesItems: state.ArticlesItems.filter(
          (news) => news._id !== action.payload
        ),
      };

    case ARTICLES_GET_LIST_ERROR:
      return { ...state, loading: true, error: action.payload };

    case ARTICLES_ADD_ITEM:
      return { ...state, loading: false };

    case ARTICLES_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: true,
        allArticlesItems: [...state.allArticlesItems, action.payload],
        ArticlesItems: [...state.ArticlesItems, action.payload],
      };
    case ARTICLES_GET_LIST_BY_TRACKING_ERROR:
    case ARTICLES_DELETE_ITEM_ERROR:
    case ARTICLES_ADD_ITEM_ERROR:
      return { ...state, loading: true, error: action.payload };

    default:
      return { ...state };
  }
};
