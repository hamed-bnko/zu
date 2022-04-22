/* eslint-disable no-underscore-dangle */
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
  NEWS_LIST_UPDATE_ITEM_SUCCESS,
  NEWS_LIST_UPDATE_ITEM_ERROR,
  NEWS_LIST_SELECTED_ITEMS_CHANGE,
  NEWS_LIST_GET_LIST_WITH_TWO_FILTER,
  NEWS_LIST_DELETE_ITEM_SUCCESS,
  NEWS_LIST_DELETE_ITEM_ERROR,
} from '../contants';

const INIT_STATE = {
  allNewsItems: null,
  newsItems: null,
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
    case NEWS_LIST_GET_LIST_BY_TRACKING:
    case NEWS_LIST_GET_LIST:
      return { ...state, loading: false };

    case NEWS_LIST_GET_LIST_BY_TRACKING_SUCCESS:
    case NEWS_LIST_GET_LIST_SUCCESS:
      return {
        ...state,
        loading: true,
        allNewsItems: action.payload,
        newsItems: action.payload,
      };

    case NEWS_LIST_DELETE_ITEM_SUCCESS:
      return {
        ...state,
        loading: true,
        allNewsItems: state.allNewsItems.filter(
          (news) => news._id !== action.payload
        ),
        newsItems: state.newsItems.filter(
          (news) => news._id !== action.payload
        ),
      };
    case NEWS_LIST_UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        loading: true,
        allNewsItems: state.allNewsItems.map((subject) =>
          subject._id === action.payload._id ? action.payload : subject
        ),
        newsItems: state.newsItems.map((subject) =>
          subject._id === action.payload._id ? action.payload : subject
        ),
      };
    case NEWS_LIST_GET_LIST_BY_TRACKING_ERROR:
    case NEWS_LIST_GET_LIST_ERROR:
      return { ...state, loading: true, error: action.payload };

    case NEWS_LIST_GET_LIST_WITH_FILTER:
      if (action.payload.column === '' || action.payload.value === '') {
        return {
          ...state,
          loading: true,
          newsItems: state.allNewsItems,
          filter: null,
        };
      }
      // eslint-disable-next-line no-case-declarations
      const filteredItems = state.allNewsItems.filter(
        (item) =>
          item[action.payload.column] &&
          item[action.payload.column].toString() ===
            action.payload.value.toString()
      );
      return {
        ...state,
        loading: true,
        newsItems: filteredItems,
        filter: {
          column: action.payload.column,
          value: action.payload.value,
        },
      };

    case NEWS_LIST_GET_LIST_WITH_ORDER:
      if (action.payload === '') {
        return {
          ...state,
          loading: true,
          newsItems: state.newsItems,
          orderColumn: null,
        };
      }
      // eslint-disable-next-line no-case-declarations
      const sortedItems = state.newsItems.sort((a, b) => {
        if (a[action.payload] < b[action.payload]) return -1;
        if (a[action.payload] > b[action.payload]) return 1;
        return 0;
      });
      return {
        ...state,
        loading: true,
        newsItems: sortedItems,
        orderColumn: state.orderColumns.find(
          (x) => x.column === action.payload
        ),
      };

    case NEWS_LIST_GET_LIST_WITH_TWO_FILTER:
      if (
        action.payload.column === '' ||
        action.payload.value === '' ||
        action.payload.column1 === '' ||
        action.payload.value1 === ''
      ) {
        return {
          ...state,
          loading: true,
          newsItems: state.allNewsItems,
          filter: null,
        };
      }
      // eslint-disable-next-line no-case-declarations
      const filteredItems1 = state.allNewsItems.filter(
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
        newsItems: filteredItems1,
        filter: {
          column: action.payload.column,
          value: action.payload.value,
        },
      };

    case NEWS_LIST_GET_LIST_SEARCH:
      if (action.payload === '') {
        return { ...state, newsItems: state.allNewsItems };
      }
      // eslint-disable-next-line no-case-declarations
      const keyword = action.payload.toLowerCase();
      // eslint-disable-next-line no-case-declarations
      const searchItems = state.allNewsItems.filter(
        (item) =>
          (item.subjectname &&
            item.subjectname.toLowerCase().indexOf(keyword) > -1) ||
          (item.subjectCode &&
            item.subjectCode.toLowerCase().indexOf(keyword) > -1)
      );
      return {
        ...state,
        loading: true,
        newsItems: searchItems,
        searchKeyword: action.payload,
      };

    case NEWS_LIST_ADD_ITEM:
      return { ...state, loading: false };

    case NEWS_LIST_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: true,
        allNewsItems: [...state.allNewsItems, action.payload],
        newsItems: [...state.newsItems, action.payload],
      };
    case NEWS_LIST_DELETE_ITEM_ERROR:
    case NEWS_LIST_UPDATE_ITEM_ERROR:
    case NEWS_LIST_ADD_ITEM_ERROR:
      return { ...state, loading: true, error: action.payload };

    case NEWS_LIST_SELECTED_ITEMS_CHANGE:
      return { ...state, loading: true, selectedItems: action.payload };
    default:
      return { ...state };
  }
};
