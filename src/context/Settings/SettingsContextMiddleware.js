import { actionTypes } from "./index";
import service from "../../service";
import config from "../../config";
import cogoToast from "cogo-toast";

const { API_BASE_URL } = config;

const toastOption = { hideAfter: 5, position: "top-right" };

export const applySettingsContextMiddleware =
  (dispatch, history, globalActions) => (action) => {
    const processAction = (action) => {
      const baseUrl = API_BASE_URL;

      switch (action.type) {
        case actionTypes.GET_PRINTING_SETTING:
          globalActions.setLoadingIndicator(true);
          return service
            .get(
              baseUrl +
                "Doctor/get_printing_setting?DoctorId=" +
                parseInt(localStorage.getItem("id_doctor"))
            )
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                dispatch({
                  type: actionTypes.GET_PRINTING_SETTING_SUCCESS,
                  payload: data.payload,
                });
              }
              globalActions.setLoadingIndicator(false);
            })
            .catch((error) => {
              console.log("Service error === ", error);
              globalActions.setLoadingIndicator(false);
            });
        case actionTypes.ADD_PRINTING_SETTING:
          globalActions.setLoadingIndicator(true);
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
              globalActions.setLoadingIndicator(false);
            })
            .catch((error) => {
              console.log("Service error === ", error);
              globalActions.setLoadingIndicator(false);
            });
        case actionTypes.UPDATE_PRINTING_SETTING:
          globalActions.setLoadingIndicator(true);
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
              globalActions.setLoadingIndicator(false);
            })
            .catch((error) => {
              console.log("Service error === ", error);
              globalActions.setLoadingIndicator(false);
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
          globalActions.setLoadingIndicator(true);
          return service
            .get(
              baseUrl +
                "Doctor/get_clinic_user_list?id_clinic=" +
                parseInt(localStorage.getItem("id_clinic"))
            )
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                dispatch({
                  type: actionTypes.GET_USERS_SUCCESS,
                  payload: data.payload,
                });
              }
              globalActions.setLoadingIndicator(false);
            })
            .catch((error) => {
              console.log("Service error === ", error);
              globalActions.setLoadingIndicator(false);
            });
        case actionTypes.REGISTER_USER:
          globalActions.setLoadingIndicator(true);
          return service
            .post(baseUrl + "Registration/register-user-clinc", action.request)
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                if (action.callback) {
                  action.callback();
                }
              }
              globalActions.setLoadingIndicator(false);
            })
            .catch((error) => {
              console.log("Service error === ", error);
              globalActions.setLoadingIndicator(false);
            });
        case actionTypes.REGISTER_DOCTOR:
          globalActions.setLoadingIndicator(true);
          return service
            .post(baseUrl + "Doctor/create_clinic_doctor", action.request)
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                if (action.callback) {
                  action.callback();
                }
              }
              globalActions.setLoadingIndicator(false);
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
