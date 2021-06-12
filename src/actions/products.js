import api from '../utils/api';
import { setAlert } from './alert';
import axios from 'axios';

import {
  ADD_TO_WISHLIST_FAIL,
  ADD_TO_WISHLIST_REQUEST,
  ADD_TO_WISHLIST_SUCCESS,
  REMOVE_FROM_WISHLIST_FAIL,
  REMOVE_FROM_WISHLIST_REQUEST,
  REMOVE_FROM_WISHLIST_SUCCESS,
} from '../constants/wishlistConstants';

import {
  PRODUCTS_FAIL,
  PRODUCTS_REQUEST,
  PRODUCTS_SUCCESS,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_FOR_USER_FEED_REQUEST,
  GET_PRODUCTS_FOR_USER_FEED_SUCCESS,
  GET_PRODUCTS_FOR_USER_FEED_FAIL,
  GET_SEARCHED_PRODUCTS_REQUEST,
  GET_SEARCHED_PRODUCTS_SUCCESS,
  GET_SEARCHED_PRODUCTS_FAIL,
  GET_RANDOM_PRODUCTS_BY_PLUG_REQUEST,
  GET_RANDOM_PRODUCTS_BY_PLUG_SUCCESS,
  GET_RANDOM_PRODUCTS_BY_PLUG_FAIL,
  GET_PRODUCTS_BY_PLUG_REQUEST,
  GET_PRODUCTS_BY_PLUG_SUCCESS,
  GET_PRODUCTS_BY_PLUG_FAIL,
  GET_PRODUCTS_BY_PLUG_FRONTPAGE_REQUEST,
  GET_PRODUCTS_BY_PLUG_FRONTPAGE_SUCCESS,
  GET_PRODUCTS_BY_PLUG_FRONTPAGE_FAIL,
  GET_POPULAR_PRODUCTS_REQUEST,
  GET_POPULAR_PRODUCTS_SUCCESS,
  GET_POPULAR_PRODUCTS_FAIL,
  GET_NEW_ARRIVALS_PRODUCTS_REQUEST,
  GET_NEW_ARRIVALS_PRODUCTS_SUCCESS,
  GET_NEW_ARRIVALS_PRODUCTS_FAIL,
  GET_FILTERED_PRODUCTS_REQUEST,
  GET_FILTERED_PRODUCTS_SUCCESS,
  GET_FILTERED_PRODUCTS_FAIL,
  GET_PRODUCTS_STATS_SUCCESS,
  GET_PRODUCTS_STATS_REQUEST,
  GET_PRODUCTS_STATS_FAIL,
} from '../constants/productConstants';

import { loadMyPlug, loadUser } from './auth';
// Register User
export const removeFromWishlist = (id) => async (dispatch) => {
  dispatch({
    type: REMOVE_FROM_WISHLIST_REQUEST,
  });

  try {
    const res = await api.put(`/products/removefromwishlist/${id}`);
    console.log(res.data.data);
    dispatch({
      type: REMOVE_FROM_WISHLIST_SUCCESS,
      payload: res.data.data,
    });
    dispatch(getProduct(id));
    dispatch(loadUser());
    dispatch(setAlert('Successfully removed from your wishlist', 'success'));
    console.log(res.data);
  } catch (err) {
    const errors = err.response.data.error;
    console.log(err.response.data.error);
    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'success')));
    }

    dispatch({
      type: REMOVE_FROM_WISHLIST_FAIL,
    });
  }
};

export const addToWishlist = (id) => async (dispatch) => {
  dispatch({
    type: ADD_TO_WISHLIST_REQUEST,
  });

  try {
    const res = await api.put(`/products/addtowishlist/${id}`);
    console.log(res.data.data);
    dispatch({
      type: ADD_TO_WISHLIST_SUCCESS,
      payload: res.data.data,
    });
    dispatch(getProduct(id));
    dispatch(loadUser());
    dispatch(setAlert('Successfully added to your wishlist', 'success'));
    console.log(res.data);
  } catch (err) {
    const errors = err.response.data.error;
    console.log(err.response.data.error);
    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'success')));
    }

    dispatch({
      type: ADD_TO_WISHLIST_FAIL,
    });
  }
};

