import axios from "axios";
import config from "./config";
import { createBrowserHistory } from "history";
import store from "./store";
import { setLoading } from "./store/reducers/globalSlice";

const history = createBrowserHistory();
let requestCounter = 0;

const showLoader = () => {
  requestCounter++;
  store.dispatch(setLoading(true));
};

const hideLoader = (isSilent) => {
  if (requestCounter > 0 && !isSilent) {
    requestCounter--;
  }
  if (requestCounter === 0) {
    store.dispatch(setLoading(false));
  }
  return requestCounter;
};

const getAxiosClient = (baseUrl = null) => {
  const { API_BASE_URL } = config;
  const options = {
    baseURL: API_BASE_URL ? API_BASE_URL : baseUrl,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    withCredentials: false,
    timeout: 30000,
  };

  const client = axios.create(options);
  client.interceptors.request.use(
    (config) => {
      if (!config?.silent) {
        showLoader(true);
      }

      const token = sessionStorage.token;
      if (token !== null) {
        config.headers["Authorization"] = "Bearer " + token;
      } else {
        delete config.headers["Authorization"];
      }
      window.sessionStorage.LastServiceCallTime = Date.now();
      return config;
    },
    (error) => Promise.reject(error)
  );

  client.interceptors.response.use(
    (response) => {
      requestCounter = hideLoader(response?.config?.silent);

      if ("undefined" === typeof response || response.status < 200) {
        return Promise.reject(response);
      }
      return response;
    },
    (error) => {
      let { response } = error;

      requestCounter = hideLoader(error?.config?.silent);

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
