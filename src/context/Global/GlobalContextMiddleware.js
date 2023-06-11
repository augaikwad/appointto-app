import { actionTypes } from "./index";
import service from "../../service";
import config from "../../config";

const { API_BASE_URL } = config;

export const applyGlobalContextMiddleware = (dispatch, history) => (action) => {
  const processAction = (action) => {
    const baseUrl = API_BASE_URL;
    switch (action.type) {
      case actionTypes.GET_CITIES:
        return service
          .get(baseUrl + "Doctor/search_city?Keywords=" + action.searchParam)
          .then((res) => {
            const { data } = res;
            if (data.response_code === 2000) {
              if (action.callback) {
                action.callback(data.payload);
              }
              dispatch({
                type: actionTypes.GET_CITIES_SUCCESS,
                payload: data.payload,
              });
            }
          })
          .catch((error) => {
            console.log("Service error === ", error);
          });
      default:
        dispatch(action);
    }
  };

  return processAction(action);
};
