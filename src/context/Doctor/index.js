import React, { useReducer, createContext } from "react";
import { compose } from "recompose";
import { applyDoctorContextMiddleware } from "./DoctorContextMiddleware";
import { withRouter } from "react-router-dom";
import withContext from "../../hoc/withContext";
import { GlobalContext } from "../Global";

export const DoctorContext = createContext();

export const actionTypes = {
  GET_OTP: "GET_OTP",
  GET_OTP_SUCCESS: "GET_OTP_SUCCESS",
  GET_RESEND_OTP: "GET_RESEND_OTP",
  VERIFY_OTP: "VERIFY_OTP",
  VERIFY_OTP_SUCCESS: "VERIFY_OTP_SUCCESS",
  SIGNUP_USER: "SIGNUP_USER",
  SIGNUP_USER_SUCCESS: "SIGNUP_USER_SUCCESS",
};

const initialState = {
  otpData: null,
  verifyOTPData: null,
};

export const reducer = (globalState) => (state, action) => {
  switch (action.type) {
    case actionTypes.GET_OTP_SUCCESS:
      return { ...state, otpData: action.payload };
    case actionTypes.VERIFY_OTP_SUCCESS:
      return { ...state, verifyOTPData: action.payload };
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
  signupUser: (req) => {
    console.log("signupUser === ", req);
    dispatch({
      type: actionTypes.SIGNUP_USER,
      request: req,
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
