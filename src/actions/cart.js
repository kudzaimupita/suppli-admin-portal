import {
  ADD_ITEM,
  TOGGLE_CART_HIDDEN,
  REMOVE_ITEM,
  CLEAR_CART,
  CLEAR_ITEM_FROM_CART,
} from './types';
import { setAlert } from './alert';

export const toggleCartHidden = () => ({
  type: TOGGLE_CART_HIDDEN,
});

export const addItem = (item) => async (dispatch) => {
  dispatch(setAlert('Item Added to cart', 'success'));

  dispatch({
    type: ADD_ITEM,
    payload: item,
  });
};

export const removeItem = (item) => async (dispatch) => {
  dispatch(setAlert('Product quantity reduced', 'success'));

  dispatch({ type: REMOVE_ITEM, payload: item });
};

export const clearItemFromCart = (item) => ({
  type: CLEAR_ITEM_FROM_CART,
  payload: item,
});
export const clearCart = () => async (dispatch) => {
  dispatch(setAlert('Cart cleared', 'danger'));

  dispatch({
    type: CLEAR_CART,
  });
};
