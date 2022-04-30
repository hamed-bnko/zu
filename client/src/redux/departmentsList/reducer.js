/* eslint-disable no-underscore-dangle */
import {
  DEPARTMENTS_LIST_GET_LIST,
  DEPARTMENTS_LIST_GET_LIST_SUCCESS,
  DEPARTMENTS_LIST_GET_LIST_ERROR,
  DEPARTMENTS_LIST_ADD_ITEM,
  DEPARTMENTS_LIST_ADD_ITEM_SUCCESS,
  DEPARTMENTS_LIST_ADD_ITEM_ERROR,
  DEPARTMENTS_LIST_UPDATE_ITEM_SUCCESS,
  DEPARTMENTS_LIST_UPDATE_ITEM_ERROR,
  DEPARTMENTS_LIST_SELECTED_ITEMS_CHANGE,
} from '../contants';

const INIT_STATE = {
  departmentsItems: null,
  error: '',
  filter: null,
  searchKeyword: '',
  orderColumn: null,
  loading: false,
  labels: [
    { label: 'البكاليوريوس', value: 'البكاليوريوس', key: '1' },
    { label: 'الماجستير', value: 'الماجستير', key: '2' },
    { label: 'الدكتورا', value: 'الدكتورا', key: '3' },
  ],
  orderColumns: [
    { column: 'subjectname', label: 'عنوان المقرر' },
    { column: 'departmentName', label: ' القسم' },
    { column: 'unit', label: 'عدد الوحدات' },
  ],
  categories: ['سنة', 'فصل'],
  project: ['يوجد', 'لايوجد'],
  selectedItems: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case DEPARTMENTS_LIST_GET_LIST:
      return { ...state, loading: false };

    case DEPARTMENTS_LIST_GET_LIST_SUCCESS:
      return {
        ...state,
        loading: true,
        departmentsItems: action.payload,
      };

    case DEPARTMENTS_LIST_UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        loading: true,
        departmentsItems: state.departmentsItems.map((department) =>
          department._id === action.payload._id ? action.payload : department
        ),
      };

    case DEPARTMENTS_LIST_GET_LIST_ERROR:
      return { ...state, loading: true, error: action.payload };

    case DEPARTMENTS_LIST_ADD_ITEM:
      return { ...state, loading: false };

    case DEPARTMENTS_LIST_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: true,
        departmentsItems: [...state.departmentsItems, action.payload],
      };
    case DEPARTMENTS_LIST_UPDATE_ITEM_ERROR:
    case DEPARTMENTS_LIST_ADD_ITEM_ERROR:
      return { ...state, loading: true, error: action.payload };

    case DEPARTMENTS_LIST_SELECTED_ITEMS_CHANGE:
      return { ...state, loading: true, selectedItems: action.payload };
    default:
      return { ...state };
  }
};
