import React, { useReducer, createContext } from "react";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import withContext from "../../hoc/withContext";
import { GlobalContext } from "../Global";
import { applyAppointmentContextMiddleware } from "./AppointmentContextMiddleware";

export const AppointmentContext = createContext();

export const actionTypes = {
  CREATE_APPOINTMENT: "CREATE_APPOINTMENT",
  UPDATE_APPOINTMENT: "UPDATE_APPOINTMENT",
  SET_APPOINTMENT_FORM: "SET_APPOINTMENT_FORM",
  SET_APPOINTMENT_MODAL: "SET_APPOINTMENT_MODAL",
  LIST_BY_DOCTOR: "LIST_BY_DOCTOR",
  LIST_BY_DOCTOR_SUCCESS: "LIST_BY_DOCTOR_SUCCESS",
  SET_FILTERS_FOR_LIST_BY_DOCTOR: "SET_FILTERS_FOR_LIST_BY_DOCTOR",
  GET_APPOINTMENT_STATUS_LIST: "GET_APPOINTMENT_STATUS_LIST",
  GET_APPOINTMENT_STATUS_LIST_SUCCESS: "GET_APPOINTMENT_STATUS_LIST_SUCCESS",
  SET_CAN_RESET_SEARCH_BOX: "SET_CAN_RESET_SEARCH_BOX",
};

const initialState = {
  appointmentList: [],
  appointmentCount: 0,
  followUpPatient: 0,
  newPatient: 0,
  queueCount: 0,
  totalCount: 0,
  filters: {
    appointment_date: new Date(),
    id_doctor: parseInt(localStorage.getItem("id_doctor")),
    appointment_status: "0",
  },
  appointmentStatusList: [],
  appointmentModal: {
    isAdd: true,
    show: false,
  },
  appointmentForm: {
    id_appointment: 0,
    id_doctor: parseInt(localStorage.getItem("id_doctor")),
    id_patient: 0,
    date: "",
    day: "",
    start_time: "",
    end_time: "",
    reason: "",
    appointment_status: "",
  },
  canResetSearchBox: false,
};

export const reducer = (globalState) => (state, action) => {
  switch (action.type) {
    case actionTypes.SET_APPOINTMENT_FORM:
      return { ...state, appointmentForm: action.payload };
    case actionTypes.SET_APPOINTMENT_MODAL:
      return { ...state, appointmentModal: action.payload };
    case actionTypes.LIST_BY_DOCTOR_SUCCESS:
      return { ...state, ...action.payload };
    case actionTypes.SET_FILTERS_FOR_LIST_BY_DOCTOR:
      return { ...state, filters: action.filters };
    case actionTypes.GET_APPOINTMENT_STATUS_LIST_SUCCESS:
      return { ...state, appointmentStatusList: action.payload };
    case actionTypes.SET_CAN_RESET_SEARCH_BOX:
      return { ...state, canResetSearchBox: action.payload };
    default:
      return state;
  }
};

export const useActions = (state, dispatch) => ({
  setAppointmentForm: (obj) => {
    dispatch({
      type: actionTypes.SET_APPOINTMENT_FORM,
      payload: { ...state.appointmentForm, ...obj },
    });
  },
  resetAppointmentForm: () => {
    dispatch({
      type: actionTypes.SET_APPOINTMENT_FORM,
      payload: initialState.appointmentForm,
    });
  },
  setAppointmentModal: (obj) => {
    dispatch({
      type: actionTypes.SET_APPOINTMENT_MODAL,
      payload: { ...state.appointmentModal, ...obj },
    });
  },
  createAppointment: (req, callback) => {
    dispatch({
      type: actionTypes.CREATE_APPOINTMENT,
      request: req,
      callback: callback,
    });
  },
  updateAppointment: (req, callback) => {
    dispatch({
      type: actionTypes.UPDATE_APPOINTMENT,
      request: req,
      callback: callback,
    });
  },
  getAppointmentByDoctor: () => {
    dispatch({
      type: actionTypes.LIST_BY_DOCTOR,
      request: state.filters,
    });
  },
  setFilters: (filters) => {
    dispatch({
      type: actionTypes.SET_FILTERS_FOR_LIST_BY_DOCTOR,
      filters: { ...state.filters, ...filters },
    });
    dispatch({
      type: actionTypes.LIST_BY_DOCTOR,
      request: { ...state.filters, ...filters },
    });
  },
  getAppointmentStatusList: () => {
    dispatch({
      type: actionTypes.GET_APPOINTMENT_STATUS_LIST,
    });
  },
  setCanResetSearchBox: (val) => {
    dispatch({
      type: actionTypes.SET_CAN_RESET_SEARCH_BOX,
      payload: val,
    });
  },
});

const AppointmentContextProvider = (props) => {
  const [state, dispatch] = useReducer(
    reducer(props.globalState),
    initialState
  );
  const actions = useActions(
    state,
    applyAppointmentContextMiddleware(
      dispatch,
      props.history,
      props.globalActions
    ),
    props.globalActions
  );
  return (
    <AppointmentContext.Provider value={[state, actions]}>
      {props.children}
    </AppointmentContext.Provider>
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
)(AppointmentContextProvider);
