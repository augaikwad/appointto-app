import { actionTypes } from "./index";
import service from "../../service";
import config from "../../config";

const { API_BASE_URL } = config;

export const applyPatientContextMiddleware =
  (dispatch, history, globalActions) => (action) => {
    const processAction = (action) => {
      const baseUrl = API_BASE_URL;

      switch (action.type) {
        case actionTypes.ADD_PATIENT_GENERAL_INFO:
          return service
            .post(baseUrl + "Patient/add-patient-general", action.request)
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
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
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
            });
        case actionTypes.UPDATE_PATIENT_GENERAL_INFO:
          return service
            .post(baseUrl + "Patient/update-patient-general", action.request, {
              silent: false,
              showNotification: true,
            })
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
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
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
            });
        case actionTypes.CREATE_APPOINTMENT:
          return service
            .post(baseUrl + "Appointment/Create", action.request, {
              silent: false,
              showNotification: true,
            })
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

        case actionTypes.UPDATE_APPOINTMENT:
          return service
            .post(baseUrl + "Appointment/Update", action.request)
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
        case actionTypes.ADD_DOCUMENTS:
          let configData = {
            onUploadProgress: (progressEvent) => {
              if (action.onUploadProgress) {
                action.onUploadProgress(progressEvent);
              }
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
                if (action.callback) {
                  action.callback();
                }
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
            });
        case actionTypes.GET_PATIENT_BY_ID:
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
            })
            .catch((error) => {
              console.log("Service error === ", error);
            });
        case actionTypes.GET_GLOBAL_LIST:
          const params = {
            id_clinic: localStorage.getItem("id_clinic"),
            Keywords: action.Keyword,
            start_record: 1,
            end_record: 10,
          };
          let getPatientQueryString = new URLSearchParams(params).toString();
          return service
            .get(baseUrl + "Patient/get-patient-list?" + getPatientQueryString)
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
        case actionTypes.GET_PATIENTS_LIST:
          let queryString = new URLSearchParams(action.filters).toString();
          return service
            .get(baseUrl + "Patient/get-patient-list?" + queryString)
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                dispatch({
                  type: actionTypes.GET_PATIENTS_LIST_SUCCESS,
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
