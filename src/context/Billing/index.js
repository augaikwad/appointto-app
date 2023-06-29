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
  CREATE_BILL: "CREATE_BILL",
  UPDATE_BILL: "UPDATE_BILL",
  DELETE_BILL: "DELETE_BILL",
  GET_BILL_SUMMARY: "GET_BILL_SUMMARY",
  GET_BILL_SUMMARY_SUCCESS: "GET_BILL_SUMMARY_SUCCESS",
  ADD_PAYMENT: "ADD_PAYMENT",
  SAVE_TREATMENT: "SAVE_TREATMENT",
  SET_BILL_MODAL: "SET_BILL_MODAL",
  SET_PAYMENT_MODAL: "SET_PAYMENT_MODAL",
  GET_TRANSACTION_SUMMARY: "GET_TRANSACTION_SUMMARY",
  GET_TRANSACTION_SUMMARY_SUCCESS: "GET_TRANSACTION_SUMMARY_SUCCESS",
};

export const initialState = {
  billModal: {
    open: false,
    isAdd: true,
    formValue: {
      bill_id: 0,
      id_doctor: localStorage.getItem("id_doctor"),
      bill_date: new Date(),
      doctor_name: "",
      treatment: "",
      quantity: 1,
      rate: "",
      gross_amount: "",
      discount_type: 0,
      amount_received: "",
      payment_mode: "cash",
      discount_value: 0,
    },
  },
  paymentModal: {
    open: false,
    isAdd: true,
    formValue: {
      bill_transaction_id: 0,
      amount: "",
      payment_mode: "cash",
    },
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
  transactionSummary: [],
};

export const reducer = (globalState) => (state, action) => {
  switch (action.type) {
    case actionTypes.GET_TREATMENT_LIST_SUCCESS:
      return { ...state, treatmentList: action.payload };
    case actionTypes.GET_ALL_BILL_DATA_LIST_SUCCESS:
      return { ...state, allBillData: action.payload };
    case actionTypes.GET_BILL_SUMMARY_SUCCESS:
      return {
        ...state,
        billSummary:
          action.payload === null ? initialState.billSummary : action.payload,
      };
    case actionTypes.SET_BILL_MODAL:
      let billModalData = action.billModal;
      if (!action.billModal.open) {
        billModalData = initialState.billModal;
      }
      return { ...state, billModal: billModalData };
    case actionTypes.SET_PAYMENT_MODAL:
      let modalData = action.modal;
      if (!action.modal.open) {
        modalData = initialState.paymentModal;
      }
      return { ...state, paymentModal: modalData };
    case actionTypes.GET_TRANSACTION_SUMMARY_SUCCESS:
      return {
        ...state,
        transactionSummary: action.payload === null ? [] : action.payload,
      };
    default:
      return state;
  }
};

export const useActions = (state, dispatch) => ({
  setBillModal: (modal) => {
    dispatch({
      type: actionTypes.SET_BILL_MODAL,
      billModal: { ...state.billModal, ...modal },
    });
  },
  setPaymentModal: (modal) => {
    dispatch({
      type: actionTypes.SET_PAYMENT_MODAL,
      modal: { ...state.paymentModal, ...modal },
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
  getTransactionSummary: (req) => {
    dispatch({
      type: actionTypes.GET_TRANSACTION_SUMMARY,
      request: req,
    });
  },
  getAllBillingDataAction: (req) => {
    //calling Bill Summary
    dispatch({
      type: actionTypes.GET_BILL_SUMMARY,
      request: {
        id_doctor: req.id_doctor,
        id_patient: req.id_patient,
        id_clinic: req.id_clinic,
      },
    });

    //Get All Bills
    dispatch({
      type: actionTypes.GET_ALL_BILL_DATA_LIST,
      request: {
        id_doctor: req.id_doctor,
        id_patient: req.id_patient,
      },
    });

    //Get Transaction summary
    dispatch({
      type: actionTypes.GET_TRANSACTION_SUMMARY,
      request: {
        id_doctor: req.id_doctor,
        id_patient: req.id_patient,
      },
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
