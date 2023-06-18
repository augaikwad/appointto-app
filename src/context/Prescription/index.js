import React, { useReducer, createContext } from "react";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import withContext from "../../hoc/withContext";
import { GlobalContext } from "../Global";
import { applyPrescriptionContextMiddleware } from "./PrescriptionContextMiddleware";
import { tagsCategory } from "../../utils/constants";
import moment from "moment";

export const PrescriptionContext = createContext();

export const actionTypes = {
  SAVE_UPDATE_TAG: "SAVE_UPDATE_TAG",
  GET_COMPLAINTS: "GET_COMPLAINTS",
  GET_COMPLAINTS_SUCCESS: "GET_COMPLAINTS_SUCCESS",
  GET_OBSERVATIONS: "GET_OBSERVATIONS",
  GET_OBSERVATIONS_SUCCESS: "GET_OBSERVATIONS_SUCCESS",
  GET_DIAGNOSIS: "GET_DIAGNOSIS",
  GET_DIAGNOSIS_SUCCESS: "GET_DIAGNOSIS_SUCCESS",
  GET_WORKDONE: "GET_WORKDONE",
  GET_WORKDONE_SUCCESS: "GET_WORKDONE_SUCCESS",
  GET_ADVICES: "GET_ADVICES",
  GET_ADVICES_SUCCESS: "GET_ADVICES_SUCCESS",
  GET_INVESTIGATIONS: "GET_INVESTIGATIONS",
  GET_INVESTIGATIONS_SUCCESS: "GET_INVESTIGATIONS_SUCCESS",
  GET_ADVICE_GROUP: "GET_ADVICE_GROUP",
  GET_ADVICE_GROUP_SUCCESS: "GET_ADVICE_GROUP_SUCCESS",
  SAVE_ADVICE_GROUP: "SAVE_ADVICE_GROUP",
  GET_INVESTIGATIONS_GROUP: "GET_INVESTIGATIONS_GROUP",
  GET_INVESTIGATIONS_GROUP_SUCCESS: "GET_INVESTIGATIONS_GROUP_SUCCESS",
  SAVE_INVESTIGATIONS_GROUP: "SAVE_INVESTIGATIONS_GROUP",
  GET_DOCTOR_MEDICINES: "GET_DOCTOR_MEDICINES",
  GET_DOCTOR_MEDICINES_SUCCESS: "GET_DOCTOR_MEDICINES_SUCCESS",
  SEARCH_MEDICINES: "SEARCH_MEDICINES",
  SEARCH_MEDICINES_SUCCESS: "SEARCH_MEDICINES_SUCCESS",
  SAVE_PRESCRIPTION: "SAVE_PRESCRIPTION",
  GET_PRESCRIPTIONS: "GET_PRESCRIPTIONS",
  GET_PRESCRIPTIONS_SUCCESS: "GET_PRESCRIPTIONS_SUCCESS",
  SAVE_RX_GROUP: "SAVE_RX_GROUP",
  GET_RX_GROUPS: "GET_RX_GROUPS",
  GET_RX_GROUPS_SUCCESS: "GET_RX_GROUPS_SUCCESS",
  SET_PREVIOUS_PRESCRIPTION: "SET_PREVIOUS_PRESCRIPTION",
};

const initialState = {
  adviceGroup: [],
  investigationsGroup: [],
  complaints: [],
  observations: [],
  diagnosis: [],
  workdone: [],
  advices: [],
  investigations: [],
  doctorMedicines: [],
  medicines: [],
  prescriptionForm: {
    prescriptionId: 0,
    bp: "",
    tempratureInFahrenhiet: "",
    oxizenSaturation: "",
    lstcomplaints: [],
    lstobservations: [],
    lstdiagnosis: [],
    lstworkDone: [],
    lstadvice: [],
    lstinvestigations: [],
    nextVisitAfter: 7,
    nextVisitUnit: "Days",
    nextVisitDate: new Date(moment().add(7, "days")),
  },
  allPrescriptions: [],
  rxGroups: [],
};

