import {
  JOIN_MAILING_LIST_FAIL,
  JOIN_MAILING_LIST_REQUEST,
  JOIN_MAILING_LIST_SUCCESS,
  GET_MAILING_LIST_FAIL,
  GET_MAILING_LIST_REQUEST,
  GET_MAILING_LIST_SUCCESS,
} from '../constants/newsletterConstants';

export const joinMaillistReducer = (state = {}, action) => {
  switch (action.type) {
    case JOIN_MAILING_LIST_REQUEST:
      return { loading: true };
    case JOIN_MAILING_LIST_SUCCESS:
      return { loading: false, success: true };
    case JOIN_MAILING_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const getMaillistReducer = (state = { emais: [] }, action) => {
  switch (action.type) {
    case GET_MAILING_LIST_REQUEST:
      return {
        loading: true,
      };
    case GET_MAILING_LIST_SUCCESS:
      return {
        loading: false,
        emails: action.payload,
      };
    case GET_MAILING_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
