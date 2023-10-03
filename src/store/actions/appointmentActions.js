import service from "../../service";
import { setLoading } from "../reducers/globalSlice";
import { setDashboardAppointments } from "../reducers/appointmentsSlice";
import moment from "moment";

import cogoToast from "cogo-toast";
const toastOption = { hideAfter: 5, position: "top-right" };

export const formattedFilters = (filters) => {
  let filter = { ...filters };
  filter.appointment_date = moment(filter.appointment_date).format(
    "YYYY-MM-DD"
  );
  return filter;
};

// Login user
export const getDashboardAppointments = (request) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await service.post(
      "Appointment/get-appointment-by-doctor",
      formattedFilters(request)
    );
    const { response_code, payload, message } = response.data;
    if (response_code === 2000) {
      dispatch(setDashboardAppointments(payload));
    }
    dispatch(setLoading(false));
  } catch (error) {
    // Handle error here
    console.error("Error fetching user data:", error);
    dispatch(setLoading(false));
  }
};

export const createAppointment = (req, callback) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await service.post("Appointment/Create", req);
    const { response_code, message } = response.data;
    if (response_code === 2000) {
      cogoToast.success(message, toastOption);
      if (callback) {
        callback();
      }
    } else {
      cogoToast.error(message, toastOption);
    }
    dispatch(setLoading(false));
  } catch (error) {
    // Handle error here
    console.error("Error fetching user data:", error);
    dispatch(setLoading(false));
  }
};

export const updateAppointment = (req, callback) => async (dispatch) => {
  dispatch(setLoading(true));
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
    dispatch(setLoading(false));
  } catch (error) {
    // Handle error here
    console.error("Error fetching user data:", error);
    dispatch(setLoading(false));
  }
};
