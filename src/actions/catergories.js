import api from '../utils/api';
import { setAlert } from './alert';

import {
  UPDATE_CATERGORY_FAIL,
  UPDATE_CATERGORY_REQUEST,
  UPDATE_CATERGORY_SUCCESS,
  DELETE_CATERGORY_FAIL,
  DELETE_CATERGORY_REQUEST,
  DELETE_CATERGORY_SUCCESS,
  CREATE_CATERGORY_FAIL,
  CREATE_CATERGORY_REQUEST,
  CREATE_CATERGORY_SUCCESS,
  GET_CATERGORIES_FAIL,
  GET_CATERGORIES_SUCCESS,
  GET_CATERGORIES_REQUEST,
} from '../constants/catergoryConstants';

export const getCatergories = () => async (dispatch) => {
  dispatch({
    type: GET_CATERGORIES_REQUEST,
  });

  try {
    const res = await api.get('/catergories');

    dispatch({
      type: GET_CATERGORIES_SUCCESS,
      payload: res.data.data.doc,
    });
  } catch (err) {
    const errors = err.response.data.error;

    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'success')));
    }

    dispatch({
      type: GET_CATERGORIES_FAIL,
    });
  }
};

export const createCatergory = (formData) => async (dispatch) => {
  dispatch({
    type: CREATE_CATERGORY_REQUEST,
  });

  try {
    const res = await api.post('/catergories', formData);

    dispatch({
      type: CREATE_CATERGORY_SUCCESS,
      payload: res.data.data,
    });
    dispatch(setAlert('Catergory created', 'success'));
    dispatch(getCatergories());
  } catch (err) {
    const errors = err.response.data.error;

    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'danger')));
    }

    dispatch({
      type: CREATE_CATERGORY_FAIL,
    });
  }
};

export const updateCatergory = (formData, id) => async (dispatch) => {
  for (let [key, value] of formData) {
    console.log(`${key}: ${value}`);
  }
  dispatch({
    type: UPDATE_CATERGORY_REQUEST,
  });

  try {
    const res = await api.patch(`/catergories/${id}`, formData);

    dispatch({
      type: UPDATE_CATERGORY_SUCCESS,
      payload: res.data.data,
    });
    dispatch(setAlert('Catergory updated', 'success'));
    dispatch(getCatergories());
  } catch (err) {
    const errors = err.response.data.error;

    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'danger')));
    }

    dispatch({
      type: UPDATE_CATERGORY_FAIL,
    });
  }
};

export const deleteCatergory = (id) => async (dispatch) => {
  dispatch({
    type: DELETE_CATERGORY_REQUEST,
  });

  try {
    const res = await api.delete(`/catergories/${id}`);

    dispatch({
      type: DELETE_CATERGORY_SUCCESS,
      payload: res.data.data,
    });
    dispatch(setAlert('Catergory deleted', 'success'));
    dispatch(getCatergories());
  } catch (err) {
    const errors = err.response.data.error;

    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'danger')));
    }

    dispatch({
      type: DELETE_CATERGORY_FAIL,
    });
  }
};
