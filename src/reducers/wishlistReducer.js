import {
  ADD_TO_WISHLIST_FAIL,
  ADD_TO_WISHLIST_REQUEST,
  ADD_TO_WISHLIST_SUCCESS,
  REMOVE_FROM_WISHLIST_REQUEST,
  REMOVE_FROM_WISHLIST_FAIL,
  REMOVE_FROM_WISHLIST_SUCCESS,
} from "../constants/wishlistConstants";

export const addToWishlistReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST_REQUEST:
      return { loading: true };
    case ADD_TO_WISHLIST_SUCCESS:
      return { loading: false, success: true };
    case ADD_TO_WISHLIST_FAIL:
      return { loading: false, error: action.payload };
    // case PRODUCT_CREATE_RESET:
    //   return {};
    default:
      return state;
  }
};

export const removeFromWishlistReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case REMOVE_FROM_WISHLIST_REQUEST:
      return { loading: true };
    case REMOVE_FROM_WISHLIST_SUCCESS:
      return { loading: false, success: true };
    case REMOVE_FROM_WISHLIST_FAIL:
      return { loading: false, error: action.payload };
    // case PRODUCT_UPDATE_RESET:
    //   return { product: {} };
    default:
      return state;
  }
};
