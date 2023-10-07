import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

export const initialState = {
  billModal: {
    open: false,
    isAdd: true,
    formValue: {
      bill_id: 0,
      id_doctor: 0,
      bill_date: moment(new Date()).format("YYYY-MM-DD"),
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

const billingSlice = createSlice({
  name: "billings",
  initialState,
  reducers: {
    setTreatmentList: (state, action) => {
      state.treatmentList = action.payload;
    },
    setBillModal: (state, action) => {
      if (action.payload.hasOwnProperty("open") && !action.payload.open) {
        state.billModal = initialState.billModal;
      } else {
        state.billModal = action.payload;
      }
    },
    setBillSummary: (state, action) => {
      state.billSummary =
        action.payload === null ? initialState.billSummary : action.payload;
    },
    setPaymentModal: (state, action) => {
      if (action.payload.hasOwnProperty("open") && !action.payload.open) {
        state.paymentModal = initialState.paymentModal;
      } else {
        state.paymentModal = action.payload;
      }
    },
    setAllBillData: (state, action) => {
      state.allBillData = action.payload;
    },
    setTransactionSummary: (state, action) => {
      state.transactionSummary = action.payload;
    },
  },
});

export const {
  setTreatmentList,
  setBillModal,
  setBillSummary,
  setPaymentModal,
  setAllBillData,
  setTransactionSummary,
} = billingSlice.actions;
export default billingSlice.reducer;
