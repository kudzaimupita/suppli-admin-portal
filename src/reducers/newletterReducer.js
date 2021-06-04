import {
  JOIN_MAILING_LIST_FAIL,
  JOIN_MAILING_LIST_REQUEST,
  JOIN_MAILING_LIST_SUCCESS,
} from '../constants/newsletterConstants';

export const createProductReducer = (state = {}, action) => {
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
