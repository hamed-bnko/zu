// eslint-disable-next-line import/no-cycle
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
  FACULTIES_LIST_UPDATE_ITEM,
  FACULTIES_LIST_UPDATE_ITEM_SUCCESS,
  FACULTIES_LIST_UPDATE_ITEM_ERROR,
  FACULTIES_LIST_SELECTED_ITEMS_CHANGE,
  FACULTIES_LIST_GET_LIST_WITH_TWO_FILTER,
} from '../contants';

export const getFacultiesList = () => ({
  type: FACULTIES_LIST_GET_LIST,
});

export const getFacultiesListSuccess = (items) => ({
  type: FACULTIES_LIST_GET_LIST_SUCCESS,
  payload: items,
});

export const getFacultiesListError = (error) => ({
  type: FACULTIES_LIST_GET_LIST_ERROR,
  payload: error,
});

export const getFacultiesListWithFilter = (column, value) => ({
  type: FACULTIES_LIST_GET_LIST_WITH_FILTER,
  payload: { column, value },
});

export const getFacultiesListWithTowFilter = (
  column,
  value,
  column1,
  value1
) => ({
  type: FACULTIES_LIST_GET_LIST_WITH_TWO_FILTER,
  payload: { column, value, column1, value1 },
});
export const getFacultiesListWithOrder = (column) => ({
  type: FACULTIES_LIST_GET_LIST_WITH_ORDER,
  payload: column,
});

export const getFacultiesListSearch = (keyword) => ({
  type: FACULTIES_LIST_GET_LIST_SEARCH,
  payload: keyword,
});

export const addFacultiesItem = (item) => ({
  type: FACULTIES_LIST_ADD_ITEM,
  payload: item,
});

export const addFacultiesItemSuccess = (items) => ({
  type: FACULTIES_LIST_ADD_ITEM_SUCCESS,
  payload: items,
});

export const addFacultiesItemError = (error) => ({
  type: FACULTIES_LIST_ADD_ITEM_ERROR,
  payload: error,
});

export const updateFacultiesItem = (item) => ({
  type: FACULTIES_LIST_UPDATE_ITEM,
  payload: item,
});

export const updateFacultiesItemSuccess = (item) => ({
  type: FACULTIES_LIST_UPDATE_ITEM_SUCCESS,
  payload: item,
});

export const updateFacultiesItemError = (error) => ({
  type: FACULTIES_LIST_UPDATE_ITEM_ERROR,
  payload: error,
});

export const selectedFacultiesItemsChange = (selectedItems) => ({
  type: FACULTIES_LIST_SELECTED_ITEMS_CHANGE,
  payload: selectedItems,
});
