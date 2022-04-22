/* eslint-disable no-underscore-dangle */
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
  ADMINS_LIST_DELETE_ITEM_SUCCESS,
  ADMINS_LIST_SELECTED_ITEMS_CHANGE,
} from '../contants';

const INIT_STATE = {
  alladminsItems: null,
  adminsItems: null,
  equationadminsItems: [],
  error: '',
  filter: null,
  searchKeyword: '',
  orderColumn: null,
  loading: false,
  departments: null,
  orderColumns: [
    { column: 'name', label: 'الاسم ' },
    { column: 'roles', label: 'الصلاحيات' },
  ],

  selectedItems: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADMINS_LIST_GET_LIST:
      return { ...state, loading: false };

    case ADMINS_LIST_GET_LIST_SUCCESS:
      return {
        ...state,
        loading: true,
        alladminsItems: action.payload,
        adminsItems: action.payload,
      };

    case ADMINS_LIST_GET_LIST_ERROR:
      return { ...state, loading: true, error: action.payload };
    case ADMINS_LIST_DELETE_ITEM_SUCCESS:
      return {
        ...state,
        alladminsItems: state.alladminsItems.filter(
          (item) => item._id !== action.payload
        ),
        adminsItems: state.adminsItems.filter(
          (item) => item._id !== action.payload
        ),
      };
    case ADMINS_LIST_GET_LIST_WITH_FILTER:
      if (action.payload.column === '' || action.payload.value === '') {
        return {
          ...state,
          loading: true,
          adminsItems: state.alladminsItems,
          filter: null,
        };
      }
      // eslint-disable-next-line no-case-declarations
      const filteredItems = state.alladminsItems.filter(
        (item) =>
          item[action.payload.column] &&
          item[action.payload.column].toString() ===
            action.payload.value.toString()
      );
      return {
        ...state,
        loading: true,
        adminsItems: filteredItems,
        filter: {
          column: action.payload.column,
          value: action.payload.value,
        },
      };

    case ADMINS_LIST_GET_LIST_WITH_ORDER:
      if (action.payload === '') {
        return {
          ...state,
          loading: true,
          adminsItems: state.adminsItems,
          orderColumn: null,
        };
      }
      // eslint-disable-next-line no-case-declarations
      const sortedItems = state.adminsItems.sort((a, b) => {
        if (a[action.payload] < b[action.payload]) return -1;
        if (a[action.payload] > b[action.payload]) return 1;
        return 0;
      });
      return {
        ...state,
        loading: true,
        adminsItems: sortedItems,
        orderColumn: state.orderColumns.find(
          (x) => x.column === action.payload
        ),
      };

    case ADMINS_LIST_GET_LIST_SEARCH:
      if (action.payload === '') {
        return { ...state, adminsItems: state.alladminsItems };
      }
      // eslint-disable-next-line no-case-declarations
      const keyword = action.payload.toLowerCase();
      // eslint-disable-next-line no-case-declarations
      const searchItems = state.alladminsItems.filter(
        (item) =>
          item.title.toLowerCase().indexOf(keyword) > -1 ||
          item.detail.toLowerCase().indexOf(keyword) > -1 ||
          item.status.toLowerCase().indexOf(keyword) > -1 ||
          item.category.toLowerCase().indexOf(keyword) > -1 ||
          item.label.toLowerCase().indexOf(keyword) > -1
      );
      return {
        ...state,
        loading: true,
        adminsItems: searchItems,
        searchKeyword: action.payload,
      };

    case ADMINS_LIST_ADD_ITEM:
      return { ...state, loading: false };

    case ADMINS_LIST_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: true,
        alladminsItems: [...state.alladminsItems, action.payload],
        adminsItems: [...state.alladminsItems, action.payload],
      };

    case ADMINS_LIST_ADD_ITEM_ERROR:
      return { ...state, loading: true, error: action.payload };

    case ADMINS_LIST_SELECTED_ITEMS_CHANGE:
      return { ...state, loading: true, selectedItems: action.payload };
    default:
      return { ...state };
  }
};
