/* eslint-disable no-underscore-dangle */
import {
  ADVS_LIST_GET_LIST,
  ADVS_LIST_GET_LIST_SUCCESS,
  ADVS_LIST_GET_LIST_ERROR,
  ADVS_LIST_GET_LIST_WITH_FILTER,
  ADVS_LIST_GET_LIST_WITH_ORDER,
  ADVS_LIST_GET_LIST_SEARCH,
  ADVS_LIST_ADD_ITEM,
  ADVS_LIST_ADD_ITEM_SUCCESS,
  ADVS_LIST_ADD_ITEM_ERROR,
  ADVS_LIST_UPDATE_ITEM_SUCCESS,
  ADVS_LIST_UPDATE_ITEM_ERROR,
  ADVS_LIST_SELECTED_ITEMS_CHANGE,
  ADVS_LIST_GET_LIST_WITH_TWO_FILTER,
  ADVS_LIST_DELETE_ITEM_SUCCESS,
  ADVS_LIST_DELETE_ITEM_ERROR,
  ADVS_LIST_GET_LIST_BY_TRACKING,
  ADVS_LIST_GET_LIST_BY_TRACKING_SUCCESS,
  ADVS_LIST_GET_LIST_BY_TRACKING_ERROR,
} from '../contants';

const INIT_STATE = {
  allAdvsItems: null,
  advsItems: null,
  error: '',
  filter: null,
  searchKeyword: '',
  orderColumn: null,
  loading: false,
  departments: null,
  labels: [
    { label: 'الفصل الاول', color: 'secondary', year: '1' },
    { label: 'الفصل التاني', color: 'primary', year: '2' },
    { label: 'الفصل الثالث', color: 'info', year: '3' },
    { label: 'الفصل الرابع', color: 'secondary', year: '4' },
    { label: 'الفصل الخامس', color: 'primary', year: '5' },
    { label: 'الفصل السادس', color: 'info', year: '6' },
  ],
  orderColumns: [
    { column: 'subjectname', label: 'عنوان المقرر' },
    { column: 'departmentName', label: ' القسم' },
    { column: 'unit', label: 'عدد الوحدات' },
  ],
  categories: ['داعمة', 'تخصص', 'عامة'],
  selectedItems: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADVS_LIST_GET_LIST_BY_TRACKING:
    case ADVS_LIST_GET_LIST:
      return { ...state, loading: false };

    case ADVS_LIST_GET_LIST_BY_TRACKING_SUCCESS:
    case ADVS_LIST_GET_LIST_SUCCESS:
      return {
        ...state,
        loading: true,
        allAdvsItems: action.payload,
        advsItems: action.payload,
      };

    case ADVS_LIST_DELETE_ITEM_SUCCESS:
      return {
        ...state,
        loading: true,
        allAdvsItems: state.allAdvsItems.filter(
          (news) => news._id !== action.payload
        ),
        advsItems: state.advsItems.filter(
          (news) => news._id !== action.payload
        ),
      };
    case ADVS_LIST_UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        loading: true,
        allAdvsItems: state.allAdvsItems.map((subject) =>
          subject._id === action.payload._id ? action.payload : subject
        ),
        advsItems: state.advsItems.map((subject) =>
          subject._id === action.payload._id ? action.payload : subject
        ),
      };
    case ADVS_LIST_GET_LIST_BY_TRACKING_ERROR:
    case ADVS_LIST_GET_LIST_ERROR:
      return { ...state, loading: true, error: action.payload };

    case ADVS_LIST_GET_LIST_WITH_FILTER:
      if (action.payload.column === '' || action.payload.value === '') {
        return {
          ...state,
          loading: true,
          advsItems: state.allAdvsItems,
          filter: null,
        };
      }
      // eslint-disable-next-line no-case-declarations
      const filteredItems = state.allAdvsItems.filter(
        (item) =>
          item[action.payload.column] &&
          item[action.payload.column].toString() ===
            action.payload.value.toString()
      );
      return {
        ...state,
        loading: true,
        advsItems: filteredItems,
        filter: {
          column: action.payload.column,
          value: action.payload.value,
        },
      };

    case ADVS_LIST_GET_LIST_WITH_ORDER:
      if (action.payload === '') {
        return {
          ...state,
          loading: true,
          advsItems: state.advsItems,
          orderColumn: null,
        };
      }
      // eslint-disable-next-line no-case-declarations
      const sortedItems = state.advsItems.sort((a, b) => {
        if (a[action.payload] < b[action.payload]) return -1;
        if (a[action.payload] > b[action.payload]) return 1;
        return 0;
      });
      return {
        ...state,
        loading: true,
        advsItems: sortedItems,
        orderColumn: state.orderColumns.find(
          (x) => x.column === action.payload
        ),
      };

    case ADVS_LIST_GET_LIST_WITH_TWO_FILTER:
      if (
        action.payload.column === '' ||
        action.payload.value === '' ||
        action.payload.column1 === '' ||
        action.payload.value1 === ''
      ) {
        return {
          ...state,
          loading: true,
          advsItems: state.allAdvsItems,
          filter: null,
        };
      }
      // eslint-disable-next-line no-case-declarations
      const filteredItems1 = state.allAdvsItems.filter(
        (item) =>
          item[action.payload.column] &&
          item[action.payload.column].toString() ===
            action.payload.value.toString() &&
          item[action.payload.column1] &&
          item[action.payload.column1].toString() ===
            action.payload.value1.toString()
      );
      return {
        ...state,
        loading: true,
        advsItems: filteredItems1,
        filter: {
          column: action.payload.column,
          value: action.payload.value,
        },
      };

    case ADVS_LIST_GET_LIST_SEARCH:
      if (action.payload === '') {
        return { ...state, advsItems: state.allAdvsItems };
      }
      // eslint-disable-next-line no-case-declarations
      const keyword = action.payload.toLowerCase();
      // eslint-disable-next-line no-case-declarations
      const searchItems = state.allAdvsItems.filter(
        (item) =>
          (item.subjectname &&
            item.subjectname.toLowerCase().indexOf(keyword) > -1) ||
          (item.subjectCode &&
            item.subjectCode.toLowerCase().indexOf(keyword) > -1)
      );
      return {
        ...state,
        loading: true,
        advsItems: searchItems,
        searchKeyword: action.payload,
      };

    case ADVS_LIST_ADD_ITEM:
      return { ...state, loading: false };

    case ADVS_LIST_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: true,
        allAdvsItems: [...state.allAdvsItems, action.payload],
        advsItems: [...state.advsItems, action.payload],
      };
    case ADVS_LIST_DELETE_ITEM_ERROR:
    case ADVS_LIST_UPDATE_ITEM_ERROR:
    case ADVS_LIST_ADD_ITEM_ERROR:
      return { ...state, loading: true, error: action.payload };

    case ADVS_LIST_SELECTED_ITEMS_CHANGE:
      return { ...state, loading: true, selectedItems: action.payload };
    default:
      return { ...state };
  }
};
