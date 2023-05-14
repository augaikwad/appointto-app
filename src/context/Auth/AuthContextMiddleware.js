import { actionTypes } from "./index";
import service from "../../service";
import config from "../../config";
import cogoToast from "cogo-toast";
import { setAuthToken } from "../../helpers/setAuthToken";

const { API_BASE_URL } = config;

const toastOption = { hideAfter: 5, position: "top-right" };

export const applyAuthContextMiddleware =
  (dispatch, history, globalActions) => (action) => {
    const processAction = (action) => {
      const baseUrl = API_BASE_URL;

      switch (action.type) {
        case actionTypes.LOGIN:
          globalActions.setLoadingIndicator(true);
          return service
            .post(baseUrl + "Login/login", action.request)
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                cogoToast.success(data.message, toastOption);
                //set token and refresh token in cookies if keepMeSignIn is true
                if (action.request.keepMeSignIn) {
                }
                //set JWT token to local
                localStorage.setItem("token", data.payload.token);
                localStorage.setItem("id_doctor", data.payload.id_doctor);
                localStorage.setItem("id_clinic", data.payload.id_clinic);

                //set token to axios common header
                setAuthToken(data.payload.token);
                history.push("/dashboard");
                globalActions.setLoadingIndicator(false);
              } else {
                cogoToast.error(data.message, toastOption);
                globalActions.setLoadingIndicator(false);
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
              globalActions.setLoadingIndicator(false);
            });

        default:
          dispatch(action);
      }
    };

    return processAction(action);
  };
