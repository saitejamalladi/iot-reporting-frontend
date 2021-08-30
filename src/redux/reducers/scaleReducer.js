import * as types from "../../constants";

export default function reducer(state = {}, actions) {
  switch (actions.type) {
    case types.SET_SELECTED_ACCOUNT:
      return {
        ...state,
        selectedAccount: actions.selectedAccount,
      };
    case types.ACCOUNTS_FETCH_SUCCESS:
      return {
        ...state,
        accounts: actions.accounts,
      };
    case types.ACCOUNTS_FETCH_FAILURE:
      return {
        ...state,
        accounts: [],
      };
    case types.CHILD_ACCOUNTS_FETCH_SUCCESS:
      return {
        ...state,
        accounts: actions.accounts,
      };
    case types.CHILD_ACCOUNTS_FETCH_FAILURE:
      return {
        ...state,
        accounts: [],
      };
    case types.USERS_FETCH_SUCCESS:
      return {
        ...state,
        users: actions.users,
      };
    case types.USERS_FETCH_FAILURE:
      return {
        ...state,
        users: [],
      };
    case types.DEVICES_FETCH_SUCCESS:
      return {
        ...state,
        devices: actions.devices,
      };
    case types.DEVICES_FETCH_FAILURE:
      return {
        ...state,
        devices: [],
      };
    case types.SCALES_FETCH_SUCCESS:
      return {
        ...state,
        scales: actions.scales,
      };
    case types.REPORT_FETCH_SUCCESS:
      return {
        ...state,
        reportData: actions.reportData,
      };

    case types.REPORT_FETCH_FAILURE:
      return {
        ...state,
        reportData: null,
      };

    default:
      return state;
  }
}
