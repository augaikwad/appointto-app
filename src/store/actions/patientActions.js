import service from "../../service";
import {
  setPatientById,
  setGlobalList,
  setPatientsList,
  setPatientListFilters,
} from "../reducers/patientSlice";
import { formattedObjForPatientSave } from "./dataFormatters/patients";
import cogoToast from "cogo-toast";
const toastOption = { hideAfter: 5, position: "top-right" };

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

export const addPatientGeneralInfo = (req, callback) => async (dispatch) => {
  try {
    const response = await service.post(
      "Patient/add-patient-general",
      formattedObjForPatientSave(req)
    );
    const { response_code, payload, message } = response.data;
    if (response_code === 2000) {
      cogoToast.success(message, toastOption);
      if (callback) {
        callback(payload);
      }
    } else {
      cogoToast.error(message, toastOption);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const updatePatientGeneralInfo = (req, callback) => async (dispatch) => {
  try {
    const response = await service.post(
      "Patient/update-patient-general",
      formattedObjForPatientSave(req)
    );
    const { response_code, payload, message } = response.data;
    if (response_code === 2000) {
      cogoToast.success(message, toastOption);
      if (callback) {
        callback(payload);
      }
    } else {
      cogoToast.error(message, toastOption);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const addDocuments =
  (req, onUploadProgress, callback) => async (dispatch) => {
    try {
      let configData = {
        onUploadProgress: (progressEvent) => {
          if (onUploadProgress) {
            onUploadProgress(progressEvent);
          }
        },
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      const response = await service.post(
        "Patient/add-document",
        req,
        configData
      );

      const { response_code, payload, message } = response.data;
      if (response_code === 2000) {
        cogoToast.success(message, toastOption);
        if (callback) {
          callback(payload);
        }
      } else {
        cogoToast.error(message, toastOption);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

export const getDocuments = (PatientId, callback) => async (dispatch) => {
  try {
    const response = await service.post(
      "Patient/get-document?PatientId=" + PatientId
    );
    const { response_code, payload } = response.data;
    if (response_code === 2000) {
      if (callback) {
        callback(payload);
      }
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
