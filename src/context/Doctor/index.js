import React, { useReducer, createContext } from "react";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import withContext from "../../hoc/withContext";
import { GlobalContext } from "../Global";
import { applyDoctorContextMiddleware } from "./DoctorContextMiddleware";

export const DoctorContext = createContext();

export const actionTypes = {
  GET_OTP: "GET_OTP",
  GET_OTP_RESET_PASSWORD: "GET_OTP_RESET_PASSWORD",
  GET_OTP_SUCCESS: "GET_OTP_SUCCESS",
  GET_RESEND_OTP: "GET_RESEND_OTP",
  VERIFY_OTP: "VERIFY_OTP",
  VERIFY_OTP_SUCCESS: "VERIFY_OTP_SUCCESS",
  RESET_PASSWORD: "RESET_PASSWORD",
  RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS",
  SIGNUP_USER: "SIGNUP_USER",
  SIGNUP_USER_SUCCESS: "SIGNUP_USER_SUCCESS",
  SET_REGISTRATION_ACTIVE_TAB: "SET_CURRENT_REGISTRATION_TAB",
  GET_SPECIALITY: "GET_SPECIALITY",
  GET_SPECIALITY_SUCCESS: "GET_SPECIALITY_SUCCESS",
  GET_QUALIFICATIONS: "GET_QUALIFICATIONS",
  GET_QUALIFICATIONS_SUCCESS: "GET_QUALIFICATIONS_SUCCESS",
  UPDATE_DOCTOR_INFO: "UPDATE_DOCTOR_INFO",
  UPDATE_DOCTOR_INFO_SUCCESS: "UPDATE_DOCTOR_INFO_SUCCESS",
  UPDATE_CLINIC_INFO: "UPDATE_CLINIC_INFO",
  UPDATE_CLINIC_INFO_SUCCESS: "UPDATE_CLINIC_INFO_SUCCESS",
  UPDATE_SCHEDULE_INFO: "UPDATE_SCHEDULE_INFO",
  UPDATE_SCHEDULE_INFO_SUCCESS: "UPDATE_SCHEDULE_INFO_SUCCESS",
  GET_APPOINTMENTS_LIST_BY_DOCTOR: "GET_APPOINTMENTS_LIST_BY_DOCTOR",
  GET_APPOINTMENTS_LIST_BY_DOCTOR_SUCCESS:
    "GET_APPOINTMENTS_LIST_BY_DOCTOR_SUCCESS",
  GET_DOCTORS_BY_CLINIC_ID: "GET_DOCTORS_BY_CLINIC_ID",
  GET_DOCTORS_BY_CLINIC_ID_SUCCESS: "GET_DOCTORS_BY_CLINIC_ID_SUCCESS",
  RESET_OTP_DATA: "RESET_OTP_DATA",
};

const initialState = {
  otpData: null,
  verifyOTPData: null,
  signupUserData: null,
  registrationActiveTab: 0,
  speciality: [],
  qualifications: [],
  doctorInfo: null,
  clinicInfo: null,
  appointmentsByDoctor: [],
  doctorsByClinicId: [],
  forgetPasswordStep: 1,
};

