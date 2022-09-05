import { actionTypes } from "./index";
import service from "../../service";
import config from "../../config";
import cogoToast from "cogo-toast";

const { API_BASE_URL } = config;

const toastOption = { hideAfter: 5, position: "top-right" };

export const applyDoctorContextMiddleware =
  (dispatch, history, globalActions) => (action) => {
    const processAction = (action) => {
      const baseUrl = API_BASE_URL;

      switch (action.type) {
        case actionTypes.GET_OTP:
          globalActions.setLoadingIndicator(true);
          return service
            .post(baseUrl + "Registration/generate-otp", action.request)
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                cogoToast.success(data.message, toastOption);
                dispatch({
                  type: actionTypes.GET_OTP_SUCCESS,
                  payload: data.payload,
                });
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
        case actionTypes.GET_RESEND_OTP:
          globalActions.setLoadingIndicator(true);
          return service
            .post(baseUrl + "Registration/resend-otp", action.request)
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                cogoToast.success(data.message, toastOption);
                dispatch({
                  type: actionTypes.GET_OTP_SUCCESS,
                  payload: res.data.payload,
                });
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
        case actionTypes.VERIFY_OTP:
          globalActions.setLoadingIndicator(true);
          return service
            .post(baseUrl + "Registration/verify-otp", action.request)
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                cogoToast.success(data.message, toastOption);
                dispatch({
                  type: actionTypes.VERIFY_OTP_SUCCESS,
                  payload: data.payload,
                });
                globalActions.setLoadingIndicator(false);
                history.push("/signup");
              } else {
                cogoToast.error(data.message, toastOption);
                globalActions.setLoadingIndicator(false);
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
            });
        case actionTypes.SIGNUP_USER:
          globalActions.setLoadingIndicator(true);
          return service
            .post(baseUrl + "Registration/register-user", action.request)
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                cogoToast.success(data.message, toastOption);
                // dispatch({
                //   type: actionTypes.VERIFY_OTP_SUCCESS,
                //   payload: data.payload,
                // });
                globalActions.setLoadingIndicator(false);
                history.push("/registration");
              } else {
                cogoToast.error(data.message, toastOption);
                globalActions.setLoadingIndicator(false);
              }
              console.log("Service res === ", res);
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
