import * as types from "../../constants";
import {
  addAccount as addAccountService,
  fetchAccounts as fetchAccountsService,
  fetchChildAccounts as fetchChildAccountsService,
  fetchUsers as fetchUsersService,
  fetchDevices as fetchDevicesService,
  fetchScales as fetchScalesService,
} from "../../services/scaleService";

import { AUTH_TOKEN } from "../../constants";

export function selectedAccount(accountId) {
  return {
    type: types.SET_SELECTED_ACCOUNT,
    selectedAccount: accountId,
  };
}
export function addAccount(account) {
  return async (dispatch) => {
    let token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      return addAccountService(token, account)
        .then((response) => {
          dispatch({
            type: types.ADD_ACCOUNT_SUCCESS,
            accounts: response,
          });
        })
        .catch((error) => {
          throw error;
        });
    } else {
      return dispatch({ type: types.ADD_ACCOUNT_FAILURE });
    }
  };
}
export function fetchAccounts() {
  return async (dispatch) => {
    let token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      return fetchAccountsService(token)
        .then((response) => {
          dispatch({
            type: types.ACCOUNTS_FETCH_SUCCESS,
            accounts: response,
          });
        })
        .catch((error) => {
          throw error;
        });
    } else {
      return dispatch({ type: types.ACCOUNTS_FETCH_FAILURE });
    }
  };
}
export function fetchChildAccounts(accountId) {
  return async (dispatch) => {
    dispatch(selectedAccount(accountId));
    let token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      return fetchChildAccountsService(token, accountId)
        .then((response) => {
          dispatch({
            type: types.CHILD_ACCOUNTS_FETCH_SUCCESS,
            accounts: response,
          });
        })
        .catch((error) => {
          throw error;
        });
    } else {
      return dispatch({ type: types.CHILD_ACCOUNTS_FETCH_FAILURE });
    }
  };
}
export function fetchUsers() {
  return async (dispatch) => {
    let token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      return fetchUsersService(token)
        .then((response) => {
          dispatch({
            type: types.USERS_FETCH_SUCCESS,
            users: response,
          });
        })
        .catch((error) => {
          throw error;
        });
    } else {
      return dispatch({ type: types.USERS_FETCH_FAILURE });
    }
  };
}
export function fetchDevices() {
  return async (dispatch) => {
    let token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      return fetchDevicesService(token)
        .then((response) => {
          dispatch({
            type: types.DEVICES_FETCH_SUCCESS,
            devices: response,
          });
        })
        .catch((error) => {
          throw error;
        });
    } else {
      return dispatch({ type: types.DEVICES_FETCH_FAILURE });
    }
  };
}
export function fetchScales() {
  return async (dispatch) => {
    let token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      return fetchScalesService(token)
        .then((response) => {
          dispatch({
            type: types.SCALES_FETCH_SUCCESS,
            scales: response,
          });
        })
        .catch((error) => {
          throw error;
        });
    } else {
      return dispatch({ type: types.SCALES_FETCH_FAILURE });
    }
  };
}
