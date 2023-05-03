import { actionTypes } from "./index";
import service from "../../service";
import config from "../../config";
import cogoToast from "cogo-toast";

const { API_BASE_URL } = config;

const toastOption = { hideAfter: 5, position: "top-right" };

export const applyPatientContextMiddleware =
  (dispatch, history, globalActions) => (action) => {
    const processAction = (action) => {
      const baseUrl = API_BASE_URL;

      switch (action.type) {
        case actionTypes.ADD_PATIENT_GENERAL_INFO:
          globalActions.setLoadingIndicator(true);
          return service
            .post(baseUrl + "Patient/add-patient-general", action.request)
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                cogoToast.success(data.message, toastOption);
                if (action.callback) {
                  action.callback(data.payload);
                }
                dispatch({
                  type: actionTypes.ADD_PATIENT_GENERAL_INFO_SUCCESS,
                  payload: data.payload,
                });
                dispatch({
                  type: actionTypes.SET_PATIENT_ID_FOR_CREATE_APPOINTMENT,
                  id_patient: data.payload.id_patient,
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
        case actionTypes.UPDATE_PATIENT_GENERAL_INFO:
          globalActions.setLoadingIndicator(true);
          return service
            .post(baseUrl + "Patient/update-patient-general", action.request)
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                cogoToast.success(data.message, toastOption);
                if (action.callback) {
                  action.callback(data.payload);
                }
                dispatch({
                  type: actionTypes.UPDATE_PATIENT_GENERAL_INFO_SUCCESS,
                  payload: data.payload,
                });
                dispatch({
                  type: actionTypes.SET_PATIENT_ID_FOR_CREATE_APPOINTMENT,
                  id_patient: data.payload.id_patient,
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
        case actionTypes.CREATE_APPOINTMENT:
          globalActions.setLoadingIndicator(true);
          return service
            .post(baseUrl + "Appointment/Create", action.request)
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                cogoToast.success(data.message, toastOption);
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
              globalActions.setLoadingIndicator(false);
            });

        case actionTypes.UPDATE_APPOINTMENT:
          globalActions.setLoadingIndicator(true);
          return service
            .post(baseUrl + "Appointment/Update", action.request)
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                cogoToast.success(data.message, toastOption);
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
              globalActions.setLoadingIndicator(false);
            });
        case actionTypes.ADD_DOCUMENTS:
          globalActions.setLoadingIndicator(true);
          let configData = {
            onUploadProgress: (progressEvent) => {
              if (action.onUploadProgress) {
                action.onUploadProgress(progressEvent);
              }

              // let percentCompleted = Math.round(
              //   (progressEvent.loaded * 100) / progressEvent.total
              // );
              // console.log(percentCompleted);
            },
            headers: {
              "content-type": "multipart/form-data",
            },
          };
          return service
            .post(baseUrl + "Patient/add-document", action.request, configData)
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                cogoToast.success(data.message, toastOption);
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
              globalActions.setLoadingIndicator(false);
            });
        case actionTypes.GET_PATIENT_BY_ID:
          globalActions.setLoadingIndicator(true);
          return service
            .get(baseUrl + "Patient/get-patient?PatientId=" + action.id)
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                if (action.callback) {
                  action.callback(data.payload);
                }
                dispatch({
                  type: actionTypes.GET_PATIENT_BY_ID_SUCESS,
                  payload: data.payload,
                });
              }
              globalActions.setLoadingIndicator(false);
            })
            .catch((error) => {
              console.log("Service error === ", error);
              globalActions.setLoadingIndicator(false);
            });
        case actionTypes.GET_GLOBAL_LIST:
          return service
            .get(
              baseUrl +
                "Patient/get-patient-list?id_clinic=" +
                localStorage.getItem("id_clinic")
            )
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                dispatch({
                  type: actionTypes.GET_GLOBAL_LIST_SUCCESS,
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
