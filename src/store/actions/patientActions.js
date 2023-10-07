import service from "../../service";
import {
  setPatientById,
  setGlobalList,
  setPatientsList,
  setPatientListFilters,
} from "../reducers/patientSlice";

export const getPatientById = (reqParams, callback) => async (dispatch) => {
  const stringParams = new URLSearchParams(reqParams);
  try {
    const response = await service.get("Patient/get-patient?" + stringParams);
    const { response_code, payload, message } = response.data;
    if (response_code === 2000) {
      dispatch(setPatientById(payload));
      if (callback) {
        callback(payload);
      }
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const getGlobalList = (reqParams, callback) => async (dispatch) => {
  const stringParams = new URLSearchParams(reqParams);
  try {
    const response = await service.get(
      "Patient/get-patient-list?" + stringParams
    );
    const { response_code, payload, message } = response.data;
    if (response_code === 2000) {
      dispatch(setGlobalList(payload));
      if (callback) {
        callback(payload);
      }
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const getPatientsList = (filters) => async (dispatch) => {
  dispatch(setPatientListFilters(filters));
  const stringParams = new URLSearchParams(filters);
  try {
    const response = await service.get(
      "Patient/get-patient-list?" + stringParams
    );
    const { response_code, payload, message } = response.data;
    if (response_code === 2000) {
      dispatch(setPatientsList(payload));
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
