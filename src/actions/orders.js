import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_STATS_FAIL,
  GET_STATS_REQUEST,
  GET_STATS_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  GET_ORDER_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_MY_ORDERS_FAIL,
  GET_MY_ORDERS_REQUEST,
  GET_MY_ORDERS_SUCCESS,
  GET_ALL_ORDERS_FAIL,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_AGGREGATED_STATS_FAIL,
  GET_AGGREGATED_STATS_REQUEST,
  GET_AGGREGATED_STATS_SUCCESS,
  GET_DAILY_STATS_FAIL,
  GET_DAILY_STATS_REQUEST,
  GET_DAILY_STATS_SUCCESS,
  GET_WEEKLY_STATS_FAIL,
  GET_WEEKLY_STATS_REQUEST,
  GET_WEEKLY_STATS_SUCCESS,
  GET_PLUG_SALES_LIST_REQUEST,
  GET_PLUG_SALES_LIST_SUCCESS,
  GET_PLUG_SALES_LIST_FAIL,
} from '../constants/orderConstants';

// Register User

export const getStats = () => async (dispatch) => {
  dispatch({
    type: GET_STATS_REQUEST,
  });

  try {
    const res = await api.get(`/orders/stats`);

    dispatch({
      type: GET_STATS_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    const errors = err.response.data.error;

    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'success')));
    }

    dispatch({
      type: GET_STATS_FAIL,
    });
  }
};

export const getOrder = (id) => async (dispatch) => {
  dispatch({
    type: GET_ORDER_REQUEST,
  });

  try {
    const res = await api.get(`/orders/${id}`);

    dispatch({
      type: GET_ORDER_SUCCESS,
      payload: res.data.data,
    });
    console.log(res.data.data);
  } catch (err) {
    const errors = err.response.data.error;

    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'success')));
    }

    dispatch({
      type: GET_ORDER_FAIL,
    });
  }
};

export const getAllOrders = () => async (dispatch) => {
  dispatch({
    type: GET_ALL_ORDERS_REQUEST,
  });

  try {
    const res = await api.get('/orders/admin');

    dispatch({
      type: GET_ALL_ORDERS_SUCCESS,
      payload: res.data.data,
    });
    console.log(res.data.data);
  } catch (err) {
    const errors = err.response.data.error;

    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'success')));
    }

    dispatch({
      type: GET_ALL_ORDERS_FAIL,
    });
  }
};

export const getMyOrders = () => async (dispatch) => {
  dispatch({
    type: GET_MY_ORDERS_REQUEST,
  });

  try {
    const res = await api.get('/orders/myorders');

    dispatch({
      type: GET_MY_ORDERS_SUCCESS,
      payload: res.data.data,
    });
    console.log(res.data.data);
  } catch (err) {
    const errors = err.response.data.error;

    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'success')));
    }

    dispatch({
      type: GET_MY_ORDERS_FAIL,
    });
  }
};

export const updateOrder = (id, formData) => async (dispatch) => {
  dispatch({
    type: UPDATE_ORDER_REQUEST,
  });

  try {
    const res = await api.patch(`/orders/${id}`, formData);

    dispatch({
      type: UPDATE_ORDER_SUCCESS,
      payload: res.data.data,
    });
    dispatch({
      type: GET_ORDER_SUCCESS,
      payload: res.data.data,
    });
    dispatch(setAlert('Order updated', 'success'));
    dispatch(getOrder(id));
    dispatch(getAllOrders());
    console.log(res.data.data);
  } catch (err) {
    const errors = err.response.data.error;

    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'success')));
    }

    dispatch({
      type: UPDATE_ORDER_FAIL,
    });
  }
};

export const getDailyStats = () => async (dispatch) => {
  dispatch({
    type: GET_DAILY_STATS_REQUEST,
  });

  try {
    const res = await api.get(`/orders/admin/dailystats`);

    dispatch({
      type: GET_DAILY_STATS_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    const errors = err.response.data.error;

    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'success')));
    }

    dispatch({
      type: GET_DAILY_STATS_FAIL,
    });
  }
};

export const getWeeklyStats = () => async (dispatch) => {
  dispatch({
    type: GET_WEEKLY_STATS_REQUEST,
  });

  try {
    const res = await api.get(`/orders/admin/weeklystats`);

    dispatch({
      type: GET_WEEKLY_STATS_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    // const errors = err.response.data.error;

    // const errorArray = errors.split(',');

    // if (errorArray) {
    //   errorArray.map((error) => dispatch(setAlert(error, 'success')));
    // }

    dispatch({
      type: GET_WEEKLY_STATS_FAIL,
    });
  }
};

export const getAggregatedStats = () => async (dispatch) => {
  dispatch({
    type: GET_AGGREGATED_STATS_REQUEST,
  });

  try {
    const res = await api.get(`/orders/admin/aggregatedstats`);

    dispatch({
      type: GET_AGGREGATED_STATS_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    const errors = err.response.data.error;

    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'success')));
    }

    dispatch({
      type: GET_AGGREGATED_STATS_FAIL,
    });
  }
};

export const getPlugStats = (id) => async (dispatch) => {
  dispatch({
    type: GET_PLUG_SALES_LIST_REQUEST,
  });

  try {
    const res = await api.get(`/orders/sales`);
    console.log(res.data.data);
    dispatch({
      type: GET_PLUG_SALES_LIST_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    const errors = err.response.data.error;
    const errorArray = errors.split(',');
    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'success')));
    }
    dispatch({
      type: GET_PLUG_SALES_LIST_FAIL,
    });
  }
};
