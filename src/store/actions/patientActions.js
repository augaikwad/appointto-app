import service from "../../service";
import { setLoading } from "../reducers/globalSlice";
import { setPatientById } from "../reducers/patientSlice";

export const getPatientById = (reqParams, callback) => async (dispatch) => {
  dispatch(setLoading(true));
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
    dispatch(setLoading(false));
  } catch (error) {
    console.error("Error fetching user data:", error);
    dispatch(setLoading(false));
  }
};
