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

export const getSpeciality = () => async (dispatch) => {
  try {
    const response = await service.get("Doctor/get_speciality");
    const { response_code, payload } = response.data;
    if (response_code === 2000) {
      dispatch(setSpeciality(payload));
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const getOTP = (request) => async (dispatch) => {
  try {
    const response = await service.post("Registration/generate-otp", request, {
      silent: false,
      showNotification: true,
    });
    const { response_code, payload } = response.data;
    if (response_code === 2000) {
      dispatch(setOTPData(payload));
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const verifyOTP = (request, history) => async (dispatch) => {
  try {
    const response = await service.post("Registration/verify-otp", request, {
      silent: false,
      showNotification: true,
    });
    const { response_code, payload } = response.data;
    if (response_code === 2000) {
      sessionStorage.setItem("token", payload.registration_token);
      dispatch(setVerifyOTPData(payload));
      if (request.hasOwnProperty("otp_for") && request["otp_for"] === 0) {
        history.push(`/signup`);
        // dispatch(navigateTo({ pathname: "/signup" }));
      }
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const getOTPForResetPassword = (request) => async (dispatch) => {
  try {
    const response = await service.post(
      "Registration/reset-password-generate-otp",
      request,
    );
    const { response_code, payload } = response.data;
    if (response_code === 2000) {
      dispatch(setOTPData(payload));
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const resendOTP = (request) => async (dispatch) => {
  try {
    const response = await service.post("Registration/resend-otp", request);
    const { response_code, payload } = response.data;
    if (response_code === 2000) {
      dispatch(setOTPData(payload));
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const resetPassword = (request, callback) => async (dispatch) => {
  try {
    const response = await service.post("Registration/reset-password", request);
    const { response_code } = response.data;
    if (response_code === 2000) {
      dispatch(resetPasswordSuccess());
      if (callback) {
        callback();
      }
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const signupUser = (request, history) => async (dispatch) => {
  try {
    const response = await service.post("Registration/register-user", request, {
      silent: false,
      showNotification: true,
    });
    const { response_code, payload } = response.data;
    if (response_code === 2000) {
      sessionStorage.setItem("token", payload.token);
      dispatch(setSignupUserData(request));
      history.push(`/registration`);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const getQualifications = () => async (dispatch) => {
  try {
    const response = await service.get("Doctor/get_qualifications");
    const { response_code, payload } = response.data;
    if (response_code === 2000) {
      dispatch(setQualifications(payload));
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const updateDoctorInfo = (request, callback) => async (dispatch) => {
  try {
    const response = await service.post("Doctor/Create", request, {
      silent: false,
      showNotification: true,
    });
    const { response_code, payload } = response.data;
    if (response_code === 2000) {
      dispatch(updateDoctorInfoSuccess(payload));
      if (callback) {
        callback();
      }
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const updateClinicInfo = (request, callback) => async (dispatch) => {
  try {
    const response = await service.post(
      "Doctor/add_clinic_information",
      request,
      {
        silent: false,
        showNotification: true,
      },
    );
    const { response_code, payload } = response.data;
    if (response_code === 2000) {
      dispatch(updateClinicInfoSuccess(payload));
      if (callback) {
        callback();
      }
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const updateScheduleInfo = (request, callback) => async (dispatch) => {
  try {
    const response = await service.post("Doctor/add-clinic-schedule", request, {
      silent: false,
      showNotification: true,
    });
    const { response_code, payload } = response.data;
    if (response_code === 2000) {
      dispatch(updateClinicInfoSuccess(payload));
      if (callback) {
        callback();
      }
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
