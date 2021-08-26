import axios from "../utils/axios";

import { AUTH_TOKEN } from "../constants";

export function authInit(token) {
  return new Promise((resolve, reject) => {
    let authHeader = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .get("/api/user/", authHeader)
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
export function signIn(credentials) {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/auth/token", credentials)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem(AUTH_TOKEN, response.data.res_data.token);
          resolve(response.data.res_data.userInfo);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function signUp(credentials) {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/auth/sign-up", credentials)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function resetPassword(credentials) {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/auth/reset-password", credentials)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
