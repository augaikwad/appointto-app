import { actionTypes } from "./index";
import service from "../../service";
import config from "../../config";

const { API_BASE_URL } = config;

export const applySettingsContextMiddleware =
  (dispatch, history, globalActions) => (action) => {
    const processAction = (action) => {
      const baseUrl = API_BASE_URL;

      switch (action.type) {
        case actionTypes.GET_PRINTING_SETTING:
          return service
            .get(
              baseUrl +
                "Doctor/get_printing_setting?DoctorId=" +
                parseInt(localStorage.getItem("id_doctor")),
            )
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                dispatch({
                  type: actionTypes.GET_PRINTING_SETTING_SUCCESS,
                  payload: data.payload,
                });
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
            });
        case actionTypes.ADD_PRINTING_SETTING:
          return service
            .post(baseUrl + "Doctor/add_printing_setting", action.request)
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                dispatch({
                  type: actionTypes.GET_PRINTING_SETTING_SUCCESS,
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
        case actionTypes.UPDATE_PRINTING_SETTING:
          return service
            .post(baseUrl + "Doctor/update_printing_setting", action.request)
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                dispatch({
                  type: actionTypes.GET_PRINTING_SETTING_SUCCESS,
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
        case actionTypes.GET_USER_ROLES:
          return service
            .post(baseUrl + "Registration/get_roles")
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                dispatch({
                  type: actionTypes.GET_USER_ROLES_SUCCESS,
                  payload: data.payload,
                });
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
            });
        case actionTypes.GET_USERS:
          return service
            .get(
              baseUrl +
                "Doctor/get_clinic_user_list?id_clinic=" +
                parseInt(localStorage.getItem("id_clinic")),
            )
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                dispatch({
                  type: actionTypes.GET_USERS_SUCCESS,
                  payload: data.payload,
                });
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
            });
        case actionTypes.REGISTER_USER:
          return service
            .post(baseUrl + "Registration/register-user-clinc", action.request)
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                if (action.callback) {
                  action.callback();
                }
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
            });
        case actionTypes.REGISTER_DOCTOR:
          return service
            .post(baseUrl + "Doctor/create_clinic_doctor", action.request)
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                if (action.callback) {
                  action.callback();
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