export const reducer = (globalState) => (state, action) => {
  switch (action.type) {
    case actionTypes.GET_OTP_SUCCESS:
      return {
        ...state,
        otpData: action.payload,
        forgetPasswordStep: state.forgetPasswordStep + 1,
      };
    case actionTypes.VERIFY_OTP_SUCCESS:
      return {
        ...state,
        verifyOTPData: action.payload,
        forgetPasswordStep: state.forgetPasswordStep + 1,
      };
    case actionTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        otpData: initialState.otpData,
        verifyOTPData: initialState.verifyOTPData,
        forgetPasswordStep: initialState.forgetPasswordStep,
      };
    case actionTypes.SIGNUP_USER_SUCCESS:
      return { ...state, signupUserData: action.payload };
    case actionTypes.SET_REGISTRATION_ACTIVE_TAB:
      return { ...state, registrationActiveTab: action.payload };
    case actionTypes.GET_QUALIFICATIONS_SUCCESS:
      return { ...state, qualifications: action.payload };
    case actionTypes.GET_SPECIALITY_SUCCESS:
      return { ...state, speciality: action.payload };
    case actionTypes.UPDATE_DOCTOR_INFO_SUCCESS:
      return { ...state, doctorInfo: action.payload };
    case actionTypes.UPDATE_CLINIC_INFO_SUCCESS:
      return { ...state, clinicInfo: action.payload };
    case actionTypes.GET_APPOINTMENTS_LIST_BY_DOCTOR_SUCCESS:
      return { ...state, appointmentsByDoctor: action.payload };
    case actionTypes.GET_DOCTORS_BY_CLINIC_ID_SUCCESS:
      return { ...state, doctorsByClinicId: action.payload };
    case actionTypes.RESET_OTP_DATA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const useActions = (state, dispatch) => ({
  getOTP: (req) => {
    dispatch({
      type: actionTypes.GET_OTP,
      request: req,
    });
  },
  getOTPForResetPassword: (req) => {
    dispatch({
      type: actionTypes.GET_OTP_RESET_PASSWORD,
      request: req,
    });
  },
  resendOTP: (req) => {
    dispatch({
      type: actionTypes.GET_RESEND_OTP,
      request: req,
    });
  },
  verifyOTP: (req) => {
    dispatch({
      type: actionTypes.VERIFY_OTP,
      request: req,
    });
  },
  resetOTPData: () => {
    dispatch({
      type: actionTypes.RESET_OTP_DATA,
      payload: {
        otpData: initialState.otpData,
        verifyOTPData: initialState.verifyOTPData,
        signupUserData: initialState.signupUserData,
        forgetPasswordStep: 1,
      },
    });
  },
  resetPassword: (req, callback) => {
    dispatch({
      type: actionTypes.RESET_PASSWORD,
      request: req,
      callback: callback,
    });
  },
  signupUser: (req) => {
    dispatch({
      type: actionTypes.SIGNUP_USER,
      request: req,
    });
  },
  setRegistrationActiveTab: (activeTab) => {
    dispatch({
      type: actionTypes.SET_REGISTRATION_ACTIVE_TAB,
      payload: activeTab,
    });
  },
  getQualifications: () => {
    dispatch({
      type: actionTypes.GET_QUALIFICATIONS,
    });
  },
  getSpeciality: () => {
    dispatch({
      type: actionTypes.GET_SPECIALITY,
    });
  },
  updateDoctorInfo: (req, callback) => {
    dispatch({
      type: actionTypes.UPDATE_DOCTOR_INFO,
      request: req,
      callback: callback,
    });
  },
  updateClinicInfo: (req, callback) => {
    dispatch({
      type: actionTypes.UPDATE_CLINIC_INFO,
      request: req,
      callback: callback,
    });
  },
  updateScheduleInfo: (req, callback) => {
    dispatch({
      type: actionTypes.UPDATE_SCHEDULE_INFO,
      request: req,
      callback: callback,
    });
  },
  getDoctorsByClinicId: (id, callback) => {
    dispatch({
      type: actionTypes.GET_DOCTORS_BY_CLINIC_ID,
      id: id,
      callback: callback,
    });
  },
});

const DoctorContextProvider = (props) => {
  const [state, dispatch] = useReducer(
    reducer(props.globalState),
    initialState
  );
  const actions = useActions(
    state,
    applyDoctorContextMiddleware(dispatch, props.history, props.globalActions),
    props.globalActions
  );
  return (
    <DoctorContext.Provider value={[state, actions]}>
      {props.children}
    </DoctorContext.Provider>
  );
};

const mapStateToProps = (state) => {
  return { globalState: state };
};

const mapActionsToProps = (actions) => {
  return {
    globalActions: {
      setLoadingIndicator: (value) => actions.setLoadingIndicator(value),
      setError: (error) => actions.setError(error),
      setSuccess: (message) => actions.setSuccess(message),
    },
  };
};

export default compose(
  withContext(GlobalContext, mapStateToProps, mapActionsToProps),
  withRouter
)(DoctorContextProvider);
