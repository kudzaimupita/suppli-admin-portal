import {
  SEND_MESSAGE_FAIL,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_REQUEST,
} from '../constants/contactFormConstants';

export const sendMessageReducer = (state = {}, action) => {
  switch (action.type) {
    case SEND_MESSAGE_REQUEST:
      return { loading: true };
    case SEND_MESSAGE_SUCCESS:
      return { loading: false, success: true };
    case SEND_MESSAGE_FAIL:
      return { loading: false, error: action.payload };
    // case PRODUCT_CREATE_RESET:
    //   return {};
    default:
      return state;
  }
};
