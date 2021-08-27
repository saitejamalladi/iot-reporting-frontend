import * as types from "../../constants";

export default function reducer(state = {}, actions) {
  switch (actions.type) {
    case types.SCALES_FETCH_SUCCESS:
      return {
        ...state,
        scales: actions.scales,
      };

    case types.SCALES_FETCH_FAILURE:
      return {
        ...state,
        scales: [],
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
    default:
      return state;
  }
}
