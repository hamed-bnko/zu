/* eslint-disable no-underscore-dangle */
import {
  FACULTIES_LIST_GET_LIST,
  FACULTIES_LIST_GET_LIST_SUCCESS,
  FACULTIES_LIST_GET_LIST_ERROR,
  FACULTIES_LIST_GET_LIST_WITH_FILTER,
  FACULTIES_LIST_GET_LIST_WITH_ORDER,
  FACULTIES_LIST_GET_LIST_SEARCH,
  FACULTIES_LIST_ADD_ITEM,
  FACULTIES_LIST_ADD_ITEM_SUCCESS,
  FACULTIES_LIST_ADD_ITEM_ERROR,
  FACULTIES_LIST_UPDATE_ITEM_SUCCESS,
  FACULTIES_LIST_UPDATE_ITEM_ERROR,
  FACULTIES_LIST_SELECTED_ITEMS_CHANGE,
  FACULTIES_LIST_GET_LIST_WITH_TWO_FILTER,
} from '../contants';

const INIT_STATE = {
  allFacultiesItems: null,
  facultiesItems: null,
  error: '',
  filter: null,
  searchKeyword: '',
  orderColumn: null,
  loading: false,
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
  categories: ['3', '2', '1'],
  selectedItems: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FACULTIES_LIST_GET_LIST:
      return { ...state, loading: false };

    case FACULTIES_LIST_GET_LIST_SUCCESS:
      return {
        ...state,
        loading: true,
        allFacultiesItems: action.payload,
        facultiesItems: action.payload,
      };

    case FACULTIES_LIST_UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        loading: true,
        allFacultiesItems: state.allFacultiesItems.map((subject) =>
          subject._id === action.payload._id ? action.payload : subject
        ),
        facultiesItems: state.facultiesItems.map((subject) =>
          subject._id === action.payload._id ? action.payload : subject
        ),
      };

    case FACULTIES_LIST_GET_LIST_ERROR:
      return { ...state, loading: true, error: action.payload };

    case FACULTIES_LIST_GET_LIST_WITH_FILTER:
      if (action.payload.column === '' || action.payload.value === '') {
        return {
          ...state,
          loading: true,
          facultiesItems: state.allFacultiesItems,
          filter: null,
        };
      }
      // eslint-disable-next-line no-case-declarations
      const filteredItems = state.allFacultiesItems.filter(
        (item) =>
          item[action.payload.column] &&
          item[action.payload.column].toString() ===
            action.payload.value.toString()
      );
      return {
        ...state,
        loading: true,
        facultiesItems: filteredItems,
        filter: {
          column: action.payload.column,
          value: action.payload.value,
        },
      };

    case FACULTIES_LIST_GET_LIST_WITH_ORDER:
      if (action.payload === '') {
        return {
          ...state,
          loading: true,
          facultiesItems: state.facultiesItems,
          orderColumn: null,
        };
      }
      // eslint-disable-next-line no-case-declarations
      const sortedItems = state.facultiesItems.sort((a, b) => {
        if (a[action.payload] < b[action.payload]) return -1;
        if (a[action.payload] > b[action.payload]) return 1;
        return 0;
      });
      return {
        ...state,
        loading: true,
        facultiesItems: sortedItems,
        orderColumn: state.orderColumns.find(
          (x) => x.column === action.payload
        ),
      };

    case FACULTIES_LIST_GET_LIST_WITH_TWO_FILTER:
      if (
        action.payload.column === '' ||
        action.payload.value === '' ||
        action.payload.column1 === '' ||
        action.payload.value1 === ''
      ) {
        return {
          ...state,
          loading: true,
          facultiesItems: state.allFacultiesItems,
          filter: null,
        };
      }
      // eslint-disable-next-line no-case-declarations
      const filteredItems1 = state.allFacultiesItems.filter(
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
        facultiesItems: filteredItems1,
        filter: {
          column: action.payload.column,
          value: action.payload.value,
        },
      };

    case FACULTIES_LIST_GET_LIST_SEARCH:
      if (action.payload === '') {
        return { ...state, facultiesItems: state.allFacultiesItems };
      }
      // eslint-disable-next-line no-case-declarations
      const keyword = action.payload.toLowerCase();
      // eslint-disable-next-line no-case-declarations
      const searchItems = state.allFacultiesItems.filter(
        (item) =>
          (item.subjectname &&
            item.subjectname.toLowerCase().indexOf(keyword) > -1) ||
          (item.subjectCode &&
            item.subjectCode.toLowerCase().indexOf(keyword) > -1)
      );
      return {
        ...state,
        loading: true,
        facultiesItems: searchItems,
        searchKeyword: action.payload,
      };

    case FACULTIES_LIST_ADD_ITEM:
      return { ...state, loading: false };

    case FACULTIES_LIST_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: true,
        allFacultiesItems: [...state.allFacultiesItems, action.payload],
        facultiesItems: [...state.facultiesItems, action.payload],
      };
    case FACULTIES_LIST_UPDATE_ITEM_ERROR:
    case FACULTIES_LIST_ADD_ITEM_ERROR:
      return { ...state, loading: true, error: action.payload };

    case FACULTIES_LIST_SELECTED_ITEMS_CHANGE:
      return { ...state, loading: true, selectedItems: action.payload };
    default:
      return { ...state };
  }
};
