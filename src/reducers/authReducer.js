import {
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_FAIL,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  UPDATE_ME_FAIL,
  UPDATE_ME_REQUEST,
  UPDATE_ME_SUCCESS,
  UPDATE_MY_PASSWORD_FAIL,
  UPDATE_MY_PASSWORD_REQUEST,
  UPDATE_MY_PASSWORD_SUCCESS,
  GOOGLE_AUTH_SIGNIN_FAIL,
  GOOGLE_AUTH_SIGNIN_REQUEST,
  GOOGLE_AUTH_SIGNIN_SUCCESS,
  FACEBOOK_AUTH_SIGNIN_FAIL,
  FACEBOOK_AUTH_SIGNIN_REQUEST,
  FACEBOOK_AUTH_SIGNIN_SUCCESS,
  DELETE_ME_FAIL,
  DELETE_ME_REQUEST,
  DELETE_ME_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  GET_ALL_USERS_FAIL,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
} from '../constants/authConstants';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: false,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case RESET_PASSWORD_REQUEST:
    case FORGOT_PASSWORD_REQUEST:
    case UPDATE_MY_PASSWORD_REQUEST:
    case DELETE_ME_REQUEST:
    case RESET_PASSWORD_FAIL:
    case UPDATE_ME_REQUEST:
    case RESET_PASSWORD_REQUEST:
    case GOOGLE_AUTH_SIGNIN_REQUEST:
    case FACEBOOK_AUTH_SIGNIN_REQUEST:
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RESET_PASSWORD_SUCCESS:

    case UPDATE_ME_SUCCESS:
    case GOOGLE_AUTH_SIGNIN_SUCCESS:
    case FACEBOOK_AUTH_SIGNIN_SUCCESS:
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      console.log(payload.role);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        user: payload.user,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case RESET_PASSWORD_FAIL:
    case GOOGLE_AUTH_SIGNIN_FAIL:
    case FACEBOOK_AUTH_SIGNIN_FAIL:
    case DELETE_ME_FAIL:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case DELETE_ME_SUCCESS:
    case LOGOUT:
      // localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };

    case FORGOT_PASSWORD_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case FORGOT_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_ME_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload,
      };
    case UPDATE_ME_FAIL:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_MY_PASSWORD_FAIL:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_MY_PASSWORD_SUCCESS:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export const getAllUserssReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case GET_ALL_USERS_REQUEST:
      return {
        loading: true,
      };
    case GET_ALL_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };
    case GET_ALL_USERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updateUserReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case UPDATE_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
