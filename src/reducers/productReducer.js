import {
  PRODUCTS_REQUEST,
  PRODUCTS_SUCCESS,
  PRODUCTS_FAIL,
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
  GET_PRODUCTS_STATS_FAIL,
  GET_PRODUCTS_STATS_REQUEST,
  GET_PRODUCTS_STATS_SUCCESS,
  ADD_TO_WISHLIST_FAIL,
  ADD_TO_WISHLIST_REQUEST,
  ADD_TO_WISHLIST_SUCCESS,
} from "../constants/productConstants";

export default function (state = { products: [] }, action) {
  console.log(action.payload);
  switch (action.type) {
    case PRODUCTS_REQUEST:
      return {
        loading: true,
      };
    case PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export const addToWishlist = (state = {}, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST_REQUEST:
      return { loading: true };
    case ADD_TO_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        wishlist: action.payload,
      };
    case ADD_TO_WISHLIST_FAIL:
      return { loading: false, error: action.payload };
    // case PRODUCT_CREATE_RESET:
    //   return {};
    default:
      return state;
  }
};

export const removeFromWishlist = (state = {}, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST_REQUEST:
      return { loading: true };
    case ADD_TO_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        wishlist: action.payload,
      };
    case ADD_TO_WISHLIST_FAIL:
      return { loading: false, error: action.payload };
    // case PRODUCT_CREATE_RESET:
    //   return {};
    default:
      return state;
  }
};

export const createProductReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return { loading: true };
    case CREATE_PRODUCT_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case CREATE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    // case PRODUCT_CREATE_RESET:
    //   return {};
    default:
      return state;
  }
};

export const updateProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
      return { loading: true };
    case UPDATE_PRODUCT_SUCCESS:
      return {...state, loading: false, success: true, product: action.payload };
    case UPDATE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    // case PRODUCT_UPDATE_RESET:
    //   return { product: {} };
    default:
      return state;
  }
};

export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return { loading: true };
    case DELETE_PRODUCT_SUCCESS:
      return { loading: false, success: true };
    case DELETE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getAllProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return {
        loading: true,
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case GET_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case GET_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case GET_PRODUCT_SUCCESS:
      return { ...state, loading: false, product: action.payload };
    case GET_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getProductStats = (state = { productStats: {} }, action) => {
  switch (action.type) {
    case GET_PRODUCTS_STATS_REQUEST:
      return {
        loading: true,
      };
    case GET_PRODUCTS_STATS_SUCCESS:
      return {
        ...state,
        loading: false,
        productStats: action.payload,
      };
    case GET_PRODUCTS_STATS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getUserFeedProductsReducer = (
  state = { products: [] },
  action
) => {
  switch (action.type) {
    case GET_PRODUCTS_FOR_USER_FEED_REQUEST:
      return {
        loading: true,
      };
    case GET_PRODUCTS_FOR_USER_FEED_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case GET_PRODUCTS_FOR_USER_FEED_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getSearchedProductsReducer = (
  state = { products: [] },
  action
) => {
  switch (action.type) {
    case GET_SEARCHED_PRODUCTS_REQUEST:
      return {
        loading: true,
      };
    case GET_SEARCHED_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case GET_SEARCHED_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getRandomProductsByPlugReducer = (
  state = { products: [] },
  action
) => {
  switch (action.type) {
    case GET_RANDOM_PRODUCTS_BY_PLUG_REQUEST:
      return {
        loading: true,
      };
    case GET_RANDOM_PRODUCTS_BY_PLUG_SUCCESS:
      return {
        loading: false,
        products: [...state, action.payload],
      };
    case GET_RANDOM_PRODUCTS_BY_PLUG_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getProductsByPlugReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case GET_PRODUCTS_BY_PLUG_REQUEST:
      return {
        loading: true,
      };
    case GET_PRODUCTS_BY_PLUG_SUCCESS:
      return {
        loading: false,
        products: [...state, action.payload],
      };
    case GET_PRODUCTS_BY_PLUG_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getPlugWithProductsFrontPageReducer = (
  state = { plug: {} },
  action
) => {
  switch (action.type) {
    case GET_PRODUCTS_BY_PLUG_FRONTPAGE_REQUEST:
      return {
        loading: true,
      };
    case GET_PRODUCTS_BY_PLUG_FRONTPAGE_SUCCESS:
      return {
        loading: false,
        plug: action.payload,
      };
    case GET_PRODUCTS_BY_PLUG_FRONTPAGE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getPopularProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case GET_POPULAR_PRODUCTS_REQUEST:
      return {
        loading: true,
      };
    case GET_POPULAR_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case GET_POPULAR_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getNewArrivalsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case GET_NEW_ARRIVALS_PRODUCTS_REQUEST:
      return {
        loading: true,
      };
    case GET_NEW_ARRIVALS_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case GET_NEW_ARRIVALS_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getFilteredResultsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case GET_FILTERED_PRODUCTS_REQUEST:
      return {
        loading: true,
      };
    case GET_FILTERED_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case GET_FILTERED_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
