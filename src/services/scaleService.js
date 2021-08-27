import axios from "../utils/axios";

export function fetchScales(token) {
  return new Promise((resolve, reject) => {
    let authHeader = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .get("/api/scale/all", authHeader)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data.res_data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function fetchDevices(token) {
  return new Promise((resolve, reject) => {
    let authHeader = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .get("/api/device/list", authHeader)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data.res_data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
