import axios from "axios";
import config from "./config";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();
const getAxiosClient = (baseUrl = null) => {
  const { API_BASE_URL } = config;
  baseUrl = null !== baseUrl ? baseUrl : API_BASE_URL;
  const options = {
    baseURL: baseUrl,
    withCredentials: false,
    timeout: 30000,
  };
  const client = axios.create(options);
  client.interceptors.request.use(
    (config) => {
      config.headers["Content-Type"] = "application/json; charset=utf-8";
      // config.headers.Authorization =
      //   "Bearer " + window.sessionStorage.AuthToken;
      window.sessionStorage.LastServiceCallTime = Date.now();
      return config;
    },
    (error) => Promise.reject(error)
  );

  client.interceptors.response.use(
    (response) => {
      if ("undefined" === typeof response || response.status < 200) {
        return Promise.reject(response);
      }
      return response;
    },
    (error) => {
      let { response } = error;
      let errResponse = {};
      if ("undefined" === typeof response || response === undefined) {
        return Promise.reject("Something went wrong, Please try again.");
      }
      if (
        "undefined" !== typeof response.status &&
        (401 == response.status || 403 == response.status)
      ) {
        window.sessionStorage.IsServerTimeOut = true;
        history.push("/Login");
        window.location.reload(false);
        return Promise.reject(new Error("unauthorized"));
      }
      if ("timeout" === error.code) {
        return Promise.reject(new Error("Request timeout"));
      }

      if (response.data.errors.length > 0) {
        let errors = [];

        for (let i = 0; i < response.data.errors.length; i++) {
          if (response.data.errors[i].code == "Unknown") {
            errors.push(new Error("Unknown Error"));
          } else {
            errors.push(new Error(response.data.errors[i].message));
          }
        }
        errResponse = { errors: errors, status: response.status };
        return Promise.reject(errResponse);
      } else {
        return Promise.reject(response);
      }
    }
  );
  return client;
};
export default getAxiosClient;
