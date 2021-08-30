import * as types from "../../constants";
import {
  addAccount as addAccountService,
  fetchAccounts as fetchAccountsService,
  fetchChildAccounts as fetchChildAccountsService,
  fetchUsers as fetchUsersService,
  fetchDevices as fetchDevicesService,
  fetchScales as fetchScalesService,
  fetchReport as fetchReportService,
} from "../../services/scaleService";

import { AUTH_TOKEN } from "../../constants";

export function setSelectedAccount(selectedAccount) {
  return {
    type: types.SET_SELECTED_ACCOUNT,
    selectedAccount: selectedAccount,
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
            message: response.display_msg,
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
export function fetchAccounts(selectedAccount) {
  return async (dispatch) => {
    let token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      dispatch({
        type: types.SET_SELECTED_ACCOUNT,
        selectedAccount: selectedAccount,
      });
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
export function fetchChildAccounts(account) {
  return async (dispatch) => {
    let parentAccount = {
      account_id: account.account_id,
      name: account.name,
    };
    dispatch(setSelectedAccount(parentAccount));
    let token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      return fetchChildAccountsService(token, account.account_id)
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
export function fetchReport() {
  return async (dispatch) => {
    let token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      return fetchReportService(token)
        .then((response) => {
          dispatch({
            type: types.REPORT_FETCH_SUCCESS,
            reportData: response,
          });
        })
        .catch((error) => {
          throw error;
        });
    } else {
      return dispatch({ type: types.REPORT_FETCH_FAILURE });
    }
  };
}
