import React, { useEffect, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import { Provider } from 'react-redux';

import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { loadUser, getAllUsers } from './actions/auth';
import { getAllProducts } from './actions/products';
import { getMaillist } from './actions/maillist';

import { getAllRefunds } from './actions/refunds';
import { getCatergories } from './actions/catergories';
import { getSubCategories } from './actions/subCatergories';
import { getAllProductReviews } from './actions/productReviews';
import { getAllPlugReviews } from './actions/plugReviews';
import { getPlugWeeklyStats, getPlugStats, getAllPlugs } from './actions/plugs';
import {
  getAllOrders,
  getStats,
  getAggregatedStats,
  getDailyStats,
  getWeeklyStats,
} from './actions/orders';
import setAuthToken from './utils/seAuthToken';
import { LOGOUT } from './constants/authConstants';
import Alert from './components/alert';

import { store, persistor } from '../src/store';
import { PersistGate } from 'redux-persist/integration/react';

import AdminLayout from './layouts/Admin.js';

import PrivateRoute from './PrivateRoute';

function App() {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      store.dispatch(loadUser());
    }

    if (localStorage.token) {
      store.dispatch(getPlugStats());
      // store.dispatch(getAllUsers());
      store.dispatch(getPlugWeeklyStats());
      // store.dispatch(getAllOrders());
      store.dispatch(getAllPlugs());
      store.dispatch(getAllProducts());
      store.dispatch(getSubCategories());
      store.dispatch(getCatergories());
      store.dispatch(getAllProductReviews());
      store.dispatch(getAllPlugReviews());
      store.dispatch(getAllRefunds());
      store.dispatch(getMaillist());
      store.dispatch(getStats());
      store.dispatch(getWeeklyStats());
      store.dispatch(getDailyStats());
      store.dispatch(getAggregatedStats());
    }

    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <Fragment>
            <Alert />
            <Switch>
              <Route exact path="/signup" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/forgotpassword" component={ForgotPassword} />
              <Route exact path="/resetpassword" component={ResetPassword} />

              <PrivateRoute path="/admin" component={AdminLayout} />

              <Redirect from="/" to="/admin/index" />
              <Redirect from="/dashboard" to="/admin/index" />
            </Switch>
          </Fragment>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
