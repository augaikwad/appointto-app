import { actionTypes } from "./index";
import service from "../../service";
import config from "../../config";

const { API_BASE_URL } = config;

export const applyDoctorContextMiddleware =
  (dispatch, history, globalActions) => (action) => {
    const processAction = (action) => {
      const baseUrl = API_BASE_URL;

      switch (action.type) {
        case actionTypes.GET_OTP:
          return service
            .post(baseUrl + "Registration/generate-otp", action.request)
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                dispatch({
                  type: actionTypes.GET_OTP_SUCCESS,
                  payload: data.payload,
                });
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
            });
        case actionTypes.GET_OTP_RESET_PASSWORD:
          return service
            .post(
              baseUrl + "Registration/reset-password-generate-otp",
              action.request,
            )
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                dispatch({
                  type: actionTypes.GET_OTP_SUCCESS,
                  payload: data.payload,
                });
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
            });
        case actionTypes.GET_RESEND_OTP:
          return service
            .post(baseUrl + "Registration/resend-otp", action.request)
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                dispatch({
                  type: actionTypes.GET_OTP_SUCCESS,
                  payload: res.data.payload,
                });
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
            });
        case actionTypes.VERIFY_OTP:
          return service
            .post(baseUrl + "Registration/verify-otp", action.request)
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                dispatch({
                  type: actionTypes.VERIFY_OTP_SUCCESS,
                  payload: data.payload,
                });
                if (
                  action.request.hasOwnProperty("otp_for") &&
                  action.request["otp_for"] === 0
                ) {
                  history.push("/signup");
                }
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
            });
        case actionTypes.RESET_PASSWORD:
          return service
            .post(baseUrl + "Registration/reset-password", action.request)
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                dispatch({
                  type: actionTypes.RESET_PASSWORD_SUCCESS,
                  payload: data.payload,
                });
                if (action.callback) {
                  action.callback();
                }
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
            });
        case actionTypes.SIGNUP_USER:
          return service
            .post(baseUrl + "Registration/register-user", action.request, {
              silent: false,
              showNotification: true,
            })
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                //set JWT token to local
                sessionStorage.setItem("token", data.payload.token);
                dispatch({
                  type: actionTypes.SIGNUP_USER_SUCCESS,
                  payload: action.request,
                });
                history.push("/registration");
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
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
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
            });
        case actionTypes.UPDATE_DOCTOR_INFO:
          return service
            .post(baseUrl + "Doctor/Create", action.request)
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                dispatch({
                  type: actionTypes.UPDATE_DOCTOR_INFO_SUCCESS,
                  payload: data.payload,
                });
                if (action.callback) action.callback();
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
            });
        case actionTypes.UPDATE_CLINIC_INFO:
          return service
            .post(baseUrl + "Doctor/add_clinic_information", action.request)
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                dispatch({
                  type: actionTypes.UPDATE_CLINIC_INFO_SUCCESS,
                  payload: data.payload,
                });
                if (action.callback) action.callback();
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
            });

        case actionTypes.UPDATE_SCHEDULE_INFO:
          return service
            .post(baseUrl + "Doctor/add-clinic-schedule", action.request)
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                if (action.callback) action.callback();
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
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
