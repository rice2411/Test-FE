import axios from "axios";
import cookie from "js-cookie";
import env from "../../config/env";
const Axios = axios.create({
  baseURL: env.API_URL,
});

Axios.interceptors.request.use(
  function (config) {
    let token = cookie.get("token") || null;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    config.headers["Access-Control-Allow-Origin"] = "*";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default Axios;
