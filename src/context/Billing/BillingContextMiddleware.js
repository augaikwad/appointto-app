import { actionTypes } from "./index";
import service from "../../service";
import config from "../../config";
import cogoToast from "cogo-toast";

const { API_BASE_URL } = config;

const toastOption = { hideAfter: 5, position: "top-right" };

export const applyBillingContextMiddleware =
  (dispatch, history, globalActions) => (action) => {
    const processAction = (action) => {
      const baseUrl = API_BASE_URL;

      switch (action.type) {
        case actionTypes.GET_TREATMENT_LIST:
          return service
            .get(
              baseUrl +
                "Doctor/GetTreatmentList?DoctorId=" +
                localStorage.getItem("id_doctor")
            )
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                dispatch({
                  type: actionTypes.GET_TREATMENT_LIST_SUCCESS,
                  payload: data.payload,
                });
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
            });
        case actionTypes.GET_ALL_BILL_DATA_LIST:
          globalActions.setLoadingIndicator(true);
          return service
            .post(baseUrl + "Bill/GetAllBillData", action.request)
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                dispatch({
                  type: actionTypes.GET_ALL_BILL_DATA_LIST_SUCCESS,
                  payload: data.payload,
                });
              } else {
                dispatch({
                  type: actionTypes.GET_ALL_BILL_DATA_LIST_SUCCESS,
                  payload: [],
                });
              }
              globalActions.setLoadingIndicator(false);
            })
            .catch((error) => {
              console.log("Service error === ", error);
              globalActions.setLoadingIndicator(false);
            });
        case actionTypes.CREATE_BILL:
          globalActions.setLoadingIndicator(true);
          return service
            .post(baseUrl + "Bill/Create", action.request)
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
        case actionTypes.UPDATE_BILL:
          globalActions.setLoadingIndicator(true);
          return service
            .post(baseUrl + "Bill/Update", action.request)
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
        case actionTypes.DELETE_BILL:
          globalActions.setLoadingIndicator(true);
          return service
            .post(baseUrl + "Bill/Delete", action.request)
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                cogoToast.success(data.message, toastOption);
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
        case actionTypes.GET_BILL_SUMMARY:
          return service
            .post(baseUrl + "Bill/GetBillSummary", action.request)
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                dispatch({
                  type: actionTypes.GET_BILL_SUMMARY_SUCCESS,
                  payload: data.payload,
                });
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
            });
        case actionTypes.ADD_PAYMENT:
          return service
            .post(baseUrl + "Bill/AddPayment", action.request)
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
        default:
          dispatch(action);
      }
    };

    return processAction(action);
  };
