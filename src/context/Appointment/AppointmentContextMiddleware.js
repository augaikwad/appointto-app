import { actionTypes } from "./index";
import service from "../../service";
import config from "../../config";
import moment from "moment";

const { API_BASE_URL } = config;

export const applyAppointmentContextMiddleware =
  (dispatch, history, globalActions) => (action) => {
    const processAction = (action) => {
      const baseUrl = API_BASE_URL;
      switch (action.type) {
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
        case actionTypes.LIST_BY_DOCTOR:
          let req = { ...action.request };
          req.id_doctor =
            req.id_doctor !== null
              ? req.id_doctor
              : localStorage.getItem("id_doctor");
          req.appointment_date = moment(req.appointment_date).format(
            "YYYY-MM-DD",
          );
          return service
            .post(baseUrl + "Appointment/get-appointment-by-doctor", req)
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                dispatch({
                  type: actionTypes.LIST_BY_DOCTOR_SUCCESS,
                  payload: data.payload,
                });
                if (action.request.id_doctor === null) {
                  dispatch({
                    type: actionTypes.SET_FILTERS_FOR_LIST_BY_DOCTOR,
                    payload: { id_doctor: localStorage.getItem("id_doctor") },
                  });
                }
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
            });
        case actionTypes.GET_APPOINTMENT_STATUS_LIST:
          return service
            .get(baseUrl + "Appointment/get-appointment-status")
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                dispatch({
                  type: actionTypes.GET_APPOINTMENT_STATUS_LIST_SUCCESS,
                  payload: data.payload,
                });
              }
            })
            .catch((error) => {
              console.log("Service error === ", error);
            });
        case actionTypes.GET_APPOINTMENTS_FOR_CALENDAR:
          return service
            .post(
              baseUrl + "Appointment/get-appointment-for-calendar",
              action.request,
            )
            .then((res) => {
              const { data } = res;
              if (data.response_code === 2000) {
                dispatch({
                  type: actionTypes.GET_APPOINTMENTS_FOR_CALENDAR_SUCCESS,
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
