import {
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_FAIL,
  PURCHASE_BURGER_START,
  PURCHASE_INIT,
  FETCH_ORDERS_START,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAIL,
  PURCHASE_BURGER,
  FETCH_ORDERS
} from './types';

export const purchaseBurgerSuccess = (id: $TSFixMe, orderData: $TSFixMe) => {
  return {
    type: PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData
  };
};

export const purchaseBurgerFail = (error: $TSFixMe) => {
  return {
    type: PURCHASE_BURGER_FAIL,
    error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: PURCHASE_BURGER_START
  };
};

export const purchaseBurger = (orderData: $TSFixMe, token: $TSFixMe) => {
  return {
    type: PURCHASE_BURGER,
    orderData,
    token
  };
};

export const purchaseInit = () => {
  return {
    type: PURCHASE_INIT
  };
};

export const fetchOrdersSuccess = (orders: $TSFixMe) => {
  return {
    type: FETCH_ORDERS_SUCCESS,
    orders
  };
};

export const fetchOrdersFail = (error: $TSFixMe) => {
  return {
    type: FETCH_ORDERS_FAIL,
    error
  };
};

export const fetchOrdersStart = () => {
  return {
    type: FETCH_ORDERS_START
  };
};

export const fetchOrders = (token: $TSFixMe, userId: $TSFixMe) => {
  return {
    type: FETCH_ORDERS,
    token,
    userId
  };
};
