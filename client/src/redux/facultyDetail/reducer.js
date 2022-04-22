import {
  FACULTY_GET_DETAILS,
  FACULTY_GET_DETAILS_SUCCESS,
  FACULTY_GET_DETAILS_ERROR,
} from '../contants';

const INIT_STATE = {
  faculty: null,
  loading: false,
  orderColumn: null,
  orderColumns: [
    { column: 'studentName', label: ' اسم الطالب' },
    { column: 'sid', label: ' رقم القيد' },
  ],
  marks: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FACULTY_GET_DETAILS:
      return { ...state, loading: false };

    case FACULTY_GET_DETAILS_SUCCESS:
      return {
        ...state,
        loading: true,
        faculty: action.payload,
      };

    case FACULTY_GET_DETAILS_ERROR:
      return { ...state, loading: true, error: action.payload };

    default:
      return { ...state };
  }
};
