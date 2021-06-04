import {
  CREATE_SUBCATERGORY_FAIL,
  CREATE_SUBCATERGORY_REQUEST,
  CREATE_SUBCATERGORY_SUCCESS,
  GET_SUBCATERGORIES_FAIL,
  GET_SUBCATERGORIES_REQUEST,
  GET_SUBCATERGORIES_SUCCESS,
  GET_SUBCATERGORY_FAIL,
  GET_SUBCATERGORY_REQUEST,
  GET_SUBCATERGORY_SUCCESS,
  UPDATE_SUBCATERGORY_FAIL,
  UPDATE_SUBCATERGORY_REQUEST,
  UPDATE_SUBCATERGORY_SUCCESS,
  DELETE_SUBCATERGORY_FAIL,
  DELETE_SUBCATERGORY_REQUEST,
  DELETE_SUBCATERGORY_SUCCESS,
} from "../constants/subCatergoryConstants";

export const updateSubCatergoryReducer = (
  state = { subCatergory: {} },
  action
) => {
  switch (action.type) {
    case UPDATE_SUBCATERGORY_REQUEST:
      return { loading: true };
    case UPDATE_SUBCATERGORY_SUCCESS:
      return { loading: false, success: true, subCatergory: action.payload };
    case UPDATE_SUBCATERGORY_FAIL:
      return { loading: false, error: action.payload };
    // case PRODUCT_UPDATE_RESET:
    //   return { product: {} };
    default:
      return state;
  }
};

export const deleteSubCatergoryReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_SUBCATERGORY_REQUEST:
      return { loading: true };
    case DELETE_SUBCATERGORY_SUCCESS:
      return { loading: false, success: true };
    case DELETE_SUBCATERGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSubCatergoryReducer = (
  state = { subCatergory: {} },
  action
) => {
  switch (action.type) {
    case GET_SUBCATERGORY_REQUEST:
      return {
        loading: true,
      };
    case GET_SUBCATERGORY_SUCCESS:
      return {
        loading: false,
        subCatergory: action.payload,
      };
    case GET_SUBCATERGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const createSubCatergoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SUBCATERGORY_REQUEST:
      return { loading: true };
    case CREATE_SUBCATERGORY_SUCCESS:
      return { loading: false, success: true, subCatergory: action.payload };
    case CREATE_SUBCATERGORY_FAIL:
      return { loading: false, error: action.payload };
    // case PRODUCT_CREATE_RESET:
    //   return {};
    default:
      return state;
  }
};

export const getSubCatergoriesReducer = (
  state = { subCatergories: [] },
  action
) => {
  switch (action.type) {
    case GET_SUBCATERGORIES_REQUEST:
      return {
        loading: true,
      };
    case GET_SUBCATERGORIES_SUCCESS:
      return {
        loading: false,
        subCatergories: action.payload,
      };
    case GET_SUBCATERGORIES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
