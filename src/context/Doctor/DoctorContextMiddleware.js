import { actionTypes } from "./index";
import service from "../../service";
import config from "../../config";
import cogoToast from "cogo-toast";
import { actions } from "react-table";

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
        case actionTypes.GET_OTP_RESET_PASSWORD:
          globalActions.setLoadingIndicator(true);
          return service
            .post(
              baseUrl + "Registration/reset-password-generate-otp",
              action.request
            )
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
                if (
                  action.request.hasOwnProperty("otp_for") &&
                  action.request["otp_for"] === 0
                ) {
                  history.push("/signup");
                }
              } else {
                cogoToast.error(data.message, toastOption);
                globalActions.setLoadingIndicator(false);
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
            });
        case actionTypes.RESET_PASSWORD:
          globalActions.setLoadingIndicator(true);
          return service
            .post(baseUrl + "Registration/reset-password", action.request)
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                cogoToast.success(data.message, toastOption);
                dispatch({
                  type: actionTypes.RESET_PASSWORD_SUCCESS,
                  payload: data.payload,
                });
                if (action.callback) {
                  action.callback();
                }
                globalActions.setLoadingIndicator(false);
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
                //set JWT token to local
                localStorage.setItem("token", data.payload.token);
                dispatch({
                  type: actionTypes.SIGNUP_USER_SUCCESS,
                  payload: action.request,
                });
                globalActions.setLoadingIndicator(false);
                history.push("/registration");
              } else {
                cogoToast.error(data.message, toastOption);
                globalActions.setLoadingIndicator(false);
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
              globalActions.setLoadingIndicator(false);
            });
        case actionTypes.GET_QUALIFICATIONS:
          return service
            .get(baseUrl + "Doctor/get_qualifications")
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                dispatch({
                  type: actionTypes.GET_QUALIFICATIONS_SUCCESS,
                  payload: data.payload,
                });
              } else {
                cogoToast.error(data.message, toastOption);
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
            });
        case actionTypes.GET_SPECIALITY:
          return service
            .get(baseUrl + "Doctor/get_speciality")
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                dispatch({
                  type: actionTypes.GET_SPECIALITY_SUCCESS,
                  payload: data.payload,
                });
              } else {
                cogoToast.error(data.message, toastOption);
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
            });
        case actionTypes.UPDATE_DOCTOR_INFO:
          globalActions.setLoadingIndicator(true);
          return service
            .post(baseUrl + "Doctor/Create", action.request)
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                cogoToast.success(data.message, toastOption);
                globalActions.setLoadingIndicator(false);
                dispatch({
                  type: actionTypes.UPDATE_DOCTOR_INFO_SUCCESS,
                  payload: data.payload,
                });
                if (action.callback) action.callback();
              } else {
                cogoToast.error(data.message, toastOption);
                globalActions.setLoadingIndicator(false);
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
              globalActions.setLoadingIndicator(false);
            });
        case actionTypes.UPDATE_CLINIC_INFO:
          globalActions.setLoadingIndicator(true);
          return service
            .post(baseUrl + "Doctor/add_clinic_information", action.request)
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                cogoToast.success(data.message, toastOption);
                dispatch({
                  type: actionTypes.UPDATE_CLINIC_INFO_SUCCESS,
                  payload: data.payload,
                });
                globalActions.setLoadingIndicator(false);
                if (action.callback) action.callback();
              } else {
                cogoToast.error(data.message, toastOption);
                globalActions.setLoadingIndicator(false);
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
              globalActions.setLoadingIndicator(false);
            });

        case actionTypes.UPDATE_SCHEDULE_INFO:
          globalActions.setLoadingIndicator(true);
          return service
            .post(baseUrl + "Doctor/add-clinic-schedule", action.request)
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                cogoToast.success(data.message, toastOption);
                globalActions.setLoadingIndicator(false);
                if (action.callback) action.callback();
              } else {
                cogoToast.error(data.message, toastOption);
                globalActions.setLoadingIndicator(false);
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
              globalActions.setLoadingIndicator(false);
            });
        case actionTypes.GET_DOCTORS_BY_CLINIC_ID:
          return service
            .get(baseUrl + "Doctor/get_doctorlist?id_clinic=" + action.id)
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                dispatch({
                  type: actionTypes.GET_DOCTORS_BY_CLINIC_ID_SUCCESS,
                  payload: data.payload,
                });
                if (action.callback) {
                  action.callback(data.payload);
                }
              } else {
                cogoToast.error(data.message, toastOption);
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
