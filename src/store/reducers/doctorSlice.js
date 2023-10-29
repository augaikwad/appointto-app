import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  otpData: null,
  verifyOTPData: null,
  signupUserData: null,
  registrationActiveTab: 0,
  doctorInfo: null,
  clinicInfo: null,
  forgetPasswordStep: 1,

  appointmentsByDoctor: [],
  qualifications: [],
  speciality: [],
};

const doctorSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    setOTPData: (state, action) => {
      state.otpData = action.payload;
      state.forgetPasswordStep = state.forgetPasswordStep + 1;
    },
    setVerifyOTPData: (state, action) => {
      state.verifyOTPData = action.payload;
      state.forgetPasswordStep = state.forgetPasswordStep + 1;
    },
    setSpeciality: (state, action) => {
      state.speciality = action.payload;
    },
    resetPasswordSuccess: (state, action) => {
      state.otpData = initialState.otpData;
      state.verifyOTPData = initialState.verifyOTPData;
      state.forgetPasswordStep = initialState.forgetPasswordStep;
    },
    setSignupUserData: (state, action) => {
      state.signupUserData = action.payload;
    },
    setRegistrationActiveTab: (state, action) => {
      state.registrationActiveTab = action.payload;
    },
    setQualifications: (state, action) => {
      state.qualifications = action.payload;
    },
    updateDoctorInfoSuccess: (state, action) => {
      state.doctorInfo = action.payload;
    },
    updateClinicInfoSuccess: (state, action) => {
      state.clinicInfo = action.payload;
    },
    resetRegistration: (state, action) => {
      state.otpData = initialState.otpData;
      state.verifyOTPData = initialState.verifyOTPData;
      state.signupUserData = initialState.signupUserData;
      state.forgetPasswordStep = initialState.forgetPasswordStep;
      state.registrationActiveTab = initialState.registrationActiveTab;
      state.doctorInfo = initialState.doctorInfo;
      state.clinicInfo = initialState.clinicInfo;
    },
  },
});

export const {
  setOTPData,
  setVerifyOTPData,
  resetPasswordSuccess,
  setSpeciality,
  setSignupUserData,
  setRegistrationActiveTab,
  setQualifications,
  updateDoctorInfoSuccess,
  updateClinicInfoSuccess,
  resetRegistration,
} = doctorSlice.actions;
export default doctorSlice.reducer;
