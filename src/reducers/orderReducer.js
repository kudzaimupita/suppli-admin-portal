import {
  GET_AGGREGATED_STATS_FAIL,
  GET_AGGREGATED_STATS_REQUEST,
  GET_AGGREGATED_STATS_SUCCESS,
  GET_DAILY_STATS_FAIL,
  GET_DAILY_STATS_REQUEST,
  GET_DAILY_STATS_SUCCESS,
  GET_WEEKLY_STATS_FAIL,
  GET_WEEKLY_STATS_REQUEST,
  GET_WEEKLY_STATS_SUCCESS,
  GET_STATS_FAIL,
  GET_STATS_REQUEST,
  GET_STATS_SUCCESS,
  GET_ALL_ORDERS_FAIL,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_REQUEST,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_REQUEST,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_REQUEST,
  GET_MY_ORDERS_FAIL,
  GET_MY_ORDERS_REQUEST,
  GET_MY_ORDERS_SUCCESS,
  GET_ORDERS_LIST_FAIL,
  GET_ORDERS_LIST_REQUEST,
  GET_ORDERS_LIST_SUCCESS,
  GET_ORDER_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_PLUG_SALES_LIST_FAIL,
  GET_PLUG_SALES_LIST_REQUEST,
  GET_PLUG_SALES_LIST_SUCCESS,
  GET_UNBALANCED_SALES_FAIL,
  GET_UNBALANCED_SALES_REQUEST,
  GET_UNBALANCED_SALES_SUCCESS,
  GET_PLUG_WEEKLY_STATS_FAIL,
  GET_PLUG_WEEKLY_STATS_REQUEST,
  GET_PLUG_WEEKLY_STATS_SUCCESS,
  GET_PLUG_DAILY_STATS_FAIL,
  GET_PLUG_DAILY_STATS_REQUEST,
  GET_PLUG_DAILY_STATS_SUCCESS,
} from '../constants/orderConstants';

export const createOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { loading: true };
    case CREATE_ORDER_SUCCESS:
      return { ...state, loading: false, success: true, order: action.payload };
    case CREATE_ORDER_FAIL:
      return { loading: false, error: action.payload };
    // case PRODUCT_CREATE_RESET:
    //   return {};
    default:
      return state;
  }
};

export const getMyOrdersReducer = (state = { orders: {} }, action) => {
  console.log(action.payload);
  switch (action.type) {
    case GET_MY_ORDERS_REQUEST:
      return {
        loading: true,
      };
    case GET_MY_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,

        orders: action.payload,
      };
    case GET_MY_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deleteOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ORDER_REQUEST:
      return { loading: true };
    case DELETE_ORDER_SUCCESS:
      return { loading: false, success: true };
    case DELETE_ORDER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateOrderReducer = (state = { plug: {} }, action) => {
  switch (action.type) {
    case UPDATE_ORDER_REQUEST:
      return { loading: true };
    case UPDATE_ORDER_SUCCESS:
      return { ...state, loading: false, success: true, order: action.payload };
    case UPDATE_ORDER_FAIL:
      return { loading: false, error: action.payload };
    // case PRODUCT_UPDATE_RESET:
    //   return { product: {} };
    default:
      return state;
  }
};

export const getOrderReducer = (state = { order: [] }, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return {
        loading: true,
      };
    case GET_ORDER_SUCCESS:
      return { ...state, loading: false, order: action.payload };
    case GET_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getOrdersList = (state = { orders: [] }, action) => {
  switch (action.type) {
    case GET_ORDERS_LIST_REQUEST:
      return {
        loading: true,
      };
    case GET_ORDERS_LIST_SUCCESS:
      return {
        loading: false,
        orders: [...state, action.payload],
      };
    case GET_ORDERS_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getUnbalancedSales = (state = { stats: {} }, action) => {
  switch (action.type) {
    case GET_UNBALANCED_SALES_REQUEST:
      return {
        loading: true,
      };
    case GET_UNBALANCED_SALES_SUCCESS:
      return { ...state, loading: false, stats: action.payload };
    case GET_UNBALANCED_SALES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getPlugSalesList = (state = { orders: {} }, action) => {
  switch (action.type) {
    case GET_PLUG_SALES_LIST_REQUEST:
      return {
        loading: true,
      };
    case GET_PLUG_SALES_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case GET_PLUG_SALES_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getPlugWeeklyStats = (state = { plugWeeklyStats: {} }, action) => {
  switch (action.type) {
    case GET_PLUG_WEEKLY_STATS_REQUEST:
      return {
        loading: true,
      };
    case GET_PLUG_WEEKLY_STATS_SUCCESS:
      return {
        loading: false,
        plugWeeklyStats: action.payload,
      };
    case GET_PLUG_WEEKLY_STATS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getPlugDailyStats = (state = { plugDailyStats: {} }, action) => {
  switch (action.type) {
    case GET_PLUG_DAILY_STATS_REQUEST:
      return {
        loading: true,
      };
    case GET_PLUG_DAILY_STATS_SUCCESS:
      return {
        loading: false,
        plugDailyStats: action.payload,
      };
    case GET_PLUG_DAILY_STATS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getAllOrdersReducer = (state = { orders: {} }, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS_REQUEST:
      return {
        loading: true,
      };
    case GET_ALL_ORDERS_SUCCESS:
      return {...state,
        loading: false,
        orders: action.payload,
      };
    case GET_ALL_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getStats = (state = { stats: {} }, action) => {
  switch (action.type) {
    case GET_STATS_REQUEST:
      return {
        loading: true,
      };
    case GET_STATS_SUCCESS:
      return {
        loading: false,
        stats: action.payload,
      };
    case GET_STATS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getDailyStats = (state = { stats: {} }, action) => {
  switch (action.type) {
    case GET_DAILY_STATS_REQUEST:
      return {
        loading: true,
      };
    case GET_DAILY_STATS_SUCCESS:
      return {
        loading: false,
        stats: action.payload,
      };
    case GET_DAILY_STATS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getWeeklyStats = (state = { stats: {} }, action) => {
  switch (action.type) {
    case GET_WEEKLY_STATS_REQUEST:
      return {
        loading: true,
      };
    case GET_WEEKLY_STATS_SUCCESS:
      return {
        loading: false,
        stats: action.payload,
      };
    case GET_WEEKLY_STATS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getAggregatedStats = (state = { stats: {} }, action) => {
  switch (action.type) {
    case GET_AGGREGATED_STATS_REQUEST:
      return {
        loading: true,
      };
    case GET_AGGREGATED_STATS_SUCCESS:
      return {
        loading: false,
        stats: action.payload,
      };
    case GET_AGGREGATED_STATS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
