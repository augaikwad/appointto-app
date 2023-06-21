import React, { useReducer, createContext } from "react";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import withContext from "../../hoc/withContext";
import { GlobalContext } from "../Global";
import { applyPatientContextMiddleware } from "./PatientContextMiddleware";
import { formattedObjForSetForm } from "../../pages/Patient/AddEditPatient/dataFormatter";

export const PatientContext = createContext();

export const actionTypes = {
  SET_ACTIVE_TAB: "SET_ACTIVE_TAB",
  SET_PROFILE_ACTIVE_TAB: "SET_PROFILE_ACTIVE_TAB",
  ADD_PATIENT_GENERAL_INFO: "ADD_PATIENT_GENERAL_INFO",
  ADD_PATIENT_GENERAL_INFO_SUCCESS: "ADD_PATIENT_GENERAL_INFO_SUCCESS",
  UPDATE_PATIENT_GENERAL_INFO: "UPDATE_PATIENT_GENERAL_INFO",
  UPDATE_PATIENT_GENERAL_INFO_SUCCESS: "UPDATE_PATIENT_GENERAL_INFO_SUCCESS",
  ADD_DOCUMENTS: "ADD_DOCUMENTS",
  ADD_DOCUMENTS_SUCCESS: "ADD_DOCUMENTS_SUCCESS",
  SET_APT_MODAL_OPEN: "SET_APT_MODAL_OPEN",
  SET_APPOINTMENT_FORM_DATA: "SET_APPOINTMENT_FORM_DATA",
  CREATE_APPOINTMENT: "CREATE_APPOINTMENT",
  UPDATE_APPOINTMENT: "UPDATE_APPOINTMENT",
  GET_PATIENT_BY_ID: "GET_PATIENT_BY_ID",
  GET_PATIENT_BY_ID_SUCESS: "GET_PATIENT_BY_ID_SUCESS",
  SET_PATIENT_ID_FOR_CREATE_APPOINTMENT:
    "SET_PATIENT_ID_FOR_CREATE_APPOINTMENT",
  GET_GLOBAL_LIST: "GET_GLOBAL_LIST",
  GET_GLOBAL_LIST_SUCCESS: "GET_GLOBAL_LIST_SUCCESS",
  SET_PATIENT_MODAL: "SET_PATIENT_MODAL",
  SET_TERMS_OPTIONS: "SET_TERMS_OPTIONS",
};

const initialState = {
  activeTab: 0,
  profileActiveTab: 0,
  patientModal: {
    open: false,
    isAdd: true,
    formValue: {
      gender: "Male",
      blood_group: "A+ve",
      id_patient: 0,
      first_name: "",
      last_name: "",
      age: "",
      ageType: "Years",
      mobile_number: "",
      email_id: "",
      dob: null,
      address: "",
      area: "",
      city: "",
      state: "",
      pincode: "",
      reffered_by: "",
      emergency_contact: "",
      diet: "veg",
      current_medicine: "",
      medicalPrecondition: "lowBP",
      habbits: "",
      otherInfo: "",
      document_url: "",
    },
  },
  termsOptions: [
    { label: "High BP", value: "highBP" },
    { label: "Low BP", value: "lowBP" },
    { label: "TB", value: "tb" },
    { label: "Asthma", value: "asthma" },
    { label: "Diabetes", value: "diabetes" },
    { label: "Allergies", value: "allergies" },
  ],
  appointmentForm: {
    id_appointment: 0,
    id_patient: 0,
    id_doctor: localStorage.getItem("id_doctor"),
    appointment_status: "",
  },
  patientData: null,
  isAptModalOpen: false,
  patientDocuments: null,
  globalPatientList: [],
};

