import {
  APPROVE_PLUG_FAIL,
  APPROVE_PLUG_REQUEST,
  APPROVE_PLUG_SUCCESS,
  GET_ALL_PLUGS_FAIL,
  GET_ALL_PLUGS_REQUEST,
  GET_ALL_PLUGS_SUCCESS,
  DELETE_PLUG_REQUEST,
  DELETE_PLUG_SUCCESS,
  DELETE_PLUG_FAIL,
  CREATE_PLUG_REQUEST,
  CREATE_PLUG_SUCCESS,
  CREATE_PLUG_FAIL,
  UPDATE_PLUG_REQUEST,
  UPDATE_PLUG_SUCCESS,
  UPDATE_PLUG_FAIL,
  GET_MY_PLUG_REQUEST,
  GET_MY_PLUG_SUCCESS,
  GET_MY_PLUG_FAIL,
  GET_PLUGS_BY_CATERGORY_REQUEST,
  GET_PLUGS_BY_CATERGORY_SUCCESS,
  GET_PLUGS_BY_CATERGORY_FAIL,
  GET_PLUGS_REQUEST,
  GET_PLUGS_SUCCESS,
  GET_PLUGS_FAIL,
  GET_PLUG_REQUEST,
  GET_PLUG_SUCCESS,
  GET_PLUG_FAIL,
  UNFOLLOW_PLUG_REQUEST,
  UNFOLLOW_PLUG_SUCCESS,
  UNFOLLOW_PLUG_FAIL,
  FOLLOW_PLUG_REQUEST,
  FOLLOW_PLUG_SUCCESS,
  FOLLOW_PLUG_FAIL,
} from '../constants/plugConstants';

export const createPlugReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PLUG_REQUEST:
      return { loading: true };
    case CREATE_PLUG_SUCCESS:
      return { ...state, loading: false, success: true, plug: action.payload };
    case CREATE_PLUG_FAIL:
      return { loading: false, error: action.payload };
    // case PRODUCT_CREATE_RESET:
    //   return {};
    default:
      return state;
  }
};

export const approvePlugReducer = (state = { plug: {} }, action) => {
  switch (action.type) {
    case APPROVE_PLUG_REQUEST:
      return { loading: true };
    case APPROVE_PLUG_SUCCESS:
      return { ...state, loading: false, success: true, plug: action.payload };
    case APPROVE_PLUG_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updatePlugReducer = (state = { plug: {} }, action) => {
  switch (action.type) {
    case UPDATE_PLUG_REQUEST:
      return { loading: true };
    case UPDATE_PLUG_SUCCESS:
      return { ...state, loading: false, success: true, plug: action.payload };
    case UPDATE_PLUG_FAIL:
      return { loading: false, error: action.payload };
    // case PRODUCT_UPDATE_RESET:
    //   return { product: {} };
    default:
      return state;
  }
};

export const getMyPlugReducer = (state = { plug: {} }, action) => {
  switch (action.type) {
    case GET_MY_PLUG_REQUEST:
      return {
        loading: true,
      };
    case GET_MY_PLUG_SUCCESS:
      return { ...state, loading: false, plug: action.payload };
    case GET_MY_PLUG_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getPlugsByCatergoryReducer = (state = { plugs: [] }, action) => {
  switch (action.type) {
    case GET_PLUGS_BY_CATERGORY_REQUEST:
      return {
        loading: true,
      };
    case GET_PLUGS_BY_CATERGORY_SUCCESS:
      return { ...state, loading: false, plugs: action.payload };
    case GET_PLUGS_BY_CATERGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getAllPlugsReducer = (state = { plugs: [] }, action) => {
  switch (action.type) {
    case GET_ALL_PLUGS_REQUEST:
      return {
        loading: true,
      };
    case GET_ALL_PLUGS_SUCCESS:
      return { ...state, loading: false, plugs: action.payload };
    case GET_ALL_PLUGS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getPlugsReducer = (state = { plugs: [] }, action) => {
  switch (action.type) {
    case GET_PLUGS_REQUEST:
      return {
        loading: true,
      };
    case GET_PLUGS_SUCCESS:
      return { ...state, loading: false, plugs: action.payload };
    case GET_PLUGS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getPlugReducer = (state = { plug: {} }, action) => {
  switch (action.type) {
    case GET_PLUG_REQUEST:
      return {
        loading: true,
      };
    case GET_PLUG_SUCCESS:
      return { ...state, loading: false, plug: action.payload };
    case GET_PLUG_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deletePlugReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PLUG_REQUEST:
      return { loading: true };
    case DELETE_PLUG_SUCCESS:
      return { loading: false, success: true };
    case DELETE_PLUG_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const followPlugReducer = (state = {}, action) => {
  switch (action.type) {
    case FOLLOW_PLUG_REQUEST:
      return { loading: true };
    case FOLLOW_PLUG_SUCCESS:
      return { ...state, loading: false, success: true };
    case FOLLOW_PLUG_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const unfollowPlugReducer = (state = {}, action) => {
  switch (action.type) {
    case UNFOLLOW_PLUG_REQUEST:
      return { loading: true };
    case UNFOLLOW_PLUG_SUCCESS:
      return { ...state, loading: false, success: true };
    case UNFOLLOW_PLUG_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
