// eslint-disable-next-line import/no-cycle
import {
  SPEECH_GET_LIST,
  SPEECH_GET_LIST_SUCCESS,
  SPEECH_GET_LIST_ERROR,
  SPEECH_ADD_ITEM,
  SPEECH_ADD_ITEM_SUCCESS,
  SPEECH_ADD_ITEM_ERROR,
  SPEECH_DELETE_ITEM,
  SPEECH_DELETE_ITEM_SUCCESS,
  SPEECH_DELETE_ITEM_ERROR,
} from '../contants';

export const getSpeechList = (tracking) => ({
  type: SPEECH_GET_LIST,
  payload: tracking,
});

export const getSpeechListSuccess = (items) => ({
  type: SPEECH_GET_LIST_SUCCESS,
  payload: items,
});

export const getSpeechListError = (error) => ({
  type: SPEECH_GET_LIST_ERROR,
  payload: error,
});

export const addSpeechItem = (item) => ({
  type: SPEECH_ADD_ITEM,
  payload: item,
});

export const addSpeechItemSuccess = (items) => ({
  type: SPEECH_ADD_ITEM_SUCCESS,
  payload: items,
});

export const addSpeechItemError = (error) => ({
  type: SPEECH_ADD_ITEM_ERROR,
  payload: error,
});

export const deleteSpeechItem = (id) => ({
  type: SPEECH_DELETE_ITEM,
  payload: id,
});

export const deleteSpeechItemSuccess = (id) => ({
  type: SPEECH_DELETE_ITEM_SUCCESS,
  payload: id,
});

export const deleteSpeechItemError = (error) => ({
  type: SPEECH_DELETE_ITEM_ERROR,
  payload: error,
});