export const getProductStats = () => async (dispatch) => {
  // dispatch({
  //   type: GET_PRODUCTS_STATS_REQUEST,
  // });

  try {
    console.log('hi');
  } catch (err) {
    const errors = err.response.data.error;

    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'success')));
    }

    dispatch({
      type: GET_PRODUCTS_STATS_FAIL,
    });
  }
};

export const getFilteredProducts = () => async (dispatch) => {
  dispatch({
    type: GET_FILTERED_PRODUCTS_REQUEST,
  });

  try {
    const res = await api.get('/products');

    dispatch({
      type: GET_FILTERED_PRODUCTS_SUCCESS,
      payload: res.data.data.doc,
    });
    console.log(res.data.data.doc);
  } catch (err) {
    const errors = err.response.data.error;

    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'success')));
    }

    dispatch({
      type: GET_FILTERED_PRODUCTS_FAIL,
    });
  }
};

export const getNewArrivals = () => async (dispatch) => {
  dispatch({
    type: GET_NEW_ARRIVALS_PRODUCTS_REQUEST,
  });

  try {
    const res = await api.get('/products');

    dispatch({
      type: GET_NEW_ARRIVALS_PRODUCTS_SUCCESS,
      payload: res.data.data.doc,
    });
  } catch (err) {
    const errors = err.response.data.error;

    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'success')));
    }

    dispatch({
      type: GET_NEW_ARRIVALS_PRODUCTS_FAIL,
    });
  }
};

export const getPopularProducts = () => async (dispatch) => {
  dispatch({
    type: GET_POPULAR_PRODUCTS_REQUEST,
  });

  try {
    const res = await api.get('/products/popular');

    dispatch({
      type: GET_POPULAR_PRODUCTS_SUCCESS,
      payload: res.data.data.doc,
    });
  } catch (err) {
    const errors = err.response.data.error;

    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'success')));
    }

    dispatch({
      type: GET_POPULAR_PRODUCTS_FAIL,
    });
  }
};

export const getProductsForFrontPage = () => async (dispatch) => {
  dispatch({
    type: GET_PRODUCTS_BY_PLUG_FRONTPAGE_REQUEST,
  });

  try {
    const res = await api.get('/products/frontpage');

    dispatch({
      type: GET_PRODUCTS_BY_PLUG_FRONTPAGE_SUCCESS,
      payload: res.data.data.doc,
    });
  } catch (err) {
    const errors = err.response.data.error;

    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'success')));
    }

    dispatch({
      type: GET_PRODUCTS_BY_PLUG_FRONTPAGE_FAIL,
    });
  }
};

export const getProductsByplug = () => async (dispatch) => {
  dispatch({
    type: GET_PRODUCTS_BY_PLUG_REQUEST,
  });

  try {
    const res = await api.get('/products');

    dispatch({
      type: GET_PRODUCTS_BY_PLUG_SUCCESS,
      payload: res.data.data.doc,
    });
    console.log(res.data.data.doc);
  } catch (err) {
    const errors = err.response.data.error;

    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'success')));
    }

    dispatch({
      type: GET_PRODUCTS_BY_PLUG_FAIL,
    });
  }
};

export const getRandomProductsByplug = () => async (dispatch) => {
  dispatch({
    type: GET_RANDOM_PRODUCTS_BY_PLUG_REQUEST,
  });

  try {
    const res = await api.get('/products');

    dispatch({
      type: GET_RANDOM_PRODUCTS_BY_PLUG_SUCCESS,
      payload: res.data.data.doc,
    });
    console.log(res.data.data.doc);
  } catch (err) {
    const errors = err.response.data.error;

    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'success')));
    }

    dispatch({
      type: GET_RANDOM_PRODUCTS_BY_PLUG_FAIL,
    });
  }
};

