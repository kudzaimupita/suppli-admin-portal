import {
  GET_PLUG_REVIEW_REQUEST,
  GET_PLUG_REVIEW_FAIL,
  GET_PLUG_REVIEW_SUCCESS,
  CREATE_PLUG_REVIEW_FAIL,
  CREATE_PLUG_REVIEW_SUCCESS,
  CREATE_PLUG_REVIEW_REQUEST,
  UPDATE_PLUG_REVIEW_REQUEST,
  UPDATE_PLUG_REVIEW_FAIL,
  UPDATE_PLUG_REVIEW_SUCCESS,
  DELETE_PLUG_REVIEW_FAIL,
  DELETE_PLUG_REVIEW_SUCCESS,
  DELETE_PLUG_REVIEW_REQUEST,
  GET_PLUG_REVIEWS_REQUEST,
  GET_PLUG_REVIEWS_FAIL,
  GET_PLUG_REVIEWS_SUCCESS,
  GET_ALL_PLUG_REVIEWS_FAIL,
  GET_ALL_PLUG_REVIEWS_REQUEST,
  GET_ALL_PLUG_REVIEWS_SUCCESS,
} from '../constants/plugReviewConstants';

export const updatePlugReviewReducer = (state = { plugReview: {} }, action) => {
  switch (action.type) {
    case UPDATE_PLUG_REVIEW_REQUEST:
      return { loading: true };
    case UPDATE_PLUG_REVIEW_SUCCESS:
      return { loading: false, success: true, plugReview: action.payload };
    case UPDATE_PLUG_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    // case PLUG_UPDATE_RESET:
    //   return { PLUG: {} };
    default:
      return state;
  }
};

export const deletePlugReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PLUG_REVIEW_REQUEST:
      return { loading: true };
    case DELETE_PLUG_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case DELETE_PLUG_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getPlugReviewReducer = (state = { plugReview: {} }, action) => {
  switch (action.type) {
    case GET_PLUG_REVIEW_REQUEST:
      return {
        loading: true,
      };
    case GET_PLUG_REVIEW_SUCCESS:
      return {
        loading: false,
        plugReview: action.payload,
      };
    case GET_PLUG_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getAllPlugReviewsReducer = (
  state = { plugReviews: [] },
  action
) => {
  switch (action.type) {
    case GET_ALL_PLUG_REVIEWS_REQUEST:
      return {
        loading: true,
      };
    case GET_ALL_PLUG_REVIEWS_SUCCESS:
      return {
        loading: false,
        plugReviews: action.payload,
      };
    case GET_ALL_PLUG_REVIEWS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const createPlugReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PLUG_REVIEW_REQUEST:
      return { loading: true };
    case CREATE_PLUG_REVIEW_SUCCESS:
      return { loading: false, success: true, plugReview: action.payload };
    case CREATE_PLUG_REVIEW_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const getPlugReviewsReducer = (
  state = { productReviews: [] },
  action
) => {
  switch (action.type) {
    case GET_PLUG_REVIEWS_REQUEST:
      return {
        loading: true,
      };
    case GET_PLUG_REVIEWS_SUCCESS:
      return {
        loading: false,
        plugReviews: action.payload,
      };
    case GET_PLUG_REVIEWS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
