import {
  CREATE_CATERGORY_FAIL,
  CREATE_CATERGORY_REQUEST,
  CREATE_CATERGORY_SUCCESS,
  GET_CATERGORIES_FAIL,
  GET_CATERGORIES_REQUEST,
  GET_CATERGORIES_SUCCESS,
  GET_CATERGORY_FAIL,
  GET_CATERGORY_REQUEST,
  GET_CATERGORY_SUCCESS,
  UPDATE_CATERGORY_FAIL,
  UPDATE_CATERGORY_REQUEST,
  UPDATE_CATERGORY_SUCCESS,
  DELETE_CATERGORY_FAIL,
  DELETE_CATERGORY_REQUEST,
  DELETE_CATERGORY_SUCCESS,
} from '../constants/catergoryConstants';

export const updateCatergoryReducer = (state = { catergory: {} }, action) => {
  switch (action.type) {
    case UPDATE_CATERGORY_REQUEST:
      return { loading: true };
    case UPDATE_CATERGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        catergory: action.payload,
      };
    case UPDATE_CATERGORY_FAIL:
      return { loading: false, error: action.payload };
    // case PRODUCT_UPDATE_RESET:
    //   return { product: {} };
    default:
      return state;
  }
};

export const deleteCatergoryReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CATERGORY_REQUEST:
      return { loading: true };
    case DELETE_CATERGORY_SUCCESS:
      return { ...state, loading: false, success: true };
    case DELETE_CATERGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getCatergoryReducer = (state = { catergory: {} }, action) => {
  switch (action.type) {
    case GET_CATERGORY_REQUEST:
      return {
        loading: true,
      };
    case GET_CATERGORY_SUCCESS:
      return { ...state, loading: false, catergory: action.payload };
    case GET_CATERGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const createCatergoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CATERGORY_REQUEST:
      return { loading: true };
    case CREATE_CATERGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        catergory: action.payload,
      };
    case CREATE_CATERGORY_FAIL:
      return { loading: false, error: action.payload };
    // case PRODUCT_CREATE_RESET:
    //   return {};
    default:
      return state;
  }
};

export const getCatergoriesReducer = (state = { catergories: [] }, action) => {
  switch (action.type) {
    case GET_CATERGORIES_REQUEST:
      return {
        loading: true,
      };
    case GET_CATERGORIES_SUCCESS:
      return { ...state, loading: false, catergories: action.payload };
    case GET_CATERGORIES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
