/* eslint-disable no-underscore-dangle */
import {
  FACULTIES_LIST_GET_LIST,
  FACULTIES_LIST_GET_LIST_SUCCESS,
  FACULTIES_LIST_GET_LIST_ERROR,
  FACULTIES_LIST_ADD_ITEM,
  FACULTIES_LIST_ADD_ITEM_SUCCESS,
  FACULTIES_LIST_ADD_ITEM_ERROR,
  FACULTIES_LIST_UPDATE_ITEM_SUCCESS,
  FACULTIES_LIST_UPDATE_ITEM_ERROR,
  FACULTIES_LIST_SELECTED_ITEMS_CHANGE,
} from '../contants';

const INIT_STATE = {
  departmentsItems: null,
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
        departmentsItems: action.payload,
      };

    case FACULTIES_LIST_UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        loading: true,
        departmentsItems: state.departmentsItems.map((department) =>
          department._id === action.payload._id ? action.payload : department
        ),
      };

    case FACULTIES_LIST_GET_LIST_ERROR:
      return { ...state, loading: true, error: action.payload };

    case FACULTIES_LIST_ADD_ITEM:
      return { ...state, loading: false };

    case FACULTIES_LIST_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: true,
        departmentsItems: [...state.departmentsItems, action.payload],
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
