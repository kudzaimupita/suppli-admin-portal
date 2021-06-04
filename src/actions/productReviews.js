import api from '../utils/api';
import { setAlert } from './alert';

import {
  CREATE_PRODUCT_REVIEW_REQUEST,
  CREATE_PRODUCT_REVIEW_SUCCESS,
  CREATE_PRODUCT_REVIEW_FAIL,
  GET_ALL_PRODUCT_REVIEWS_FAIL,
  GET_ALL_PRODUCT_REVIEWS_REQUEST,
  GET_ALL_PRODUCT_REVIEWS_SUCCESS,
} from '../constants/productReviewConstants';

export const createProductReview = (formData, id) => async (dispatch) => {
  dispatch({
    type: CREATE_PRODUCT_REVIEW_REQUEST,
  });

  try {
    const res = await api.post(`/products/${id}/reviews`, formData);

    dispatch({
      type: CREATE_PRODUCT_REVIEW_SUCCESS,
      payload: res.data.data,
    });

    dispatch(setAlert('Successfully rated this product', 'success'));
    console.log(res.data.data);
  } catch (err) {
    const errors = err.response.data.error;

    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'danger')));
    }

    dispatch({
      type: CREATE_PRODUCT_REVIEW_FAIL,
    });
  }
};

export const getAllProductReviews = () => async (dispatch) => {
  dispatch({
    type: GET_ALL_PRODUCT_REVIEWS_REQUEST,
  });

  try {
    const res = await api.get('/reviews');

    dispatch({
      type: GET_ALL_PRODUCT_REVIEWS_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    const errors = err.response.data.error;

    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'success')));
    }

    dispatch({
      type: GET_ALL_PRODUCT_REVIEWS_FAIL,
    });
  }
};
