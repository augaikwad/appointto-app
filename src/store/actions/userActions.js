import service from "../../service";
import {
  setUser,
  setAppointmentStatuses,
  setDoctorsByClinicId,
  setSelectedDoctorId,
  setSelectedDoctor,
} from "../reducers/userSlice";
import { setAuthToken } from "../../helpers/setAuthToken";
import { setDashboardListFilters } from "../reducers/appointmentsSlice";

// Login user
export const login = (request, callback) => async (dispatch) => {
  try {
    const response = await service.post("Login/login", request, {
      silent: false,
      showNotification: true,
    });
    const { response_code, payload, message } = response.data;
    if (response_code === 2000) {
      const { token } = payload;
      dispatch(setUser(payload));

      //set token and refresh token in cookies if keepMeSignIn is true
      if (request.keepMeSignIn) {
      }

      //set token to axios common header
      setAuthToken(token);
      sessionStorage.setItem("token", token);
      if (callback) {
        callback(payload);
      }
    }
  } catch (error) {
    // Handle error here
    console.error("Error fetching user data:", error);
  }
};

// get appointment status
export const getAppointmentStatusList = () => async (dispatch) => {
  try {
    const response = await service.get("Appointment/get-appointment-status");
    const { response_code, payload } = response.data;
    if (response_code === 2000) {
      dispatch(setAppointmentStatuses(payload));
    }
  } catch (error) {
    // Handle error here
    console.error("Error fetching user data:", error);
  }
};

// get all doctors list
export const getDoctorsByClinicId =
  (req, id_doctor, callback) => async (dispatch) => {
    try {
      const stringParams = new URLSearchParams(req);
      const response = await service.get(
        "Doctor/get_doctorlist?" + stringParams,
      );
      const { response_code, payload } = response.data;
      if (response_code === 2000) {
        dispatch(setDoctorsByClinicId(payload));
        if (id_doctor !== undefined && payload.length) {
          const idDoctor = id_doctor === 0 ? payload[0].id_doctor : id_doctor;
          const selectedDoctor = payload.find(
            (dr) => dr.id_doctor === idDoctor,
          );

          dispatch(setSelectedDoctorId(idDoctor));
          dispatch(setSelectedDoctor(selectedDoctor));
          dispatch(setDashboardListFilters({ id_doctor: idDoctor }));
        }

        if (callback) {
          callback(payload);
        }
      }
    } catch (error) {
      // Handle error here
      console.error("Error fetching user data:", error);
    }
  };
