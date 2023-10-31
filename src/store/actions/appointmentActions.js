import service from "../../service";
import {
  setDashboardAppointments,
  setAppointmentsForCalendar,
} from "../reducers/appointmentsSlice";
import moment from "moment";
import { setClearGlobalSearchInput } from "../reducers/patientSlice";

import cogoToast from "cogo-toast";
const toastOption = { hideAfter: 5, position: "top-right" };

export const formattedFilters = (filters) => {
  let filter = { ...filters };
  filter.appointment_date = moment(filter.appointment_date).format(
    "YYYY-MM-DD"
  );
  return filter;
};

export const getDashboardAppointments = (request) => async (dispatch) => {
  try {
    const response = await service.post(
      "Appointment/get-appointment-by-doctor",
      formattedFilters(request)
    );
    const { response_code, payload, message } = response.data;
    if (response_code === 2000) {
      dispatch(setDashboardAppointments(payload));
    }
  } catch (error) {
    // Handle error here
    console.error("Error fetching user data:", error);
  }
};

export const createAppointment = (req, callback) => async (dispatch) => {
  try {
    const response = await service.post("Appointment/Create", req);
    const { response_code, message, payload } = response.data;
    if (response_code === 2000) {
      cogoToast.success(message, toastOption);
      if (callback) {
        callback(payload);
      }
    } else {
      cogoToast.error(message, toastOption);
    }
    dispatch(setClearGlobalSearchInput(true));
  } catch (error) {
    // Handle error here
    console.error("Error fetching user data:", error);
  }
};

export const updateAppointment = (req, callback) => async (dispatch) => {
  try {
    const response = await service.post("Appointment/Update", req);
    const { response_code, message } = response.data;
    if (response_code === 2000) {
      cogoToast.success(message, toastOption);
      if (callback) {
        callback();
      }
    } else {
      cogoToast.error(message, toastOption);
    }
  } catch (error) {
    // Handle error here
    console.error("Error fetching user data:", error);
  }
};

export const getAppointmentsForCalendar = (request) => async (dispatch) => {
  try {
    const response = await service.post(
      "Appointment/get-appointment-for-calendar",
      request
    );
    const { response_code, payload } = response.data;
    if (response_code === 2000) {
      dispatch(setAppointmentsForCalendar(payload));
    }
  } catch (error) {
    // Handle error here
    console.error("Error fetching user data:", error);
  }
};

export const getAppointmentById = (id, callback) => async (dispatch) => {
  try {
    const response = await service.get(
      "Appointment/get-appointment-by-id?AppointmentId=" + id
    );
    const { response_code, payload } = response.data;
    if (response_code === 2000) {
      if (callback) {
        callback(payload);
      }
    }
  } catch (error) {
    // Handle error here
    console.error("Error fetching user data:", error);
  }
};
