import axios from "../utils/axios";

export function addAccount(token, account) {
  return new Promise((resolve, reject) => {
    let authHeader = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .post("/api/account", account, authHeader)
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
export function fetchAccounts(token) {
  return new Promise((resolve, reject) => {
    let authHeader = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .get("/api/account/info", authHeader)
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
export function fetchChildAccounts(token, accountId) {
  return new Promise((resolve, reject) => {
    let authHeader = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .get("/api/account/child/" + accountId, authHeader)
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
export function addUser(token, user) {
  return new Promise((resolve, reject) => {
    let authHeader = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .post("/api/user", user, authHeader)
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
export function fetchUsers(token) {
  return new Promise((resolve, reject) => {
    let authHeader = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .get("/api/user/list", authHeader)
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
export function fetchReport(token) {
  return new Promise((resolve, reject) => {
    let authHeader = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .get("/api/scale/report", authHeader)
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
