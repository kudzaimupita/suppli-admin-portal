import api from '../utils/api';
import { setAlert } from './alert';

import {
  GET_SUBCATERGORIES_FAIL,
  GET_SUBCATERGORIES_SUCCESS,
  GET_SUBCATERGORIES_REQUEST,
  CREATE_SUBCATERGORY_FAIL,
  CREATE_SUBCATERGORY_REQUEST,
  CREATE_SUBCATERGORY_SUCCESS,
  DELETE_SUBCATERGORY_FAIL,
  DELETE_SUBCATERGORY_REQUEST,
  DELETE_SUBCATERGORY_SUCCESS,
  UPDATE_SUBCATERGORY_FAIL,
  UPDATE_SUBCATERGORY_REQUEST,
  UPDATE_SUBCATERGORY_SUCCESS,
} from '../constants/subCatergoryConstants';

export const getSubCategories = () => async (dispatch) => {
  dispatch({
    type: GET_SUBCATERGORIES_REQUEST,
  });

  try {
    const res = await api.get('/subcatergories');

    dispatch({
      type: GET_SUBCATERGORIES_SUCCESS,
      payload: res.data.data.doc,
    });
  } catch (err) {
    const errors = err.response.data.error;

    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'success')));
    }

    dispatch({
      type: GET_SUBCATERGORIES_FAIL,
    });
  }
};

export const deleteSubCatergory = (id, e) => async (dispatch) => {
  e.preventDefault();
  dispatch({
    type: DELETE_SUBCATERGORY_REQUEST,
  });

  try {
    const res = await api.delete(`/subcatergories/${id}`);

    dispatch({
      type: DELETE_SUBCATERGORY_SUCCESS,
      payload: res.data.data,
    });
    dispatch(setAlert('Sub-catergory deleted', 'success'));
    dispatch(getSubCategories());
  } catch (err) {
    const errors = err.response.data.error;

    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'danger')));
    }

    dispatch({
      type: DELETE_SUBCATERGORY_FAIL,
    });
  }
};

export const updateSubCatergory = (id, formData) => async (dispatch) => {
  dispatch({
    type: UPDATE_SUBCATERGORY_REQUEST,
  });

  try {
    const res = await api.patch(`/subcatergories/${id}`, formData);

    dispatch({
      type: UPDATE_SUBCATERGORY_SUCCESS,
      payload: res.data.data,
    });
    dispatch(setAlert('Sub-catergory updated', 'success'));
    dispatch(getSubCategories());
  } catch (err) {
    const errors = err.response.data.error;

    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'danger')));
    }

    dispatch({
      type: UPDATE_SUBCATERGORY_FAIL,
    });
  }
};

export const createSubCatergory = (formData) => async (dispatch) => {
  dispatch({
    type: CREATE_SUBCATERGORY_REQUEST,
  });

  try {
    const res = await api.post('/subcatergories', formData);

    dispatch({
      type: CREATE_SUBCATERGORY_SUCCESS,
      payload: res.data.data,
    });
    dispatch(setAlert('Sub-catergory created', 'success'));
    dispatch(getSubCategories());
  } catch (err) {
    const errors = err.response.data.error;

    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'danger')));
    }

    dispatch({
      type: CREATE_SUBCATERGORY_FAIL,
    });
  }
};
