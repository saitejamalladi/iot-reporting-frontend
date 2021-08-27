import * as types from "../../constants";
import {
  fetchScales as fetchScalesService,
  fetchDevices as fetchDevicesService,
} from "../../services/scaleService";

import { AUTH_TOKEN } from "../../constants";

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
