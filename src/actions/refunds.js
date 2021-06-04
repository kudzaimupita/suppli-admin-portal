import api from '../utils/api';
import { setAlert } from './alert';

import {
  UPDATE_REFUND_FAIL,
  UPDATE_REFUND_REQUEST,
  UPDATE_REFUND_SUCCESS,
  GET_ALL_REFUNDS_FAIL,
  GET_ALL_REFUNDS_REQUEST,
  GET_ALL_REFUNDS_SUCCESS,
  GET_REFUND_FAIL,
  GET_REFUND_REQUEST,
  GET_REFUND_SUCCESS,
} from '../constants/refundConstants';

export const getAllRefunds = () => async (dispatch) => {
  dispatch({
    type: GET_ALL_REFUNDS_REQUEST,
  });

  try {
    const res = await api.get('/refunds');

    dispatch({
      type: GET_ALL_REFUNDS_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    const errors = err.response.data.error;

    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'success')));
    }

    dispatch({
      type: GET_ALL_REFUNDS_FAIL,
    });
  }
};

export const getRefund = (id) => async (dispatch) => {
  dispatch({
    type: GET_REFUND_REQUEST,
  });

  try {
    const res = await api.get(`/refunds/admin/${id}`);

    dispatch({
      type: GET_REFUND_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    const errors = err.response.data.error;

    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'success')));
    }

    dispatch({
      type: GET_REFUND_FAIL,
    });
  }
};

export const updateRefund = (id, formData) => async (dispatch) => {
  dispatch({
    type: UPDATE_REFUND_REQUEST,
  });

  try {
    const res = await api.patch(`/refunds/${id}`, formData);

    dispatch({
      type: UPDATE_REFUND_SUCCESS,
      payload: res.data.data,
    });
    dispatch(getRefund(id));
    dispatch(getAllRefunds());
  } catch (err) {
    const errors = err.response.data.error;

    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'success')));
    }

    dispatch({
      type: UPDATE_REFUND_FAIL,
    });
  }
};
