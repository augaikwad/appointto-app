import { actionTypes } from "./index";
import service from "../../service";
import config from "../../config";
import cogoToast from "cogo-toast";

const { API_BASE_URL } = config;

const toastOption = { hideAfter: 5, position: "top-right" };

export const applyPrescriptionContextMiddleware =
  (dispatch, history, globalActions) => (action) => {
    const processAction = (action) => {
      const baseUrl = API_BASE_URL;

      switch (action.type) {
        case actionTypes.GET_ADVICE_GROUP:
          return service
            .post(
              baseUrl +
                "Prescription/GetAdviceGroup?DoctorId=" +
                localStorage.getItem("id_doctor")
            )
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                if (action.callback) {
                  action.callback();
                }
                dispatch({
                  type: actionTypes.GET_ADVICE_GROUP_SUCCESS,
                  payload: data.payload,
                });
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
            });
        case actionTypes.SAVE_ADVICE_GROUP:
          globalActions.setLoadingIndicator(true);
          return service
            .post(baseUrl + "Prescription/SaveAdviceGroup", action.request)
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
        case actionTypes.GET_INVESTIGATIONS_GROUP:
          return service
            .post(
              baseUrl +
                "Prescription/GetInvestigationGroup?DoctorId=" +
                localStorage.getItem("id_doctor")
            )
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                if (action.callback) {
                  action.callback();
                }
                dispatch({
                  type: actionTypes.GET_INVESTIGATIONS_GROUP_SUCCESS,
                  payload: data.payload,
                });
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
            });
        case actionTypes.SAVE_INVESTIGATIONS_GROUP:
          globalActions.setLoadingIndicator(true);
          return service
            .post(
              baseUrl + "Prescription/SaveInvestigationGroup",
              action.request
            )
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
        case actionTypes.SAVE_UPDATE_TAG:
          let url = baseUrl;
          url += "Prescription/Save" + action.category;
          return service
            .post(url, action.request)
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                if (action.callback) {
                  action.callback(data.payload);
                }
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
            });
        case actionTypes.GET_COMPLAINTS:
          return service
            .post(
              baseUrl +
                "Prescription/getcomplaints?id_doctor=" +
                localStorage.getItem("id_doctor")
            )
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                if (action.callback) {
                  action.callback();
                }
                dispatch({
                  type: actionTypes.GET_COMPLAINTS_SUCCESS,
                  payload: data.payload,
                });
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
            });
        case actionTypes.GET_OBSERVATIONS:
          return service
            .post(
              baseUrl +
                "Prescription/getobservations?id_doctor=" +
                localStorage.getItem("id_doctor")
            )
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                if (action.callback) {
                  action.callback();
                }
                dispatch({
                  type: actionTypes.GET_OBSERVATIONS_SUCCESS,
                  payload: data.payload,
                });
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
            });
        case actionTypes.GET_DIAGNOSIS:
          return service
            .post(
              baseUrl +
                "Prescription/getdiagnosis?id_doctor=" +
                localStorage.getItem("id_doctor")
            )
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                if (action.callback) {
                  action.callback();
                }
                dispatch({
                  type: actionTypes.GET_DIAGNOSIS_SUCCESS,
                  payload: data.payload,
                });
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
            });
        case actionTypes.GET_WORKDONE:
          return service
            .post(
              baseUrl +
                "Prescription/getworkdone?id_doctor=" +
                localStorage.getItem("id_doctor")
            )
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                if (action.callback) {
                  action.callback();
                }
                dispatch({
                  type: actionTypes.GET_WORKDONE_SUCCESS,
                  payload: data.payload,
                });
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
            });
        case actionTypes.GET_ADVICES:
          return service
            .post(
              baseUrl +
                "Prescription/getadvice?id_doctor=" +
                localStorage.getItem("id_doctor")
            )
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                if (action.callback) {
                  action.callback();
                }
                dispatch({
                  type: actionTypes.GET_ADVICES_SUCCESS,
                  payload: data.payload,
                });
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
            });
        case actionTypes.GET_INVESTIGATIONS:
          return service
            .post(
              baseUrl +
                "Prescription/getinvestigations?id_doctor=" +
                localStorage.getItem("id_doctor")
            )
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                if (action.callback) {
                  action.callback();
                }
                dispatch({
                  type: actionTypes.GET_INVESTIGATIONS_SUCCESS,
                  payload: data.payload,
                });
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
            });
        case actionTypes.GET_DOCTOR_MEDICINES:
          return service
            .get(
              baseUrl +
                "Medicine/get-doctor-medicine?id_doctor=" +
                localStorage.getItem("id_doctor")
            )
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                dispatch({
                  type: actionTypes.GET_DOCTOR_MEDICINES_SUCCESS,
                  payload: data.payload,
                });
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
            });
        case actionTypes.SEARCH_MEDICINES:
          return service
            .get(baseUrl + "Medicine/Search?Keywords=" + action.key)
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                dispatch({
                  type: actionTypes.SEARCH_MEDICINES_SUCCESS,
                  payload: data.payload,
                });
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
            });
        case actionTypes.SAVE_PRESCRIPTION:
          globalActions.setLoadingIndicator(true);
          return service
            .post(baseUrl + "Prescription/SavePrescription", action.request)
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                cogoToast.success(data.message, toastOption);
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
        case actionTypes.GET_PRESCRIPTIONS:
          globalActions.setLoadingIndicator(true);
          return service
            .post(baseUrl + "Prescription/GetPrescription", action.request)
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                dispatch({
                  type: actionTypes.GET_PRESCRIPTIONS_SUCCESS,
                  payload: data.payload,
                });
              }
              globalActions.setLoadingIndicator(false);
            })
            .catch((error) => {
              console.log("Service error === ", error);
              globalActions.setLoadingIndicator(false);
            });
        case actionTypes.SAVE_RX_GROUP:
          globalActions.setLoadingIndicator(true);
          return service
            .post(baseUrl + "Prescription/SaveRxGroup", action.request)
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                if (action.callback && typeof action.callback === "function") {
                  action.callback();
                }
              }
              globalActions.setLoadingIndicator(false);
            })
            .catch((error) => {
              console.log("Service error === ", error);
              globalActions.setLoadingIndicator(false);
            });
        case actionTypes.GET_RX_GROUPS:
          globalActions.setLoadingIndicator(true);
          return service
            .post(
              baseUrl +
                "Prescription/GetRxGroup?DoctorId=" +
                localStorage.getItem("id_doctor")
            )
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                dispatch({
                  type: actionTypes.GET_RX_GROUPS_SUCCESS,
                  payload: data.payload,
                });
                if (action.callback && typeof action.callback === "function") {
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
