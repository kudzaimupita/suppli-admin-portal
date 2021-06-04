import api from '../utils/api';
import { setAlert } from './alert';

import {
  GET_MAILING_LIST_FAIL,
  GET_MAILING_LIST_REQUEST,
  GET_MAILING_LIST_SUCCESS,
} from '../constants/newsletterConstants';

export const getMaillist = () => async (dispatch) => {
  dispatch({
    type: GET_MAILING_LIST_REQUEST,
  });

  try {
    const res = await api.get('/newsletter');

    dispatch({
      type: GET_MAILING_LIST_SUCCESS,
      payload: res.data.data.doc,
    });
  } catch (err) {
    const errors = err.response.data.error;

    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'success')));
    }

    dispatch({
      type: GET_MAILING_LIST_FAIL,
    });
  }
};
