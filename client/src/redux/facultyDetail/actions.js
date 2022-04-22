// eslint-disable-next-line import/no-cycle
import {
  FACULTY_GET_DETAILS,
  FACULTY_GET_DETAILS_SUCCESS,
  FACULTY_GET_DETAILS_ERROR,
} from '../contants';

export const getFacultyDetail = (url) => ({
  type: FACULTY_GET_DETAILS,
  payload: url,
});

export const getFacultyDetailSuccess = (item) => ({
  type: FACULTY_GET_DETAILS_SUCCESS,
  payload: item,
});

export const getFacultyDetailError = (error) => ({
  type: FACULTY_GET_DETAILS_ERROR,
  payload: error,
});
