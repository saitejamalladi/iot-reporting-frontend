import axios from "axios";

export default axios.create({
  baseURL: "http://54.153.128.183:8080",
  validateStatus: (status) => status < 500,
});