export const reducer = (globalState) => (state, action) => {
  switch (action.type) {
    case actionTypes.SET_ACTIVE_TAB:
      return { ...state, activeTab: action.tab };
    case actionTypes.SET_PROFILE_ACTIVE_TAB:
      return { ...state, profileActiveTab: action.tab };
    case actionTypes.ADD_PATIENT_GENERAL_INFO_SUCCESS:
    case actionTypes.UPDATE_PATIENT_GENERAL_INFO_SUCCESS:
      const patientModal = { ...state.patientModal };
      patientModal.formValue = action.payload;
      return { ...state, patientModal: patientModal };
    case actionTypes.SET_APT_MODAL_OPEN:
      return { ...state, isAptModalOpen: action.open };
    case actionTypes.SET_APPOINTMENT_FORM_DATA:
      return { ...state, appointmentForm: action.payload };
    case actionTypes.ADD_DOCUMENTS_SUCCESS:
      return { ...state, patientDocuments: action.documents };
    case actionTypes.GET_PATIENT_BY_ID_SUCESS: {
      return { ...state, patientData: action.payload, patient: action.payload };
    }
    case actionTypes.SET_PATIENT_ID_FOR_CREATE_APPOINTMENT: {
      let appointmentForm = { ...state.appointmentForm };
      appointmentForm.id_patient = action.id_patient;
      return { ...state, appointmentForm: appointmentForm };
    }
    case actionTypes.GET_GLOBAL_LIST_SUCCESS: {
      return { ...state, globalPatientList: action.payload };
    }
    case actionTypes.SET_PATIENT_MODAL: {
      if (!action.modalData.open) {
        return {
          ...state,
          patientModal: initialState.patientModal,
          termsOptions: initialState.termsOptions,
        };
      }
      return { ...state, patientModal: action.modalData };
    }
    case actionTypes.SET_TERMS_OPTIONS: {
      return { ...state, termsOptions: action.options };
    }
    case actionTypes.default:
      return state;
  }
};

export const useActions = (state, dispatch) => ({
  setPatientModal: (modal) => {
    dispatch({
      type: actionTypes.SET_PATIENT_MODAL,
      modalData: { ...state.patientModal, ...modal },
    });
  },
  setActiveTab: (tab) => {
    dispatch({
      type: actionTypes.SET_ACTIVE_TAB,
      tab: tab,
    });
  },
  setProfileActiveTab: (tab) => {
    dispatch({
      type: actionTypes.SET_PROFILE_ACTIVE_TAB,
      tab: tab,
    });
  },
  setAptModalOpen: (open) => {
    dispatch({
      type: actionTypes.SET_APT_MODAL_OPEN,
      open: open,
    });
  },
  addPatientGeneralInfo: (req, callback) => {
    dispatch({
      type: actionTypes.ADD_PATIENT_GENERAL_INFO,
      request: req,
      callback: callback,
    });
  },
  updatePatientGeneralInfo: (req, callback) => {
    dispatch({
      type: actionTypes.UPDATE_PATIENT_GENERAL_INFO,
      request: req,
      callback: callback,
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
  addDocuments: (req, onUploadProgress, callback) => {
    dispatch({
      type: actionTypes.ADD_DOCUMENTS,
      request: req,
      onUploadProgress: onUploadProgress,
      callback: callback,
    });
  },
  getPatientById: (id, callback) => {
    dispatch({
      type: actionTypes.GET_PATIENT_BY_ID,
      id: id,
      callback: callback,
    });
  },
  setAppointmentFormData: (formData) => {
    dispatch({
      type: actionTypes.SET_APPOINTMENT_FORM_DATA,
      payload: formData,
    });
  },
  getGlobalList: () => {
    dispatch({
      type: actionTypes.GET_GLOBAL_LIST,
    });
  },
  setTermsOptions: (options) => {
    dispatch({
      type: actionTypes.SET_TERMS_OPTIONS,
      options: options,
    });
  },
});

const PatientContextProvider = (props) => {
  const [state, dispatch] = useReducer(
    reducer(props.globalState),
    initialState
  );
  const actions = useActions(
    state,
    applyPatientContextMiddleware(dispatch, props.history, props.globalActions),
    props.globalActions
  );
  return (
    <PatientContext.Provider value={[state, actions]}>
      {props.children}
    </PatientContext.Provider>
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
)(PatientContextProvider);
