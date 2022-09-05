import React, { useReducer, createContext } from "react";
import { applyGlobalContextMiddleware } from "./GlobalContextMiddleware";
import { withRouter } from "react-router-dom";

export const GlobalContext = createContext();

export const actionTypes = {
  SUCCESS: "GLOBAL/SUCCESS",
  FAILURE: "GLOBAL/FAILURE",
  CLEAR_GENERIC_RESPONSE: "GLOBAL/CLEAR_GENERIC_RESPONSE",
  SET_LOADING_INDICATOR: "GLOBAL/SET_LOADING_INDICATOR",
};

const initialState = {
  loading: false,
  error: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING_INDICATOR:
      return { ...state, loading: action.value, error: null };
    case actionTypes.CLEAR_GENERIC_RESPONSE:
      return { ...state, loading: false, error: null, successMessage: null };
    case actionTypes.FAILURE:
      return { ...state, loading: false, error: action.error };
    case actionTypes.SUCCESS:
      return { ...state, loading: false, successMessage: action.message };
    default:
      return state;
  }
};

export const useActions = (state, dispatch) => ({
  setLoadingIndicator: (value) => {
    dispatch({
      type: actionTypes.SET_LOADING_INDICATOR,
      value: value,
    });
  },
  setError: (error) => {
    dispatch({
      type: actionTypes.FAILURE,
      error: error,
    });
  },
  setSuccess: (successMessage) => {
    dispatch({
      type: actionTypes.SUCCESS,
      message: successMessage,
    });
  },
  clearGenericResponse: () => {
    dispatch({
      type: actionTypes.CLEAR_GENERIC_RESPONSE,
    });
  },
});

const GlobalContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = useActions(
    state,
    applyGlobalContextMiddleware(dispatch, props.history)
  );
  return (
    <GlobalContext.Provider value={[state, actions]}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default withRouter(GlobalContextProvider);
