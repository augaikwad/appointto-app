import service from "../../service";
import {
  setTreatmentList,
  setBillSummary,
  setAllBillData,
  setTransactionSummary,
} from "../reducers/billingSlice";

import cogoToast from "cogo-toast";
const toastOption = { hideAfter: 5, position: "top-right" };

export const getTreatmentList = (id_doctor) => async (dispatch) => {
  try {
    const response = await service.get(
      "Doctor/GetTreatmentList?DoctorId=" + id_doctor
    );
    const { response_code, payload, message } = response.data;
    if (response_code === 2000) {
      dispatch(setTreatmentList(payload));
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const createBill = (req, callback) => async (dispatch) => {
  try {
    const response = await service.post("Bill/Create", req);
    const { response_code, message, payload } = response.data;
    if (response_code === 2000) {
      cogoToast.success(message, toastOption);
      if (callback) {
        callback(payload);
      }
    } else {
      cogoToast.error(message, toastOption);
    }
  } catch (error) {
    // Handle error here
    console.error("Error fetching user data:", error);
  }
};

export const updateBill = (req, callback) => async (dispatch) => {
  try {
    const response = await service.post("Bill/Update", req);
    const { response_code, message, payload } = response.data;
    if (response_code === 2000) {
      cogoToast.success(message, toastOption);
      if (callback) {
        callback(payload);
      }
    } else {
      cogoToast.error(message, toastOption);
    }
  } catch (error) {
    // Handle error here
    console.error("Error fetching user data:", error);
  }
};

export const getBillSummary = (req) => async (dispatch) => {
  try {
    const response = await service.post("Bill/GetBillSummary", req);
    const { response_code, payload } = response.data;
    let res = null;
    if (response_code === 2000) {
      res = payload;
    }
    dispatch(setBillSummary(res));
  } catch (error) {
    // Handle error here
    console.error("Error fetching user data:", error);
  }
};

export const getAllBillData = (req) => async (dispatch) => {
  try {
    const response = await service.post("Bill/GetAllBillData", req);
    const { response_code, payload } = response.data;
    let res = [];
    if (response_code === 2000) {
      res = payload;
    }
    dispatch(setAllBillData(res));
  } catch (error) {
    // Handle error here
    console.error("Error fetching user data:", error);
  }
};

export const deleteBill = (req, callback) => async (dispatch) => {
  try {
    const response = await service.post("Bill/Delete", req);
    const { response_code, message } = response.data;
    if (response_code === 2000) {
      cogoToast.success(message, toastOption);
      if (callback) {
        callback();
      }
    }
  } catch (error) {
    // Handle error here
    console.error("Error fetching user data:", error);
  }
}; //

export const getTransactionSummary = (req) => async (dispatch) => {
  try {
    const response = await service.post("Bill/GetTransactionSummary", req);
    const { response_code, payload } = response.data;
    let res = [];
    if (response_code === 2000) {
      res = payload;
    }
    dispatch(setTransactionSummary(res));
  } catch (error) {
    // Handle error here
    console.error("Error fetching user data:", error);
  }
};

export const saveTreatment = (req, callback) => async (dispatch) => {
  try {
    const response = await service.post("Doctor/add_treatment", req);
    const { response_code, payload } = response.data;
    if (response_code === 2000) {
      if (callback) {
        callback(payload);
      }
    }
  } catch (error) {
    // Handle error here
    console.error("Error fetching user data:", error);
  }
};

export const getAllBillingDataAction = (req) => async (dispatch) => {
  dispatch(
    getBillSummary({
      id_doctor: req.id_doctor,
      id_patient: req.id_patient,
      id_clinic: req.id_clinic,
    })
  );
  dispatch(
    getAllBillData({
      id_doctor: req.id_doctor,
      id_patient: req.id_patient,
    })
  );
  dispatch(
    getTransactionSummary({
      id_doctor: req.id_doctor,
      id_patient: req.id_patient,
    })
  );
};

export const addPayment = (req, callback) => async (dispatch) => {
  try {
    const response = await service.post("Bill/AddPayment", req);
    const { response_code, payload } = response.data;
    if (response_code === 2000) {
      if (callback) {
        callback(payload);
      }
    }
  } catch (error) {
    // Handle error here
    console.error("Error fetching user data:", error);
  }
};
