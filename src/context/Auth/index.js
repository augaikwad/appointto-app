import React, { useReducer, createContext } from "react";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import withContext from "../../hoc/withContext";
import { GlobalContext } from "../Global";

import { applyAuthContextMiddleware } from "./AuthContextMiddleware";

export const AuthContext = createContext();

export const actionTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

const initialState = {};

export const reducer = (globalState) => (state, action) => {
  switch (action.type) {
    //   case actionTypes.GET_OTP_SUCCESS:
    //     return { ...state, otpData: action.payload };
    default:
      return state;
  }
};

export const useActions = (state, dispatch) => ({
  login: (req) => {
    dispatch({
      type: actionTypes.LOGIN,
      request: req,
    });
  },
  logout: (req) => {
    dispatch({
      type: actionTypes.LOGOUT,
      request: req,
    });
  },
});

const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(
    reducer(props.globalState),
    initialState
  );
  const actions = useActions(
    state,
    applyAuthContextMiddleware(dispatch, props.history, props.globalActions),
    props.globalActions
  );
  return (
    <AuthContext.Provider value={[state, actions]}>
      {props.children}
    </AuthContext.Provider>
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
)(AuthContextProvider);
