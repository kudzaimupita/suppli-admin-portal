import { combineReducers } from 'redux';

import { persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import alertReducer from './alertReducer';
import authtReducer from './authReducer';
import cartReducer from './cartReducer';

import { sendMessageReducer } from './contactFormReducer';

import {
  addToWishlistReducer,
  removeFromWishlistReducer,
} from './wishlistReducer';
import { getMaillistReducer, joinMaillistReducer } from './maillistReducer';

import { getAllUserssReducer, updateUserReducer } from './authReducer';

import {
  getPlugReviewsReducer,
  getPlugReviewReducer,
  updatePlugReviewReducer,
  createPlugReviewReducer,
  deletePlugReviewReducer,
  getAllPlugReviewsReducer,
} from './plugReviewsReducer';

import {
  getAllProductReviewsReducer,
  getProductReviewsReducer,
  getProductReviewReducer,
  updateProductReviewReducer,
  createProductReviewReducer,
  deleteProductReviewReducer,
} from './productReviewsReducer';

import {
  getCatergoriesReducer,
  getCatergoryReducer,
  updateCatergoryReducer,
  createCatergoryReducer,
  deleteCatergoryReducer,
} from './catergoryReducer';

import {
  getSubCatergoriesReducer,
  getSubCatergoryReducer,
  updateSubCatergoryReducer,
  createSubCatergoryReducer,
  deleteSubCatergoryReducer,
} from './subCatergoryReducer';

import {
  approvePlugReducer,
  getMyPlugReducer,
  getPlugReducer,
  getPlugsReducer,
  deletePlugReducer,
  updatePlugReducer,
  createPlugReducer,
  followPlugReducer,
  unfollowPlugReducer,
  getAllPlugsReducer,
} from './plugReducer';

import {
  getAllProductsReducer,
  getFilteredResultsReducer,
  getPopularProductsReducer,
  getNewArrivalsReducer,
  getPlugWithProductsFrontPageReducer,
  getProductReducer,
  getProductsByPlugReducer,
  getRandomProductsByPlugReducer,
  getSearchedProductsReducer,
  getUserFeedProductsReducer,
  createProductReducer,
  updateProductReducer,
  deleteProductReducer,
  getProductStats,
} from './productReducer';

import {
  getAggregatedStats,
  getDailyStats,
  getWeeklyStats,
  getOrderReducer,
  getMyOrdersReducer,
  createOrderReducer,
  getPlugSalesList,
  getOrdersList,
  getUnbalancedSales,
  deleteOrderReducer,
  updateOrderReducer,
  getPlugWeeklyStats,
  getPlugDailyStats,
  getAllOrdersReducer,
  getStats,
} from './orderReducer';

import {
  createRefundReducer,
  getMyRefundsReducer,
  getRefundReducer,
  updateRefundReducer,
  getAllRefundsReducer,
} from './refundsReducer';
import {
  createEmailCampaignReducer,
  getEmailCampignsReducer,
} from './plugEmailCampaigns';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'product', 'myPlug', 'myOrders', 'userFeed', 'users'],
};

const rootReducer = combineReducers({
  aggregatedStats: getAggregatedStats,
  dailyStats: getDailyStats,
  weeklyStats: getWeeklyStats,
  stats: getStats,
  updatedUser: updateUserReducer,
  approvedPlug: approvePlugReducer,
  order: getOrderReducer,
  maillist: getMaillistReducer,
  allRefunds: getAllRefundsReducer,
  allPlugReviews: getAllPlugReviewsReducer,
  allProductReviews: getAllProductReviewsReducer,
  allSubCatergories: getSubCatergoriesReducer,
  allCatergories: getCatergoriesReducer,
  allProducts: getAllProductsReducer,
  allPlugs: getAllPlugsReducer,
  allOrders: getAllOrdersReducer,
  users: getAllUserssReducer,
  removedFromwishlist: removeFromWishlistReducer,
  addedToWishlist: addToWishlistReducer,
  createdRefund: createRefundReducer,
  myRefunds: getMyRefundsReducer,
  refund: getRefundReducer,
  updatedRefund: updateRefundReducer,
  joinedMaillist: joinMaillistReducer,
  sentMessage: sendMessageReducer,
  alert: alertReducer,
  auth: authtReducer,
  cart: cartReducer,
  plugReviews: getPlugReviewsReducer,
  plugReview: getPlugReviewReducer,
  deletedPlugReview: deletePlugReviewReducer,
  createdPlugReview: createPlugReviewReducer,
  updatedPlugReview: updatePlugReviewReducer,

  productReviews: getProductReviewsReducer,
  productReview: getProductReviewReducer,
  deletedProductReview: deleteProductReviewReducer,
  createdProductReview: createProductReviewReducer,
  updatedProductReview: updateProductReviewReducer,

  catergories: getCatergoriesReducer,
  catergory: getCatergoryReducer,
  deletedCatergory: deleteCatergoryReducer,
  createdCatergory: createCatergoryReducer,
  updatedCatergory: updateCatergoryReducer,
  subCatergories: getSubCatergoriesReducer,
  subCatergory: getSubCatergoryReducer,
  deletedSubCatergory: deleteSubCatergoryReducer,
  createdSubCatergory: createSubCatergoryReducer,
  updatedSubCatergory: updateSubCatergoryReducer,
  createdPlug: createPlugReducer,
  deletedPlug: deletePlugReducer,
  plug: getPlugReducer,
  plugs: getPlugsReducer,
  followedPlug: followPlugReducer,
  unfollowedPlug: unfollowPlugReducer,
  updatedPlug: updatePlugReducer,
  myPlug: getMyPlugReducer,

  filteredProducts: getFilteredResultsReducer,
  popularProducts: getPopularProductsReducer,
  newArrivals: getNewArrivalsReducer,
  plugProducts: getPlugWithProductsFrontPageReducer,
  product: getProductReducer,
  products: getProductsByPlugReducer,
  randomProducts: getRandomProductsByPlugReducer,
  searchedProducts: getSearchedProductsReducer,
  userFeed: getUserFeedProductsReducer,
  productStats: getProductStats,
  createdProduct: createProductReducer,
  updatedProduct: updateProductReducer,
  deletedProduct: deleteProductReducer,
  plugStats: getPlugWeeklyStats,
  plugDailyStats: getPlugDailyStats,

  myOrders: getMyOrdersReducer,
  createdOrder: createOrderReducer,
  plugSales: getPlugSalesList,
  orders: getOrdersList,
  unBalancedSales: getUnbalancedSales,
  deletedOrder: deleteOrderReducer,
  updatedOrder: updateOrderReducer,
  createdEmailCampaign: createEmailCampaignReducer,

  emailCampaigns: getEmailCampignsReducer,
});

export default persistReducer(persistConfig, rootReducer);
