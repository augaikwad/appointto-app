import React, { useReducer, createContext } from "react";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import withContext from "../../hoc/withContext";
import { GlobalContext } from "../Global";
import { applySettingsContextMiddleware } from "./SettingsContextMiddleware";

export const SettingsContext = createContext();

export const actionTypes = {
  GET_PRINTING_SETTING: "GET_PRINTING_SETTING",
  GET_PRINTING_SETTING_SUCCESS: "GET_PRINTING_SETTING_SUCCESS",
  ADD_PRINTING_SETTING: "ADD_PRINTING_SETTING",
  UPDATE_PRINTING_SETTING: "UPDATE_PRINTING_SETTING",
  SET_ADD_EDIT_USER_MODAL: "SET_ADD_EDIT_USER_MODAL",
  GET_USER_ROLES: "GET_USER_ROLES",
  GET_USER_ROLES_SUCCESS: "GET_USER_ROLES_SUCCESS",
};

const initialState = {
  prescriptionMargins: {
    hearder_margin: 0,
    footer_margin: 0,
    left_margin: 0,
    right_margin: 0,
  },
  addEditUserModal: {
    isAdd: true,
    formData: {},
    open: false,
    step: 0,
  },
  userRoles: [],
};

export const reducer = (globalState) => (state, action) => {
  switch (action.type) {
    case actionTypes.GET_PRINTING_SETTING_SUCCESS: {
      return {
        ...state,
        prescriptionMargins: action.payload,
      };
    }
    case actionTypes.SET_ADD_EDIT_USER_MODAL: {
      if (!action.modalData.open) {
        return {
          ...state,
          addEditUserModal: initialState.addEditUserModal,
        };
      }
      return { ...state, addEditUserModal: action.modalData };
    }
    case actionTypes.GET_USER_ROLES_SUCCESS: {
      return {
        ...state,
        userRoles: action.payload,
      };
    }
    default:
      return state;
  }
};

export const useActions = (state, dispatch) => ({
  getPrintingSetting: () => {
    dispatch({
      type: actionTypes.GET_PRINTING_SETTING,
    });
  },
  addPrintingSetting: (req, callback) => {
    dispatch({
      type: actionTypes.ADD_PRINTING_SETTING,
      request: req,
      callback: callback,
    });
  },
  updatePrintingSetting: (req, callback) => {
    dispatch({
      type: actionTypes.UPDATE_PRINTING_SETTING,
      request: req,
      callback: callback,
    });
  },
  setAddEditUserModal: (opt) => {
    dispatch({
      type: actionTypes.SET_ADD_EDIT_USER_MODAL,
      modalData: { ...state.addEditUserModal, ...opt },
    });
  },
  getUserRoles: () => {
    dispatch({
      type: actionTypes.GET_USER_ROLES,
    });
  },
});

const SettingsContextProvider = (props) => {
  const [state, dispatch] = useReducer(
    reducer(props.globalState),
    initialState
  );
  const actions = useActions(
    state,
    applySettingsContextMiddleware(
      dispatch,
      props.history,
      props.globalActions
    ),
    props.globalActions
  );
  return (
    <SettingsContext.Provider value={[state, actions]}>
      {props.children}
    </SettingsContext.Provider>
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
)(SettingsContextProvider);
