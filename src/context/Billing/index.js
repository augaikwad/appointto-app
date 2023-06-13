import React, { useReducer, createContext } from "react";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import withContext from "../../hoc/withContext";
import { GlobalContext } from "../Global";

import { applyBillingContextMiddleware } from "./BillingContextMiddleware";

export const BillingContext = createContext();

export const actionTypes = {
  GET_TREATMENT_LIST: "GET_TREATMENT_LIST",
  GET_TREATMENT_LIST_SUCCESS: "GET_TREATMENT_LIST_SUCCESS",
  GET_ALL_BILL_DATA_LIST: "GET_ALL_BILL_DATA_LIST",
  GET_ALL_BILL_DATA_LIST_SUCCESS: "GET_ALL_BILL_DATA_LIST_SUCCESS",
  SET_BILL_MODAL_OPEN: "SET_BILL_MODAL_OPEN",
  SET_BILL_FORM_DATA: "SET_BILL_FORM_DATA",
  CREATE_BILL: "CREATE_BILL",
  UPDATE_BILL: "UPDATE_BILL",
  DELETE_BILL: "DELETE_BILL",
  GET_BILL_SUMMARY: "GET_BILL_SUMMARY",
  GET_BILL_SUMMARY_SUCCESS: "GET_BILL_SUMMARY_SUCCESS",
  ADD_PAYMENT: "ADD_PAYMENT",
  SET_PAYMENT_MODAL_OPEN: "SET_PAYMENT_MODAL_OPEN",
  SET_PAYMENT_MODAL_FORM: "SET_PAYMENT_MODAL_FORM",
  SAVE_TREATMENT: "SAVE_TREATMENT",
};

const initialState = {
  isBillModalOpen: false,
  billForm: {
    bill_id: 0,
    id_doctor: localStorage.getItem("id_doctor"),
    bill_date: new Date(),
    quantity: 1,
    discount_type: 0,
    payment_mode: "cash",
  },
  isPaymentModalOpen: false,
  paymentModalForm: {
    bill_transaction_id: 0,
    amount: "",
    payment_mode: "cash",
  },
  treatmentList: [],
  allBillData: [],
  billSummary: {
    id_doctor: 0,
    id_patient: 0,
    id_clinic: 0,
    totalBillAmount: 0,
    balanceBillAmount: 0,
  },
};

export const reducer = (globalState) => (state, action) => {
  switch (action.type) {
    case actionTypes.GET_TREATMENT_LIST_SUCCESS:
      return { ...state, treatmentList: action.payload };
    case actionTypes.GET_ALL_BILL_DATA_LIST_SUCCESS:
      return { ...state, allBillData: action.payload };
    case actionTypes.SET_BILL_MODAL_OPEN:
      return { ...state, isBillModalOpen: action.open };
    case actionTypes.SET_BILL_FORM_DATA:
      return { ...state, billForm: action.formData };
    case actionTypes.SET_PAYMENT_MODAL_OPEN:
      return { ...state, isPaymentModalOpen: action.open };
    case actionTypes.SET_PAYMENT_MODAL_FORM:
      return { ...state, paymentModalForm: action.formData };
    case actionTypes.GET_BILL_SUMMARY_SUCCESS:
      return { ...state, billSummary: action.payload };
    default:
      return state;
  }
};

export const useActions = (state, dispatch) => ({
  setBillModalOpen: (open) => {
    dispatch({
      type: actionTypes.SET_BILL_MODAL_OPEN,
      open: open,
    });
  },
  setBillForm: (formData) => {
    dispatch({
      type: actionTypes.SET_BILL_FORM_DATA,
      formData: formData,
    });
  },
  setPaymentModalOpen: (open) => {
    dispatch({
      type: actionTypes.SET_PAYMENT_MODAL_OPEN,
      open: open,
    });
  },
  setPaymentModalForm: (formData) => {
    dispatch({
      type: actionTypes.SET_PAYMENT_MODAL_FORM,
      formData: { ...state.paymentModalForm, ...formData },
    });
  },
  getTreatmentList: () => {
    dispatch({
      type: actionTypes.GET_TREATMENT_LIST,
    });
  },
  getAllBillData: (req) => {
    dispatch({
      type: actionTypes.GET_ALL_BILL_DATA_LIST,
      request: req,
    });
  },
  createBill: (req, callback) => {
    dispatch({
      type: actionTypes.CREATE_BILL,
      request: req,
      callback: callback,
    });
  },
  updateBill: (req, callback) => {
    dispatch({
      type: actionTypes.UPDATE_BILL,
      request: req,
      callback: callback,
    });
  },
  deleteBill: (req, callback) => {
    dispatch({
      type: actionTypes.DELETE_BILL,
      request: req,
      callback: callback,
    });
  },
  getBillSummary: (req) => {
    dispatch({
      type: actionTypes.GET_BILL_SUMMARY,
      request: req,
    });
  },
  addPayment: (req, callback) => {
    dispatch({
      type: actionTypes.ADD_PAYMENT,
      request: req,
      callback: callback,
    });
  },
  saveTreatment: (req, callback) => {
    dispatch({
      type: actionTypes.SAVE_TREATMENT,
      request: req,
      callback: callback,
    });
  },
});

const BillingContextProvider = (props) => {
  const [state, dispatch] = useReducer(
    reducer(props.globalState),
    initialState
  );
  const actions = useActions(
    state,
    applyBillingContextMiddleware(dispatch, props.history, props.globalActions),
    props.globalActions
  );
  return (
    <BillingContext.Provider value={[state, actions]}>
      {props.children}
    </BillingContext.Provider>
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
)(BillingContextProvider);
