import {
  GET_ALL_REFUNDS_FAIL,
  GET_ALL_REFUNDS_REQUEST,
  GET_ALL_REFUNDS_SUCCESS,
  CREATE_REFUND_FAIL,
  CREATE_REFUND_SUCCESS,
  CREATE_REFUND_REQUEST,
  GET_REFUNDS_FAIL,
  GET_REFUNDS_REQUEST,
  GET_REFUNDS_SUCCESS,
  GET_REFUND_FAIL,
  GET_REFUND_SUCCESS,
  GET_REFUND_REQUEST,
  UPDATE_REFUND_FAIL,
  UPDATE_REFUND_REQUEST,
  UPDATE_REFUND_SUCCESS,
} from '../constants/refundConstants';

export const updateRefundReducer = (state = { refund: {} }, action) => {
  switch (action.type) {
    case UPDATE_REFUND_REQUEST:
      return { loading: true };
    case UPDATE_REFUND_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        refund: action.payload,
      };
    case UPDATE_REFUND_FAIL:
      return { loading: false, error: action.payload };
    // case PRODUCT_UPDATE_RESET:
    //   return { product: {} };
    default:
      return state;
  }
};

export const getRefundReducer = (state = { refund: {} }, action) => {
  switch (action.type) {
    case GET_REFUND_REQUEST:
      return {
        loading: true,
      };
    case GET_REFUND_SUCCESS:
      return { ...state, loading: false, refund: action.payload };
    case GET_REFUND_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getAllRefundsReducer = (state = { refunds: [] }, action) => {
  switch (action.type) {
    case GET_ALL_REFUNDS_REQUEST:
      return {
        loading: true,
      };
    case GET_ALL_REFUNDS_SUCCESS:
      return { ...state, loading: false, refunds: action.payload };
    case GET_ALL_REFUNDS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const createRefundReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_REFUND_REQUEST:
      return { loading: true };
    case CREATE_REFUND_SUCCESS:
      return { loading: false, success: true, refund: action.payload };
    case CREATE_REFUND_FAIL:
      return { loading: false, error: action.payload };
    // case PRODUCT_CREATE_RESET:
    //   return {};
    default:
      return state;
  }
};

export const getMyRefundsReducer = (state = { refunds: [] }, action) => {
  switch (action.type) {
    case GET_REFUNDS_REQUEST:
      return {
        loading: true,
      };
    case GET_REFUNDS_SUCCESS:
      return {
        loading: false,
        refunds: action.payload,
      };
    case GET_REFUNDS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