export const reducer = (globalState) => (state, action) => {
  switch (action.type) {
    case actionTypes.GET_ADVICE_GROUP_SUCCESS: {
      return { ...state, adviceGroup: action.payload };
    }
    case actionTypes.GET_INVESTIGATIONS_GROUP_SUCCESS: {
      return { ...state, investigationsGroup: action.payload };
    }
    case actionTypes.GET_COMPLAINTS_SUCCESS: {
      return { ...state, complaints: action.payload };
    }
    case actionTypes.GET_OBSERVATIONS_SUCCESS: {
      return { ...state, observations: action.payload };
    }
    case actionTypes.GET_DIAGNOSIS_SUCCESS: {
      return { ...state, diagnosis: action.payload };
    }
    case actionTypes.GET_WORKDONE_SUCCESS: {
      return { ...state, workdone: action.payload };
    }
    case actionTypes.GET_ADVICES_SUCCESS: {
      return { ...state, advices: action.payload };
    }
    case actionTypes.GET_INVESTIGATIONS_SUCCESS: {
      return { ...state, investigations: action.payload };
    }
    case actionTypes.GET_DOCTOR_MEDICINES_SUCCESS: {
      return { ...state, doctorMedicines: action.payload };
    }
    case actionTypes.SEARCH_MEDICINES_SUCCESS: {
      return { ...state, medicines: action.payload };
    }
    case actionTypes.GET_PRESCRIPTIONS_SUCCESS: {
      return { ...state, allPrescriptions: action.payload };
    }
    case actionTypes.GET_RX_GROUPS_SUCCESS: {
      return { ...state, rxGroups: action.payload };
    }
    default:
      return state;
  }
};

export const useActions = (state, dispatch) => ({
  getAdviceGroup: () => {
    dispatch({
      type: actionTypes.GET_ADVICE_GROUP,
    });
  },
  saveAdviceGroup: (req, callback) => {
    dispatch({
      type: actionTypes.SAVE_ADVICE_GROUP,
      request: req,
      callback: callback,
    });
  },
  getInvestigationsGroup: () => {
    dispatch({
      type: actionTypes.GET_INVESTIGATIONS_GROUP,
    });
  },
  saveInvestigationsGroup: (req, callback) => {
    dispatch({
      type: actionTypes.SAVE_INVESTIGATIONS_GROUP,
      request: req,
      callback: callback,
    });
  },
  saveUpdateTag: (category, req, callback) => {
    dispatch({
      type: actionTypes.SAVE_UPDATE_TAG,
      category: tagsCategory[category],
      request: req,
      callback: callback,
    });
  },
  getComplaints: () => {
    dispatch({
      type: actionTypes.GET_COMPLAINTS,
    });
  },
  getObservations: () => {
    dispatch({
      type: actionTypes.GET_OBSERVATIONS,
    });
  },
  getDiagnosis: () => {
    dispatch({
      type: actionTypes.GET_DIAGNOSIS,
    });
  },
  getWorkDone: () => {
    dispatch({
      type: actionTypes.GET_WORKDONE,
    });
  },
  getAdvices: () => {
    dispatch({
      type: actionTypes.GET_ADVICES,
    });
  },
  getInvestigations: () => {
    dispatch({
      type: actionTypes.GET_INVESTIGATIONS,
    });
  },
  getDoctorMedicines: () => {
    dispatch({
      type: actionTypes.GET_DOCTOR_MEDICINES,
    });
  },
  searchMedicines: (key) => {
    dispatch({
      type: actionTypes.SEARCH_MEDICINES,
      key: key,
    });
  },
  savePrescription: (req, callback) => {
    dispatch({
      type: actionTypes.SAVE_PRESCRIPTION,
      request: req,
      callback: callback,
    });
  },
  getPrescriptions: (req) => {
    dispatch({
      type: actionTypes.GET_PRESCRIPTIONS,
      request: req,
    });
  },
  saveRxGroup: (req, callback) => {
    dispatch({
      type: actionTypes.SAVE_RX_GROUP,
      request: req,
      callback: callback,
    });
  },
  getRxGroups: (callback) => {
    dispatch({
      type: actionTypes.GET_RX_GROUPS,
      callback: callback,
    });
  },
  setPreviousPrescription: (rxGroupId, callback) => {
    dispatch({
      type: actionTypes.SET_PREVIOUS_PRESCRIPTION,
      rxGroupId,
      callback: callback,
    });
  },
});

const PrescriptionContextProvider = (props) => {
  const [state, dispatch] = useReducer(
    reducer(props.globalState),
    initialState
  );
  const actions = useActions(
    state,
    applyPrescriptionContextMiddleware(
      dispatch,
      props.history,
      props.globalActions
    ),
    props.globalActions
  );
  return (
    <PrescriptionContext.Provider value={[state, actions]}>
      {props.children}
    </PrescriptionContext.Provider>
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
)(PrescriptionContextProvider);
