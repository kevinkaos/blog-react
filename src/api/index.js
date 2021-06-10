import axios from "axios";
import baseUrl from "./config";

const api = (config) => {
  axios.defaults.withCredentials = true;
  axios.defaults.xsrfHeaderName = "X-XSRF-TOKEN";
  return axios(config).catch((err) => {
    console.log(err);
    throw err;
  });
};

export const csrfCookie = () => {
  axios.defaults.withCredentials = true;
  return axios.get(`${baseUrl}/sanctum/csrf-cookie`).then((_) => {});
};

export default api;
