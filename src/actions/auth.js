import api from '../utils/api';
import axios from 'axios';
import { store } from './../store';
import { setAlert } from './alert';
import { getUserFeedProducts } from './products';
import { getMyOrders } from './orders';
import {
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  REGISTER_REQUEST,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  UPDATE_ME_REQUEST,
  UPDATE_ME_FAIL,
  UPDATE_ME_SUCCESS,
  UPDATE_MY_PASSWORD_FAIL,
  UPDATE_MY_PASSWORD_REQUEST,
  UPDATE_MY_PASSWORD_SUCCESS,
  GET_ALL_USERS_FAIL,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
} from '../constants/authConstants';

import {
  GET_MY_PLUG_REQUEST,
  GET_MY_PLUG_SUCCESS,
  GET_MY_PLUG_FAIL,
} from '../constants/plugConstants';

export const updateMe = (formData) => async (dispatch) => {
  dispatch({
    type: UPDATE_ME_REQUEST,
  });

  try {
    const res = await api.patch(`/users/updateme`, formData);

    dispatch({
      type: UPDATE_ME_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);

    const errors = err.response.data.error;

    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'success')));
    }

    dispatch({
      type: UPDATE_ME_FAIL,
    });
  }
};
export const updateMyPassword = (formData) => async (dispatch) => {
  dispatch({
    type: UPDATE_MY_PASSWORD_REQUEST,
  });

  try {
    const res = await api.patch(`/users/updatemypassword`, formData);

    dispatch({
      type: UPDATE_MY_PASSWORD_SUCCESS,
      payload: res.data,
    });

    dispatch(logout());
  } catch (err) {
    console.log(err);

    const errors = err.response.data.error;

    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'success')));
    }

    dispatch({
      type: UPDATE_MY_PASSWORD_FAIL,
    });
  }
};

export const updateUser = (id, formData) => async (dispatch) => {
  dispatch({
    type: UPDATE_USER_REQUEST,
  });

  try {
    const res = await api.patch(`/users/${id}`, formData);

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: res.data,
    });
    dispatch(getAllUsers());
    // dispatch(logout());
  } catch (err) {
    console.log(err);

    const errors = err.response.data.error;

    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'success')));
    }

    dispatch({
      type: UPDATE_USER_FAIL,
    });
  }
};

export const facebook = () => (dispatch) => {
  console.log('win');
  dispatch({
    type: REGISTER_REQUEST,
  });

  try {
    const res = axios.get('http://localhost:5000/api/v1/users/facebook');
    console.log(res.data);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
    dispatch(loadMyPlug());
    dispatch(setAlert('Welcome!', 'success'));
  } catch (err) {
    console.log(err);

    const errors = err.response.data.error;

    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'success')));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
// Register User
export const register = (formData) => async (dispatch) => {
  dispatch({
    type: REGISTER_REQUEST,
  });

  try {
    const res = await api.post('/users/signup', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
    dispatch(loadMyPlug());
    dispatch(setAlert('Welcome!', 'success'));
  } catch (err) {
    console.log(err);

    const errors = err.response.data.error;

    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'success')));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const login = (formData) => async (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST,
  });

  try {
    const res = await api.post('/users/login', formData);
    // if (res.data.role) return setAlert('Not authorized', 'danger');

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    // console.log(;
    // if (res.data.role) return setAlert('Not authorized', 'danger');÷

    dispatch(loadUser());

    // dispatch(setAlert('Welcome!', 'success'));
  } catch (err) {
    // console.log(err);
    let errors;
    if (err.response.data.error) errors = err.response.data.error;
    let errorArray;

    if (errors) errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  dispatch({
    type: REGISTER_REQUEST,
  });

  try {
    const res = await api.get('/users/me');

    dispatch({
      type: USER_LOADED,
      payload: res.data.data.doc,
    });
    dispatch(getMyOrders());
    dispatch(getUserFeedProducts());
  } catch (err) {
    console.log(err);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const loadMyPlug = () => async (dispatch) => {
  dispatch({
    type: GET_MY_PLUG_REQUEST,
  });

  try {
    const res = await api.get('/plugs/myplug');

    dispatch({
      type: GET_MY_PLUG_SUCCESS,
      payload: res.data.data.plug,
    });
    console.log(res.data.data.plug);
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_MY_PLUG_FAIL,
    });
  }
};

export const getAllUsers = () => async (dispatch) => {
  dispatch({
    type: GET_ALL_USERS_REQUEST,
  });

  try {
    const res = await api.get('/users');

    dispatch({
      type: GET_ALL_USERS_SUCCESS,
      payload: res.data.data,
    });
    console.log(res.data.data);
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_ALL_USERS_FAIL,
    });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  localStorage.removeItem('token');
  // dispatch({ type: GET_MY_PLUG_FAIL });
  // dispatch({ type: GET_UNBALANCED_SALES_FAIL });
};
