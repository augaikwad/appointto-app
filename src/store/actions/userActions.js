import service from "../../service";
import cogoToast from "cogo-toast";
import {
  setUser,
  setAppointmentStatuses,
  setDoctorsByClinicId,
  setSelectedDoctorId,
  setSelectedDoctor,
} from "../reducers/userSlice";
import { setAuthToken } from "../../helpers/setAuthToken";
import { setDashboardListFilters } from "../reducers/appointmentsSlice";

const toastOption = { hideAfter: 5, position: "top-right" };

// Login user
export const login = (request, callback) => async (dispatch) => {
  try {
    const response = await service.post("Login/login", request);
    const { response_code, payload, message } = response.data;
    if (response_code === 2000) {
      cogoToast.success(message, toastOption);

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
        "Doctor/get_doctorlist?" + stringParams
      );
      const { response_code, payload } = response.data;
      if (response_code === 2000) {
        dispatch(setDoctorsByClinicId(payload));

        if (id_doctor) {
          let idDoctor = id_doctor;
          if (idDoctor === 0) {
            idDoctor = payload[0].id_doctor;
          }

          dispatch(setSelectedDoctorId(idDoctor));
          dispatch(
            setSelectedDoctor(payload.find((dr) => dr.id_doctor === idDoctor))
          );
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
