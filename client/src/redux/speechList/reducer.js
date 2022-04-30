/* eslint-disable no-underscore-dangle */
import {
  SPEECH_GET_LIST,
  SPEECH_GET_LIST_SUCCESS,
  SPEECH_GET_LIST_ERROR,
  SPEECH_ADD_ITEM,
  SPEECH_ADD_ITEM_SUCCESS,
  SPEECH_ADD_ITEM_ERROR,
  SPEECH_DELETE_ITEM_SUCCESS,
  SPEECH_DELETE_ITEM_ERROR,
} from '../contants';

const INIT_STATE = {
  allSpeechItems: null,
  SpeechItems: null,
  error: '',
  loading: false,
  selectedItems: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SPEECH_GET_LIST:
      return { ...state, loading: false };

    case SPEECH_GET_LIST_SUCCESS:
      return {
        ...state,
        loading: true,
        allSpeechItems: action.payload,
        SpeechItems: action.payload,
      };

    case SPEECH_DELETE_ITEM_SUCCESS:
      return {
        ...state,
        loading: true,
        allSpeechItems: state.allSpeechItems.filter(
          (news) => news._id !== action.payload
        ),
        SpeechItems: state.SpeechItems.filter(
          (news) => news._id !== action.payload
        ),
      };

    case SPEECH_GET_LIST_ERROR:
      return { ...state, loading: true, error: action.payload };

    case SPEECH_ADD_ITEM:
      return { ...state, loading: false };

    case SPEECH_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: true,
        allSpeechItems: [...state.allSpeechItems, action.payload],
        SpeechItems: [...state.SpeechItems, action.payload],
      };
    case SPEECH_DELETE_ITEM_ERROR:
    case SPEECH_ADD_ITEM_ERROR:
      return { ...state, loading: true, error: action.payload };

    default:
      return { ...state };
  }
};
