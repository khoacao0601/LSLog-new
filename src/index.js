import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store/index';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

// ---------------------- ENVIRONMENT/GLOBAL VARIABLES -------------
// ---------------------- LOGIN --------------------------------
window.$LOGIN_USERS = `http://18.222.84.229:8110/uaa/users`;
// ---------------------- INVENTORY --------------------------------
window.$RECEIVING_STAGING_API = `http://3.17.109.70:8140/v1/products/`;
// ---------------------- RECEIVING --------------------------------
const paramURL = window.location.href;
var urltest = new URL(paramURL);
var paramOnly = urltest.searchParams.get("number");
window.$ALL_RECEIVING_ORDERS = `http://3.142.47.66:8141/v1/receiving-orders`;
window.$SPECIFIC_ORDER = `http://3.142.47.66:8141/v1/receiving-orders/?orderId=${paramOnly}`;
// ---------------------- SHIPPING --------------------------------
// API's NOT AVAILABLE YET



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();