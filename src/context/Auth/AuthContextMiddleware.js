import { actionTypes } from "./index";
import service from "../../service";
import config from "../../config";
import { setAuthToken } from "../../helpers/setAuthToken";

const { API_BASE_URL } = config;

export const applyAuthContextMiddleware =
  (dispatch, history, globalActions) => (action) => {
    const processAction = (action) => {
      const baseUrl = API_BASE_URL;

      switch (action.type) {
        case actionTypes.LOGIN:
          return service
            .post("Login/login", action.request, {
              silent: false,
              showNotification: true,
            })
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                //set token and refresh token in cookies if keepMeSignIn is true
                if (action.request.keepMeSignIn) {
                }
                //set JWT token to local
                const { token, id_doctor, id_clinic, user_name, id_user } =
                  data.payload;
                localStorage.setItem("token", token);
                localStorage.setItem("id_doctor", id_doctor);
                localStorage.setItem("id_clinic", id_clinic);
                localStorage.setItem("user_name", user_name);
                localStorage.setItem("id_user", id_user);

                //set token to axios common header
                setAuthToken(token);
                history.push("/dashboard");
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
