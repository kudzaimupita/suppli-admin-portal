import {
  GET_PRODUCT_REVIEW_REQUEST,
  GET_PRODUCT_REVIEW_FAIL,
  GET_PRODUCT_REVIEW_SUCCESS,
  CREATE_PRODUCT_REVIEW_FAIL,
  CREATE_PRODUCT_REVIEW_SUCCESS,
  CREATE_PRODUCT_REVIEW_REQUEST,
  UPDATE_PRODUCT_REVIEW_REQUEST,
  UPDATE_PRODUCT_REVIEW_FAIL,
  UPDATE_PRODUCT_REVIEW_SUCCESS,
  DELETE_PRODUCT_REVIEW_FAIL,
  DELETE_PRODUCT_REVIEW_SUCCESS,
  DELETE_PRODUCT_REVIEW_REQUEST,
  GET_PRODUCT_REVIEWS_REQUEST,
  GET_PRODUCT_REVIEWS_FAIL,
  GET_PRODUCT_REVIEWS_SUCCESS,
  GET_ALL_PRODUCT_REVIEWS_REQUEST,
  GET_ALL_PRODUCT_REVIEWS_FAIL,
  GET_ALL_PRODUCT_REVIEWS_SUCCESS,
  
} from "../constants/productReviewConstants";

export const updateProductReviewReducer = (
  state = { productReview: {} },
  action
) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REVIEW_REQUEST:
      return { loading: true };
    case UPDATE_PRODUCT_REVIEW_SUCCESS:
      return { loading: false, success: true, productReview: action.payload };
    case UPDATE_PRODUCT_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    // case PRODUCT_UPDATE_RESET:
    //   return { product: {} };
    default:
      return state;
  }
};

export const deleteProductReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REVIEW_REQUEST:
      return { loading: true };
    case DELETE_PRODUCT_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case DELETE_PRODUCT_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getProductReviewReducer = (
  state = { productReview: {} },
  action
) => {
  switch (action.type) {
    case GET_PRODUCT_REVIEW_REQUEST:
      return {
        loading: true,
      };
    case GET_PRODUCT_REVIEW_SUCCESS:
      return {
        loading: false,
        productReview: action.payload,
      };
    case GET_PRODUCT_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};


export const getAllProductReviewsReducer = (
  state = { productReviews: [] },
  action
) => {
  switch (action.type) {
    case GET_ALL_PRODUCT_REVIEWS_REQUEST:
      return {
        loading: true,
      };
    case GET_ALL_PRODUCT_REVIEWS_SUCCESS:
      return {
        loading: false,
        productReviews: action.payload,
      };
    case GET_ALL_PRODUCT_REVIEWS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const createProductReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REVIEW_REQUEST:
      return { loading: true };
    case CREATE_PRODUCT_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        productReview: action.payload,
      };
    case CREATE_PRODUCT_REVIEW_FAIL:
      return { ...state, loading: false, error: action.payload };
    // case PRODUCT_CREATE_RESET:
    //   return {};
    default:
      return state;
  }
};

export const getProductReviewsReducer = (
  state = { productReviews: [] },
  action
) => {
  switch (action.type) {
    case GET_PRODUCT_REVIEWS_REQUEST:
      return {
        loading: true,
      };
    case GET_PRODUCT_REVIEWS_SUCCESS:
      return {
        loading: false,
        productReviews: action.payload,
      };
    case GET_PRODUCT_REVIEWS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
