import service from "../../service";
import {
  setOTPData,
  setVerifyOTPData,
  setSpeciality,
  setSignupUserData,
  resetPasswordSuccess,
  setQualifications,
  updateDoctorInfoSuccess,
  updateClinicInfoSuccess,
} from "../reducers/doctorSlice";
import cogoToast from "cogo-toast";
import { navigateTo } from "../reducers/navigationSlice";
const toastOption = { hideAfter: 5, position: "top-right" };

export const getSpeciality = () => async (dispatch) => {
  try {
    const response = await service.get("Doctor/get_speciality");
    const { response_code, message, payload } = response.data;
    if (response_code === 2000) {
      dispatch(setSpeciality(payload));
    } else {
      cogoToast.error(message, toastOption);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const getOTP = (request) => async (dispatch) => {
  try {
    const response = await service.post("Registration/generate-otp", request);
    const { response_code, message, payload } = response.data;
    if (response_code === 2000) {
      cogoToast.success(message, toastOption);
      dispatch(setOTPData(payload));
    } else {
      cogoToast.error(message, toastOption);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const verifyOTP = (request) => async (dispatch) => {
  try {
    const response = await service.post("Registration/verify-otp", request);
    const { response_code, message, payload } = response.data;
    if (response_code === 2000) {
      cogoToast.success(message, toastOption);
      dispatch(setVerifyOTPData(payload));
      if (request.hasOwnProperty("otp_for") && request["otp_for"] === 0) {
        dispatch(navigateTo({ pathname: "/signup" }));
      }
    } else {
      cogoToast.error(message, toastOption);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const getOTPForResetPassword = (request) => async (dispatch) => {
  try {
    const response = await service.post(
      "Registration/reset-password-generate-otp",
      request
    );
    const { response_code, message, payload } = response.data;
    if (response_code === 2000) {
      cogoToast.success(message, toastOption);
      dispatch(setOTPData(payload));
    } else {
      cogoToast.error(message, toastOption);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const resendOTP = (request) => async (dispatch) => {
  try {
    const response = await service.post("Registration/resend-otp", request);
    const { response_code, message, payload } = response.data;
    if (response_code === 2000) {
      cogoToast.success(message, toastOption);
      dispatch(setOTPData(payload));
    } else {
      cogoToast.error(message, toastOption);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const resetPassword = (request, callback) => async (dispatch) => {
  try {
    const response = await service.post("Registration/reset-password", request);
    const { response_code, message } = response.data;
    if (response_code === 2000) {
      cogoToast.success(message, toastOption);
      dispatch(resetPasswordSuccess());
      if (callback) {
        callback();
      }
    } else {
      cogoToast.error(message, toastOption);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const signupUser = (request) => async (dispatch) => {
  try {
    const response = await service.post("Registration/register-user", request);
    const { response_code, message, payload } = response.data;
    if (response_code === 2000) {
      cogoToast.success(message, toastOption);
      sessionStorage.setItem("token", payload.token);
      dispatch(setSignupUserData(request));
      dispatch(navigateTo({ pathname: "/registration" }));
    } else {
      cogoToast.error(message, toastOption);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const getQualifications = () => async (dispatch) => {
  try {
    const response = await service.get("Doctor/get_qualifications");
    const { response_code, message, payload } = response.data;
    if (response_code === 2000) {
      dispatch(setQualifications(payload));
    } else {
      cogoToast.error(message, toastOption);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const updateDoctorInfo = (request, callback) => async (dispatch) => {
  try {
    const response = await service.post("Doctor/Create", request);
    const { response_code, message, payload } = response.data;
    if (response_code === 2000) {
      cogoToast.success(message, toastOption);
      dispatch(updateDoctorInfoSuccess(payload));
      if (callback) {
        callback();
      }
    } else {
      cogoToast.error(message, toastOption);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const updateClinicInfo = (request, callback) => async (dispatch) => {
  try {
    const response = await service.post(
      "Doctor/add_clinic_information",
      request
    );
    const { response_code, message, payload } = response.data;
    if (response_code === 2000) {
      cogoToast.success(message, toastOption);
      dispatch(updateClinicInfoSuccess(payload));
      if (callback) {
        callback();
      }
    } else {
      cogoToast.error(message, toastOption);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const updateScheduleInfo = (request, callback) => async (dispatch) => {
  try {
    const response = await service.post("Doctor/add-clinic-schedule", request);
    const { response_code, message, payload } = response.data;
    if (response_code === 2000) {
      cogoToast.success(message, toastOption);
      dispatch(updateClinicInfoSuccess(payload));
      if (callback) {
        callback();
      }
    } else {
      cogoToast.error(message, toastOption);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
