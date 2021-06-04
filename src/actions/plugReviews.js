import api from '../utils/api';
import { setAlert } from './alert';

import {
  GET_ALL_PLUG_REVIEWS_FAIL,
  GET_ALL_PLUG_REVIEWS_REQUEST,
  GET_ALL_PLUG_REVIEWS_SUCCESS,
} from '../constants/plugReviewConstants';

// Register User

export const getAllPlugReviews = () => async (dispatch) => {
  dispatch({
    type: GET_ALL_PLUG_REVIEWS_REQUEST,
  });

  try {
    const res = await api.get('/plugreviews');

    dispatch({
      type: GET_ALL_PLUG_REVIEWS_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    const errors = err.response.data.error;

    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'success')));
    }

    dispatch({
      type: GET_ALL_PLUG_REVIEWS_FAIL,
    });
  }
};