export const searchProducts = () => async (dispatch) => {
  dispatch({
    type: GET_SEARCHED_PRODUCTS_REQUEST,
  });

  try {
    const res = await api.get('/products');

    dispatch({
      type: GET_SEARCHED_PRODUCTS_SUCCESS,
      payload: res.data.data.doc,
    });
    console.log(res.data.data.doc);
  } catch (err) {
    const errors = err.response.data.error;

    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'success')));
    }

    dispatch({
      type: GET_SEARCHED_PRODUCTS_FAIL,
    });
  }
};

export const getUserFeedProducts = () => async (dispatch) => {
  dispatch({
    type: GET_PRODUCTS_FOR_USER_FEED_REQUEST,
  });

  try {
    const res = await api.get('/products/feed');

    dispatch({
      type: GET_PRODUCTS_FOR_USER_FEED_SUCCESS,
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
      type: GET_PRODUCTS_FOR_USER_FEED_FAIL,
    });
  }
};

export const createProduct = (formData, history) => async (dispatch) => {
  console.log(formData);
  dispatch({
    type: CREATE_PRODUCT_REQUEST,
  });

  const config = {
    headers: {
      // 'content-type':`multipart/form-data`,
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
  try {
    const res = await axios.post(
      'http://localhost:5000/api/v1/products',
      formData,
      config
    );

    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: res.data.data.doc,
    });
    dispatch(setAlert('Product added to catalogue', 'success'));
    dispatch(loadMyPlug());
    history.push('/admin/products');
    console.log(res.data.data.doc);
  } catch (err) {
    const errors = err.response.data.error;

    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'success')));
    }

    dispatch({
      type: CREATE_PRODUCT_FAIL,
    });
  }
};

export const updateProduct = (id, formData, history) => async (dispatch) => {
  console.log(id, formData);
  dispatch({
    type: UPDATE_PRODUCT_REQUEST,
  });

  try {
    const res = await api.patch(`/products/${id}`, formData);

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: res.data.data.doc,
    });
    dispatch(getProduct(id));
    dispatch(setAlert('Product successfully updated', 'success'));
    dispatch(loadMyPlug());
    // history && history.push('/admin/products')
    console.log(res.data.data.doc);
  } catch (err) {
    console.log(err);
    const errors = err.response.data.error;

    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'success')));
    }

    dispatch({
      type: UPDATE_PRODUCT_FAIL,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  dispatch({
    type: DELETE_PRODUCT_REQUEST,
  });

  try {
    const res = await api.delete(`/products/${id}`);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
    });
    dispatch(setAlert('Product succesfully deleted from catalogue', 'success'));
    dispatch(loadMyPlug());
    console.log(res.data);
  } catch (err) {
    const errors = err.response.data.error;

    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'success')));
    }

    dispatch({
      type: DELETE_PRODUCT_FAIL,
    });
  }
};

export const getProduct = (id, plugId) => async (dispatch) => {
  console.log(id);
  dispatch({
    type: GET_PRODUCT_REQUEST,
  });

  try {
    const res = await api.get(`/products/${id}`);

    dispatch({
      type: GET_PRODUCT_SUCCESS,
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
      type: GET_PRODUCT_FAIL,
    });
  }
};

export const getAllProducts = () => async (dispatch) => {
  dispatch({
    type: GET_PRODUCTS_REQUEST,
  });

  try {
    const res = await api.get('/products');

    dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload: res.data.data.doc,
    });
    console.log(res.data.data.doc);
  } catch (err) {
    const errors = err.response.data.error;

    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'success')));
    }

    dispatch({
      type: GET_PRODUCTS_FAIL,
    });
  }
};

///
export const getProducts = () => async (dispatch) => {
  dispatch({
    type: PRODUCTS_REQUEST,
  });

  try {
    const res = await api.get('/products');

    dispatch({
      type: PRODUCTS_SUCCESS,
      payload: res.data.data.doc,
    });
  } catch (err) {
    const errors = err.response.data.error;

    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'success')));
    }

    dispatch({
      type: PRODUCTS_FAIL,
    });
  }
};
